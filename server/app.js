const express = require("express");
const app = express();
const debug = require("debug")("app:startup"); // set env 'export DEBUG='app:startup'
const helmet = require("helmet");
const morgan = require("morgan");

app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

// ** Routes Section **
app.use(require("./routes/setBenchmark"));
app.use(require("./routes/saveSnapshot"));
app.use(require("./routes/dashboardRowOne"));
app.use(require("./routes/dashboardLineChart"));
app.use(require("./routes/dashboardRowThree"));
app.use(require("./routes/dashboardRowFour"));
app.use(require("./routes/portfolioSnapshots"));
app.use(require("./routes/authentication"));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));
