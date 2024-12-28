import database from "infra/database.js";

async function status(req, res) {
  const result = await database.query("SELECT 1 + 1 AS DOIS;");
  console.log(result);
  res.status(200).json({
    status: "200 | OK",
  });
}
export default status;
