const request = require("supertest");
const { Group } = require("../../../../app/modules/groups/model");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.test" });

let server;

describe("Group Module", () => {
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
        .post(`/api/${api_version}/groups`)
        .send({ name: "groups" });
      object_id = res.body["_id"];
      expect(res.status).toBe(200);
      expect(res.body["name"] === "groups").toBeTruthy();
    });
  });

  describe("GET /", () => {
    it("Should return 200", async () => {
      const res = await request(server).get("/api/${api_version}/groups");
      expect(res.status).toBe(200);
    });
  });

  describe("PUT /:id", () => {
    it("Should return 200", async () => {
      const res = await request(server)
        .put(`/api/${api_version}/groups/${object_id}`)
        .send({ name: "New groups" });
      expect(res.status).toBe(200);
      expect(res.body["name"] === "New groups").toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("Should return 200", async () => {
      const res = await request(server).get(
        `/api/${api_version}/groups/${object_id}`
      );
      expect(res.status).toBe(200);
    });
  });

  describe("DELETE /:id", () => {
    it("Should return 200", async () => {
      const res = await request(server).delete(
        `/api/${api_version}/groups/${object_id}`
      );
      expect(res.status).toBe(200);
    });
  });
});
