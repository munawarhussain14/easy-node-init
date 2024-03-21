const request = require("supertest");
const { **model_name** } = require("../../../../app/modules/**model_dir**/model");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.test" });


let server;

describe("**model_name** Module",()=>{
    let object_id;
    let api_version = process.env.api_version;
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
            const res = await request(server).post(`/api/${api_version}/**route_name**`).send({name:"**route_name**"});
            object_id = res.body["_id"];
            expect(res.status).toBe(200);
            expect(res.body['name']==="**route_name**").toBeTruthy();
        });
    });

    describe("GET /", () => {
        it("Should return 200", async () => {
            const res = await request(server).get('/api/${api_version}/**route_name**');
            expect(res.status).toBe(200);
        });
    });

    describe("PUT /:id", () => {
        it("Should return 200", async () => {
            const res = await request(server).put(`/api/${api_version}/**route_name**/${object_id}`).send({name:"New **route_name**"});
            expect(res.status).toBe(200);
            expect(res.body['name']==="New **route_name**").toBeTruthy();
        });
    });
    
    describe("GET /:id", () => {
        it("Should return 200", async () => {
            const res = await request(server).get(`/api/${api_version}/**route_name**/${object_id}`);
            expect(res.status).toBe(200);
        });
    });

    describe("DELETE /:id", () => {
        it("Should return 200", async () => {
            const res = await request(server).delete(`/api/${api_version}/**route_name**/${object_id}`);
            expect(res.status).toBe(200);
        });
    });
});