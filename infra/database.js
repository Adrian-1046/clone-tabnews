import { Client } from "pg";
import { internalServerError } from "infra/errors";

async function query(queryObject) {
  let client;

  try {
    client = await getNewClient();

    const result = await client.query(queryObject);

    return result;
  } catch (error) {
    const publicErrorObject = new internalServerError({
      cause: error,
    });

    console.log("\n erro dentro do catch do database.js");
    console.error(publicErrorObject);

    throw error;
  } finally {
    await client?.end();
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: getSSLConfig(),
  });

  await client.connect();
  return client;
}

const database = {
  query,
  getNewClient,
};

export default database;

function getSSLConfig() {
  if (process.env.CERTIFICATE) {
    // eslint-disable-next-line no-unused-labels
    ca: process.env.CERTIFICATE;
  }
  return process.env.NODE_ENV === "production" ? true : false;
}
