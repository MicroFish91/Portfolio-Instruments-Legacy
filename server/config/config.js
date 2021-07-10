const dotenv = require("dotenv");
const env = require("./env");

dotenv.config();

module.exports = {
  development: {
    username: "postgres",
    password: env.PG_DB_PW,
    database: "Portfolios",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
