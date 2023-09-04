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

app.get("/", (req, res) => {
  res.send(
    `
    <html>
    <head>
      <title>Welcome to Easy Node Init</title>
    </head>
    <body>
      <center>
      <h1>Welcome to Easy Node Init</h1>
      <p>If you would like to assist in its growth, I would greatly appreciate it.</p>
      <a href="/api/v1/">See API Base Reqeust</a>
      <center>
    </body>
  </html>`
  );
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  startupDebugger(`Server listing on Port ${port}...`);
});

module.exports = app;
module.exports = server;
