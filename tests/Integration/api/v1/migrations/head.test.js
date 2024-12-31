test("HEAD to /api/v1/migrations should return 405", async () => {
  const response = await fetch("http://127.0.0.1:3000/api/v1/migrations", {
    method: "HEAD",
  });
  //const response1Body = await response.json();
  expect(response.status).toBe(405);
});
