import express from "express";
import { z } from "zod";
import { prismaClient } from "./db";

export const app = express();

app.use(express.json());

const sumInput = {
  a: z.number(),
  b: z.number(),
};

app.post("/sum", async (req, res) => {
  const parsedData = z.object(sumInput).safeParse(req.body);

  if (!parsedData.success) {
    return res.status(411).json({ message: "Invalid input" });
  }

  const { a, b } = parsedData.data;
  const sum = a + b;

  await prismaClient.sum.create({
    data: {
      a: parsedData.data.a,
      b: parsedData.data.b,
      result: sum,
    },
  });

  res.json({ sum });
});

app.get("/sum", (req, res) => {
  const parsedData = z.object(sumInput).safeParse({
    a: Number(req.headers["a"]),
    b: Number(req.headers["b"]),
  });

  if (!parsedData.success) {
    return res.status(411).json({ message: "Invalid input" });
  }

  const { a, b } = parsedData.data;
  const sum = a + b;
  res.json({ sum });
});
