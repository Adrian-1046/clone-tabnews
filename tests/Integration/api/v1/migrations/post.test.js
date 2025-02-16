import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("POST /api/v1/migrations", () => {
  describe("Aonymous user", () => {
    describe("Running pending migrations", () => {
      test("Attempt with pending migrations", async () => {
        const response1 = await fetch(
          "http://127.0.0.1:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        const response1Body = await response1.json();
        expect(response1.status).toBe(201);
        expect(Array.isArray(response1Body)).toBe(true);

        expect(response1Body.length).toBeGreaterThan(0);
      });
      test("Attempt without pending migrations", async () => {
        const response2 = await fetch(
          "http://127.0.0.1:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        const response2Body = await response2.json();
        expect(response2.status).toBe(200);
        expect(Array.isArray(response2Body)).toBe(true);

        expect(response2Body.length).toEqual(0);
      });
    });
  });
});
