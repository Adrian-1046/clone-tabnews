import { createRouter } from "next-connect";
import database from "infra/database.js";
import { MethodNotAllowedError } from "infra/errors";
import controller from "infra/controller";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  if (request.method !== "GET") {
    const publicErrorObject = new MethodNotAllowedError();
    return response
      .status(publicErrorObject.statusCode)
      .json(publicErrorObject);
  }

  try {
    const updatedAt = new Date().toISOString();
    const smdbVersion = await database.query("SHOW server_version");
    const maxConnections = await database.query("SHOW max_connections;");
    const databaseName = process.env.POSTGRES_DB;
    const usedConnections = await database.query({
      text: `SELECT COUNT(*)::int AS used_connections FROM pg_stat_activity WHERE datname = $1;`,
      values: [databaseName],
    });

    response.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          smdb_version: smdbVersion.rows[0].server_version,
          max_connections: parseInt(maxConnections.rows[0].max_connections),
          used_connections: parseInt(usedConnections.rows[0].used_connections),
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}
