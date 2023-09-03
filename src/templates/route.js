/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const error = require("./middleware/error");
const startupDebugger = require("debug")("app:startup");
const config = require("config");

module.exports = function (app) {
  startupDebugger("Route maping...");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  let api = config.get("api_version");
  const modulesDir = path.join(__dirname, "modules");

  fs.readdirSync(modulesDir).forEach((moduleName) => {
    const modulePath = path.join(modulesDir, moduleName);
    const routeFilePath = path.join(modulePath, "route.js");

    if (fs.existsSync(routeFilePath)) {
      startupDebugger("Path", routeFilePath);
      const { router, allow } = require(routeFilePath);
      if (allow) {
        app.use(`/api/${api}/`, router);
      }
    }
  });

  app.use(error);
};
