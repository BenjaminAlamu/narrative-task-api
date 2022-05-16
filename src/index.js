const express = require("express");
const app = express();

require("dotenv").config();

const port = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const listAllRoutes = require("express-list-endpoints");
const Table = require("cli-table");
const { errorConverter, errorHandler } = require("./helpers/error");
const logger = require("./helpers/logger");

app.use(cors("*"));

require("./config/mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", require("./routes/index"));

app.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to Narrative API, you should not be here sha",
  })
);
app.get("*", (req, res) =>
  res.status(404).send({
    message: "Invalid route",
  })
);
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app.listen(port, () => {
  logger.info(`Server started at ${port}`);
});

if (process.env.ENVIRONMENT === "dev") {
  let routesList = listAllRoutes(app);
  routesList = routesList.map((route) => {
    const obj = {};
    obj[route.path] = route.methods.join(" | ");
    return obj;
  });
  const table = new Table();
  table.push({ Endpoints: "Methods" }, ...routesList);
  logger.info(table.toString());
}
