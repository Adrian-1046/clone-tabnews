test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://127.0.0.1:3000/api/v1/status");
  expect(response.status).toBe(200);
});

test("/api/v1/status/ UPDATED_AT has to be valid new date", async () => {
  const response = await fetch("http://127.0.0.1:3000/api/v1/status");

  const responseBody = await response.json();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
});

test("/api/v1/status/ SMDBD_VERSION has to be valid version", async () => {
  const response = await fetch("http://127.0.0.1:3000/api/v1/status");

  const responseBody = await response.json();
  expect(responseBody.dependencies.database.smdb_version).toBeDefined();
  expect(responseBody.dependencies.database.smdb_version).not.toBeNull();
});

test("/api/v1/status/ SMDB_MAX_CONNECTIONS has to be valid and equal to 100 ", async () => {
  const response = await fetch("http://127.0.0.1:3000/api/v1/status");

  const responseBody = await response.json();
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
});

test("/api/v1/status/ SMDB_USED_CONNECTIONS has to be valid and equal to 1 in development ", async () => {
  const response = await fetch("http://127.0.0.1:3000/api/v1/status");

  const responseBody = await response.json();
  expect(responseBody.dependencies.database.used_connections).toEqual(1);
});
