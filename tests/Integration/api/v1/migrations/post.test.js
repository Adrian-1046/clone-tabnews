test("POST to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://127.0.0.1:3000/api/v1/migrations", {
    method: "POST",
  });
  const response1Body = await response1.json();
  expect(response1.status).toBe(201);
  expect(Array.isArray(response1Body)).toBe(true);

  expect(response1Body.length).toBeGreaterThan(0);

  const response2 = await fetch("http://127.0.0.1:3000/api/v1/migrations", {
    method: "POST",
  });
  const response2Body = await response2.json();
  expect(response2.status).toBe(200);
  expect(Array.isArray(response2Body)).toBe(true);

  expect(response2Body.length).toEqual(0);
});
