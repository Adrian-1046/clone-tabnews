import { createRouter } from "next-connect";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import { internalServerError, MethodNotAllowedError } from "infra/errors";
import controller from "infra/controller";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

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
  } finally {
    await dbClient?.end();
  }
}

async function getHandler(request, response) {
  if (request.method !== "GET") {
    const publicErrorObject = new MethodNotAllowedError();
    return response
      .status(publicErrorObject.statusCode)
      .json(publicErrorObject);
  }

  let dbClient, defaultMigrationOptions;

  try {
    dbClient = await connectToDatabase();
    defaultMigrationOptions = await defineMigrationOptions(dbClient);

    const pendinMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: true,
    });

    return response.status(200).json(pendinMigrations);
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
