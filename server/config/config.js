const env = require("./env");

module.exports = {
  development: {
    username: "postgres",
    password: env.PG_DB_PW,
    database: "Portfolios",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
