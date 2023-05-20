import { cookies } from "next/headers";
import decode from "jwt-decode";

interface User {
  seb: string;
  name: string;
  avatarUrl: string;
}

export function getUser(): User {
  const token = cookies().get("token")?.value;

  if (!token) {
    throw new Error("Unauthenticated");
  }

  const user = decode(token) as User;

  return user;
}
