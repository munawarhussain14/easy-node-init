const request = require("supertest");
// const { **model_name** } = require("../../../app/modules/**model_dir**/model");
const mongoose = require("mongoose");
const config = require("config");
const testDebugger = require("debug")("app:test");

let server;

describe("**model_name** Module", () => {
  let object_id;
  let test_wait_time = 5000;
  let api_version = config.get("api_version");
  beforeEach(() => {
    server = require("../../../app/app");
  }, test_wait_time);

  afterEach(() => {
    if (server) {
      server.close();
    }
  });

  describe(
    "POST /",
    () => {
      it("Should return 200", async () => {
        const res = await request(server)
          .post(`/api/${api_version}/**route_name**`)
          .send({ name: "**route_name**" });
        testDebugger(res.body);
        object_id = res.body["data"]["_id"];
        expect(res.status).toBe(200);
        expect(res.body["data"]["name"] === "**route_name**").toBeTruthy();
      });
    },
    test_wait_time
  );

  describe(
    "GET /",
    () => {
      it("Should return 200", async () => {
        const res = await request(server).get(
          `/api/${api_version}/**route_name**`
        );
        testDebugger(res.body);
        expect(res.status).toBe(200);
      });
    },
    test_wait_time
  );

  describe(
    "PUT /:id",
    () => {
      it("Should return 200", async () => {
        const res = await request(server)
          .put(`/api/${api_version}/**route_name**/${object_id}`)
          .send({ name: "New **route_name**" });
        testDebugger(res.body);
        expect(res.status).toBe(200);
        expect(res.body["data"]["name"] === "New **route_name**").toBeTruthy();
      });
    },
    test_wait_time
  );

  describe(
    "GET /:id",
    () => {
      it("Should return 200", async () => {
        const res = await request(server).get(
          `/api/${api_version}/**route_name**/${object_id}`
        );
        testDebugger(res.body);
        expect(res.status).toBe(200);
      });
    },
    test_wait_time
  );

  describe(
    "DELETE /:id",
    () => {
      it("Should return 200", async () => {
        const res = await request(server).delete(
          `/api/${api_version}/**route_name**/${object_id}`
        );
        testDebugger(res.body);
        expect(res.status).toBe(200);
      });
    },
    test_wait_time
  );
});
