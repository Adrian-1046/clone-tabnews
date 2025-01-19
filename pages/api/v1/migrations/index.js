import { createRouter } from "next-connect";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import { internalServerError, MethodNotAllowedError } from "infra/errors";

const router = createRouter();

router.get(getHandler);

router.post(postHandler);

export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
});

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onErrorHandler(error, request, response) {
  const publicErrorObject = new internalServerError({
    cause: error,
  });
  console.log("\nErro dentro do catch do controler api/v1/migrations:");
  console.log(publicErrorObject);

  response.status(500).json(publicErrorObject);
}

async function postHandler(request, response) {
  let dbClient, defaultMigrationOptions;

  try {
    dbClient = await connectToDatabase();
    defaultMigrationOptions = await defineMigrationOptions(dbClient);

    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }
    return response.status(200).json(migratedMigrations);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient?.end();
  }
}

async function getHandler(request, response) {
  if (request.method !== "GET") {
    console.log(
      `Method ${request.method} not allowed in getHandler at api/v1/migrations`,
    );

    const publicErrorObject = new MethodNotAllowedError();
    return response
      .status(publicErrorObject.statusCode)
      .json(publicErrorObject);
  }

  let dbClient, defaultMigrationOptions;

  try {
    dbClient = await connectToDatabase();
    defaultMigrationOptions = await defineMigrationOptions(dbClient);

    const pendinMigrations = await migrationRunner(defaultMigrationOptions);

    return response.status(200).json(pendinMigrations);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient?.end();
  }
}

async function defineMigrationOptions(dbClient) {
  const defaultMigrationOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: resolve("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  return defaultMigrationOptions;
}

async function connectToDatabase() {
  try {
    return await database.getNewClient();
  } catch (error) {
    throw new internalServerError();
  }
}
