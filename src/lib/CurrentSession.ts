"use server";
import { UserRoles } from "@/lib/auth-utlis";
import { getCookie } from "@/service/auth/tokenHandler";
import jwt, { JwtPayload } from "jsonwebtoken";

export type Session = {
  role?: UserRoles;
} | null;

export async function getCurrentSession(): Promise<Session> {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) return null;

    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
    ) as JwtPayload & { role?: string };

    if (!decoded.role || typeof decoded.role !== "string") {
      return null;
    }

    const role = decoded.role.toLowerCase() as UserRoles;

    return { role };
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Session verification failed:", error);
    return null;
  }
}
