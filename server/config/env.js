const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "devSecret",
  PG_DB_PW: process.env.PG_DB_PW || null,
};
