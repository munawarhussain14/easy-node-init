const request = require("supertest");
const mongoose = require("mongoose");
const config = require("config");

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
        object_id = mongoose.Types.ObjectId();
        expect(res.status).toBe(200);
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
        expect(res.status).toBe(200);
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
        expect(res.status).toBe(200);
      });
    },
    test_wait_time
  );
});
