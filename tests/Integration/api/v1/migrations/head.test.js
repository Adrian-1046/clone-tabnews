describe("HEAD/DELETE/PUT /api/v1/migrations", () => {
  describe("Aonymous user", () => {
    test("Methods different from GET and POST should not work", async () => {
      const responseToHead = await fetch(
        "http://127.0.0.1:3000/api/v1/migrations",
        {
          method: "HEAD",
        },
      );
      const responseToDelete = await fetch(
        "http://127.0.0.1:3000/api/v1/migrations",
        {
          method: "DELETE",
        },
      );
      const responseToPut = await fetch(
        "http://127.0.0.1:3000/api/v1/migrations",
        {
          method: "PUT",
        },
      );

      expect(responseToHead.status).toBe(405);
      expect(responseToDelete.status).toBe(405);
      expect(responseToPut.status).toBe(405);
    });
  });
});
