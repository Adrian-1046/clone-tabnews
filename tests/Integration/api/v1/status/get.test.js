import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://127.0.0.1:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database.smdb_version).toBeDefined();
  expect(responseBody.dependencies.database.smdb_version).not.toBeNull();

  expect(responseBody.dependencies.database.max_connections).toEqual(100);

  expect(responseBody.dependencies.database.used_connections).toEqual(1);
});
