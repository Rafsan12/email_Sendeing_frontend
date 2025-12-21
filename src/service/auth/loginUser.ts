"use server";

import { getDefaultRoute } from "@/lib/auth-utlis";
import { parse } from "cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type ParsedCookie = Record<string, string | undefined>;

export const loginUser = async (_currentState: unknown, formData: FormData) => {
  try {
    const redirectTo = formData.get("redirect");

    const parsed = loginSchema.safeParse({
      email: formData.get("email")?.toString(),
      password: formData.get("password")?.toString(),
    });

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const res = await fetch(
      "https://email-sending-backend.vercel.app/api/v1/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return { success: false, error: result.message ?? "Login failed" };
    }

    let accessToken: string | null = null;
    let refreshToken: string | null = null;

    res.headers.getSetCookie().forEach((cookie) => {
      const parsedCookie: ParsedCookie = parse(cookie);
      if (parsedCookie.accessToken) accessToken = parsedCookie.accessToken;
      if (parsedCookie.refreshToken) refreshToken = parsedCookie.refreshToken;
    });

    if (!accessToken || !refreshToken) {
      throw new Error("Auth cookies missing");
    }

    const cookieStore = cookies();

    (await cookieStore).set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    (await cookieStore).set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    const redirectPath =
      redirectTo && redirectTo.toString().startsWith("/")
        ? redirectTo.toString()
        : getDefaultRoute(result.role);

    redirect(redirectPath);
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Login Error:", error);
    return { success: false, error: "Something went wrong during login" };
  }
};
