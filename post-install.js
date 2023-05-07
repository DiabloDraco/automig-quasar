const fs = require("fs");

(() => {
  const example = ".env.example";

  if (!fs.existsSync(example)) {
    return;
  }

  const env = fs.readFileSync(example);

  const data = env.toString().replace("%URL%", `http://localhost:3000/api`);

  if (!fs.existsSync(".env")) {
    fs.writeFileSync(".env", data);
  }

  if (!fs.existsSync(".env.dev")) {
    fs.writeFileSync(".env.dev", data);
  }
})();
