const request = require("supertest");
const bcrypt = require("bcrypt");
const { User } = require("../../../app/modules/users/model");
const config = require("config");

describe("Auth User", () => {
  let server;
  let user;
  let api_version = config.get("api_version");
  let test_wait_time = 10000;
  const email = "register@email.com";
  beforeEach(async () => {
    server = require("../../../app/app");
  },test_wait_time);

  afterEach(async () => {
    if (server) {
      server.close();
    }
  });

  describe("POST /", () => {
    it("Register User", async () => {
      const res = await request(server).post(`/api/${api_version}/users`).send({
        email,
        first_name: "Register",
        last_name: "User",
        password: "123456",
      });

      user = await User.findOne({ email }).select(
        "+password"
      );
      expect(res.status).toBe(200);
      expect(user.email === res.body["data"]["email"]).toBeTruthy();
    },test_wait_time);

    it("Should return already register", async () => {
      const res = await request(server).post(`/api/${api_version}/users`).send({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        password: "123456",
      });

      expect(res.status).toBe(400);
      //   expect(register.email === res.body["data"]["email"]).toBeTruthy();
    },test_wait_time);

    it("Login should return valid token", async () => {
      const res = await request(server).post(`/api/${api_version}/auth`).send({
        email,
        password: "123456",
      });

      token = res.body["token"];
      const validPassword = await bcrypt.compare("123456", user.password);
      expect(res.status).toBe(200);
      expect(validPassword).toBeTruthy();
    },test_wait_time);

    it("Change Password", async () => {
      const res = await request(server)
      .post(`/api/${api_version}/users/change-password`)
      .set('x-auth-token', token)
      .send({
        password:"654321"
      });
      expect(res.status).toBe(200);
    },test_wait_time);

    it("Send OTP", async () => {
      const res = await request(server)
      .post(`/api/${api_version}/auth/send-otp`).send({
        email
      });

      user = await User.findOne({ email }).select(
        "+password +otp.otp_code +otp.otp_expiry"
      );
      expect(res.status).toBe(200);
      const currentDateTime = new Date();
      expect(user.otp).toBeTruthy();
      expect(user.otp.otp_code).toBeTruthy();
      expect(user.otp.otp_expiry).toBeTruthy();
      expect(user.otp.otp_expiry>currentDateTime).toBeTruthy();
    },test_wait_time);
  });

  describe("GET /",()=>{
    it("Get account detail", async () => {
      const res = await request(server).get(`/api/${api_version}/users/me`).set('x-auth-token', token);
      await User.deleteOne({ email });
      expect(res.status).toBe(200);
      expect(user.first_name==="Register").toBeTruthy();
    },test_wait_time);
  });
});
