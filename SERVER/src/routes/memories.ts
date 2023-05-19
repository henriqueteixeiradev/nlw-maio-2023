import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import Z from "zod";

export async function memoriesRoutes(app: FastifyInstance) {
  app.get("/memories", async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat("..."),
      };
    });
  });

  app.get("/memories/:id", async (request) => {
    const paramsSchema = Z.object({
      id: Z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return memory;
  });

  app.post("/memories", async (request) => {
    const bodySchema = Z.object({
      content: Z.string(),
      coverUrl: Z.string().url(),
      isPublic: Z.coerce.boolean().default(false),
    });

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: "615d3abb-5e31-420f-a977-c635f66cfc62",
      },
    });

    return memory;
  });

  app.put("/memories/:id", async (request) => {
    const paramsSchema = Z.object({
      id: Z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const bodySchema = Z.object({
      content: Z.string(),
      coverUrl: Z.string().url(),
      isPublic: Z.coerce.boolean().default(false),
    });

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

    const memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
        userId: "615d3abb-5e31-420f-a977-c635f66cfc62",
      },
    });

    return memory;
  });

  app.delete("/memories/:id", async (request) => {
    const paramsSchema = Z.object({
      id: Z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const memory = await prisma.memory.delete({
      where: {
        id,
      },
    });

    return memory;
  });
}
