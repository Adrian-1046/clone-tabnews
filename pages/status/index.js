import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 1000,
    dedupingInterval: 1000,
  });

  let UpdatedAtResult = "Carregando...";

  if (!isLoading && data) {
    UpdatedAtResult = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <>
      <p>Última atualização: {UpdatedAtResult}</p>
    </>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 1000,
    dedupingInterval: 1000,
  });
  console.log(data);

  let databaseStatusInformation = "Carregando...";

  if (!isLoading && data) {
    databaseStatusInformation = [
      <>
        <p>Versão: {data.dependencies.database.smdb_version}</p>
        <p>Conexões abertas: {data.dependencies.database.used_connections}</p>
        <p>Conexões máximas: {data.dependencies.database.max_connections}</p>
      </>,
    ];
  }

  return (
    <>
      {" "}
      <h2>Database</h2> {databaseStatusInformation}
    </>
  );
}
