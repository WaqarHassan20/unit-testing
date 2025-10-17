import { describe, it, expect, vi } from "vitest";
import { prismaClient } from "../db";
import request from "supertest";
import { app } from "..";

vi.mock("../db");

console.log(prismaClient.sum.create);

describe("POST /sum", () => {
  it("should return the sum of two numbers", async () => {
    const response = await request(app).post("/sum").send({
      a: 5,
      b: 7,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.sum).toBe(12);
  });

  it("should return failure of test", async () => {
    const response = await request(app).post("/sum").send({
      a: "shakatesting",
    });
    expect(response.statusCode).toBe(411);
    expect(response.body.message).toBe("Invalid input");
  });
});

describe("GET /sum", () => {
  it("should return the sum of two numbers from headers", async () => {
    const response = await request(app)
      .get("/sum")
      .set({
        a: "10",
        b: "5",
      })
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.sum).toBe(15);
  });

  it("should return failure of test for invalid headers or empty headers", async () => {
    const response = await request(app).get("/sum").send();
    expect(response.statusCode).toBe(411);
    expect(response.body.message).toBe("Invalid input");
  });
});
