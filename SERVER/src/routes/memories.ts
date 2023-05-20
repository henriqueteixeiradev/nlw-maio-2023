import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import Z from "zod";

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });

  app.get("/memories", async (request) => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub,
      },
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

  app.get("/memories/:id", async (request, reply) => {
    const paramsSchema = Z.object({
      id: Z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      throw reply.status(401).send();
    }

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
        userId: request.user.sub,
      },
    });

    return memory;
  });

  app.put("/memories/:id", async (request, reply) => {
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

    let memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (memory.userId !== request.user.sub) {
      throw reply.status(401).send();
    }

    memory = await prisma.memory.update({
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

  app.delete("/memories/:id", async (request, reply) => {
    const paramsSchema = Z.object({
      id: Z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    let memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (memory.userId !== request.user.sub) {
      throw reply.status(401).send();
    }

    memory = await prisma.memory.delete({
      where: {
        id,
      },
    });

    return memory;
  });
}
