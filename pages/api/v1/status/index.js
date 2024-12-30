import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const smdbVersion = await database.query("SELECT Version();");
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
        smdb_version: smdbVersion.rows[0].version,
        max_connections: parseInt(maxConnections.rows[0].max_connections),
        used_connections: parseInt(usedConnections.rows[0].used_connections),
      },
    },
  });
}
export default status;
