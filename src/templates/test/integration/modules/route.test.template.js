const request = require("supertest");
const { Module } = require("../../../../app/modules/modules/model");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.test" });

let server;

describe("Module Module", () => {
  let object_id;
  let api_version = config.get("api_version");
  beforeEach(() => {
    server = require("../../../../app/app");
  });

  afterEach(() => {
    if (server) {
      server.close();
    }
  });

  describe("POST /", () => {
    it("Should return 200", async () => {
      const res = await request(server)
        .post(`/api/${api_version}/modules`)
        .send({ name: "modules" });
      object_id = res.body["_id"];
      expect(res.status).toBe(200);
      expect(res.body["name"] === "modules").toBeTruthy();
    });
  });

  describe("GET /", () => {
    it("Should return 200", async () => {
      const res = await request(server).get("/api/${api_version}/modules");
      expect(res.status).toBe(200);
    });
  });

  describe("PUT /:id", () => {
    it("Should return 200", async () => {
      const res = await request(server)
        .put(`/api/${api_version}/modules/${object_id}`)
        .send({ name: "New modules" });
      expect(res.status).toBe(200);
      expect(res.body["name"] === "New modules").toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("Should return 200", async () => {
      const res = await request(server).get(
        `/api/${api_version}/modules/${object_id}`
      );
      expect(res.status).toBe(200);
    });
  });

  describe("DELETE /:id", () => {
    it("Should return 200", async () => {
      const res = await request(server).delete(
        `/api/${api_version}/modules/${object_id}`
      );
      expect(res.status).toBe(200);
    });
  });
});
