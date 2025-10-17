import express from "express";
import { parse, z } from "zod";

export const app = express();

app.use(express.json());

const sumInput = {
  a: z.number(),
  b: z.number(),
};

app.post("/sum", (req, res) => {
  const parsedData = z.object(sumInput).safeParse(req.body);

  if (!parsedData.success) {
    return res.status(411).json({ message: "Invalid input" });
  }

  const a = parsedData.data.a;
  const b = parsedData.data.b;

  const sum = a + b;
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
