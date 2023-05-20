import { FastifyInstance } from "fastify";
import axios from "axios";
import Z from "zod";
import { prisma } from "../lib/prisma";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", async (request) => {
    const bodySchema = Z.object({
      code: Z.string(),
    });

    const { code } = bodySchema.parse(request.body);

    const accessTokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { access_token } = accessTokenResponse.data;

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userSchema = Z.object({
      id: Z.number(),
      login: Z.string(),
      name: Z.string(),
      avatar_url: Z.string().url(),
    });

    const userInfo = userSchema.parse(userResponse.data);

    let user = await prisma.user.findUnique({
      where: {
        githubid: userInfo.id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubid: userInfo.id,
          name: userInfo.name,
          login: userInfo.login,
          avatarUrl: userInfo.avatar_url,
        },
      });
    }

    return {
      user,
    };
  });
}
