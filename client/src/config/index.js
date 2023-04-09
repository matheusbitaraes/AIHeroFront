const env = process.env.NODE_ENV === "production" ? "prod" : "local";

const server = require("./server.json")[env];

const config = {
   env,
  server,
};

module.exports = config;
