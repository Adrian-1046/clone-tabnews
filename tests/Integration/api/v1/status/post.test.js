import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("POST /api/v1/status", () => {
  describe("Aonymous user", () => {
    test("trying to access status with not allowed methods", async () => {
      const responseToPost = await fetch(
        "http://127.0.0.1:3000/api/v1/status",
        {
          method: `POST`,
        },
      );
      expect(responseToPost.status).toBe(405);

      const responseToPostBody = await responseToPost.json();

      expect(responseToPostBody).toEqual({
        name: "MethodNotAllowedError",
        message: "Método não permitido para este endpont.",
        action:
          "Verifique se o método HTTP enviado é válido para este endpoint.",
        statusCode: 405,
      });

      const responseToHead = await fetch(
        "http://127.0.0.1:3000/api/v1/status",
        {
          method: `HEAD`,
        },
      );
      expect(responseToHead.status).toBe(405);
    });
  });
});
