const env = process.env.NODE_ENV === "production" ? "prod" : "local";

const server = require("./server.json")[env];

console.log(env);
console.log(server);
const config = {
   env,
  server,
};

module.exports = config;
