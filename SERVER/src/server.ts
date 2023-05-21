import "dotenv/config";

import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { memoriesRoutes } from "./routes/memories";
import { authRoutes } from "./routes/auth";

const app = fastify();

app.register(authRoutes);
app.register(memoriesRoutes);

app.register(cors, {
  origin: true,
});

app.register(jwt, {
  secret: `${process.env.JWT_SECRET}`,
});

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("🚀 Server is running on port 3333");
  });
