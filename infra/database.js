import { Client } from "pg";
import { ServiceError } from "infra/errors";

async function query(queryObject) {
  let client;

  try {
    client = await getNewClient();

    const result = await client.query(queryObject);

    return result;
  } catch (error) {
    const serviceErrorObject = new ServiceError({
      message: "Erro na conexão com banco de dados ou validação da query.",
      cause: error,
    });
    console.error(serviceErrorObject);

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
