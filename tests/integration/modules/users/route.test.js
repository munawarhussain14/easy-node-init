const request = require("supertest");
const bcrypt = require("bcrypt");
const { User } = require("../../../../app/modules/users/model");

describe("Auth User", () => {
  let server;
  let user;
  beforeEach(async () => {
    server = require("../../../../app/app");
  });

  afterEach(async () => {
    if (server) {
      server.close();
    }
  });

  describe("POST /", () => {
    it("Register User", async () => {
      const res = await request(server).post("/api/v1/users").send({
        email: "register@email.com",
        first_name: "Register",
        last_name: "User",
        password: "123456",
      });

      user = await User.findOne({ email: "register@email.com" }).select(
        "+password"
      );
      expect(res.status).toBe(200);
      expect(user.email === res.body["data"]["email"]).toBeTruthy();
    }, 10000);

    it("Should return already register", async () => {
      const res = await request(server).post(`/api/v1/users`).send({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        password: "123456",
      });

      expect(res.status).toBe(400);
      //   expect(register.email === res.body["data"]["email"]).toBeTruthy();
    }, 10000);

    it("Login should return valid token", async () => {
      const res = await request(server).post(`/api/v1/auth`).send({
        email: "register@email.com",
        password: "123456",
      });

      const validPassword = await bcrypt.compare("123456", user.password);
      await User.deleteOne({ email: "register@email.com" });
      expect(res.status).toBe(200);
      expect(validPassword).toBeTruthy();
    }, 10000);
  });
});
