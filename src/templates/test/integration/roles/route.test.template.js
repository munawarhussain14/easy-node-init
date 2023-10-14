const request = require("supertest");
const { Role } = require("../../../../app/modules/roles/model");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.test" });

let server;

describe("Role Module", () => {
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
        .post(`/api/${api_version}/roles`)
        .send({ name: "roles" });
      object_id = res.body["_id"];
      expect(res.status).toBe(200);
      expect(res.body["name"] === "roles").toBeTruthy();
    });
  });

  describe("GET /", () => {
    it("Should return 200", async () => {
      const res = await request(server).get("/api/${api_version}/roles");
      expect(res.status).toBe(200);
    });
  });

  describe("PUT /:id", () => {
    it("Should return 200", async () => {
      const res = await request(server)
        .put(`/api/${api_version}/roles/${object_id}`)
        .send({ name: "New roles" });
      expect(res.status).toBe(200);
      expect(res.body["name"] === "New roles").toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("Should return 200", async () => {
      const res = await request(server).get(
        `/api/${api_version}/roles/${object_id}`
      );
      expect(res.status).toBe(200);
    });
  });

  describe("DELETE /:id", () => {
    it("Should return 200", async () => {
      const res = await request(server).delete(
        `/api/${api_version}/roles/${object_id}`
      );
      expect(res.status).toBe(200);
    });
  });
});
