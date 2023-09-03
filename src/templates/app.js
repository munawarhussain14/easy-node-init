/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const startupDebugger = require("debug")("app:startup");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}

require("./route.js")(app);
require("./boot/boot.js")(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  startupDebugger(`Server listing on Port ${port}...`);
});

module.exports = app;
module.exports = server;
