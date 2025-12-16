"use server";

import { parse } from "cookie";
import { cookies } from "next/headers";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginResponse =
  | { success: true; data: unknown }
  | { success: false; error: string };

export const loginUser = async (
  _currentState: unknown,
  formData: FormData
): Promise<LoginResponse> => {
  try {
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const parsed = loginSchema.safeParse({
      email: rawData.email?.toString(),
      password: rawData.password?.toString(),
    });

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0].message,
      };
    }

    const loginData = parsed.data;

    const res = await fetch(
      "https://email-sending-backend.vercel.app/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      }
    );

    const result = await res.json();

    const setCookiesHeaders = res.headers.getSetCookie();
    console.log({ setCookiesHeaders });

    if (setCookiesHeaders && setCookiesHeaders.length > 0) {
      setCookiesHeaders.forEach((cookie: string) => {
        // console.log(cookie, "for each cookies");
        const parsedCookie = parse(cookie);
        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("No Set-Cookie headers found");
    }

    console.log({ accessTokenObject, refreshTokenObject });

    if (!accessTokenObject) {
      throw new Error("Access token not found in cookies");
    }
    if (!refreshTokenObject) {
      throw new Error("Refresh token not found in cookies");
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessTokenObject.accessToken, {});
    cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {});

    console.log({ res, result });

    if (!res.ok) {
      return {
        success: false,
        error: result.message ?? "Login failed",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Login Error:", error);
    return {
      success: false,
      error: "Something went wrong during login",
    };
  }
};
