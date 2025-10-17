import { describe, it, expect } from "bun:test";
import request from "supertest";
import { app } from "..";

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
      a: "shakalaka",
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
        b: "15",
      })
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.sum).toBe(25);
  });

  it("should return failure of test for invalid headers or empty headers", async () => {
    const response = await request(app).get("/sum").send();

    expect(response.statusCode).toBe(411);
    expect(response.body.message).toBe("Invalid input");
  });
});
