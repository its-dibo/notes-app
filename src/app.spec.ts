import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import EventEmitter from "node:events";
import supertest, { SuperTest, Test } from "supertest";
import app, { server } from "./app";
import db from "~database";

let auth =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.FRKbJkLhofLTB1IcxfSzXH8QNGm3t4s_GjaOXY3xotE";

let testServer: SuperTest<Test>, notes: { [key: string]: any };

beforeAll(async () => {
  testServer = supertest(app);
  await db.exec(`DELETE from notes`);
  notes = {
    // the user can include himself in the target users, i.e. can send a note to himself
    users: [1, 2, 3],
    noteType: 1,
    title: "test",
    body: "a test note",
    type: 1,
  };
});

afterAll(() => {
  server.close();
});

test("server", () => {
  expect(app).toBeTruthy();
  expect(app.constructor).toEqual(EventEmitter);
});

describe("Authorization", () => {
  test("un authorized access", () =>
    testServer.get("/api/v1/list/all").then((res) => {
      expect(res.statusCode).toBeGreaterThan(200);
    }));
});

describe("routes (api version v1)", () => {
  test("send a note to multiple users", () =>
    testServer
      .post("/api/v1/send")
      .send(notes)
      .set("Authorization", auth)
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining("json"));
        expect(res.body.status).toEqual("ok");
      }));

  test("list all notes", () =>
    testServer
      .get("/api/v1/list/all")
      .set("Authorization", auth)
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(3);
        expect(res.body[0].sent_by).toEqual(1);
      }));

  test("list notes for the current user", () =>
    testServer
      .get("/api/v1/list")
      .set("Authorization", auth)
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(1);
        expect(res.body[0].user).toEqual(1);
      }));
});
