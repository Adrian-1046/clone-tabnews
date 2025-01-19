describe("HEAD/DELETE/PUT /api/v1/migrations", () => {
  describe("Aonymous user", () => {
    test("Methods different from GET and POST should not work", async () => {
      const responseToHead = await fetch(
        "http://127.0.0.1:3000/api/v1/migrations",
        {
          method: "HEAD",
        },
      );
      expect(responseToHead.status).toEqual(405);

      const responseToDelete = await fetch(
        "http://127.0.0.1:3000/api/v1/migrations",
        {
          method: "DELETE",
        },
      );
      expect(responseToDelete.status).toEqual(405);

      const responseToPut = await fetch(
        "http://127.0.0.1:3000/api/v1/migrations",
        {
          method: "PUT",
        },
      );
      expect(responseToPut.status).toEqual(405);
    });
  });
});
