const { exec } = require("node:child_process");
const { log } = require("node:console");
const { TIMEOUT } = require("node:dns/promises");

function checkSMDB() {
  exec("docker exec smdb-dev pg_isready --host localhost", handleReturn);
  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write("🔴 ");
      checkSMDB();
      return;
    }
    console.log("\n\n🟢 smdb aceitando conexões\n");
  }
}

console.log("⭕ Aguardando smdb aceitar conexões\n");

checkSMDB();
