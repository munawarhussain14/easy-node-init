/**
 * Create By: easy-node-init
 * Create Date: 9/29/2023, 10:29:08 AM
 */
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const startupDebugger = require("debug")("app:startup");
const app = express();
const cors = require("cors");

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  })
);

require("./boot/boot.js")(app);
require("./route.js")(app);

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
