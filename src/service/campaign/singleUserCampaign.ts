/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "../auth/tokenHandler";

export const singleUserCampaign = async () => {
  try {
    const token = await getCookie("accessToken");
    if (!token) {
      return { success: false, message: "Unauthorized" };
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET!
    ) as JwtPayload;

    const res = await serverFetch.get(`/campaign/user/${decoded.id}`, {
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();

    return {
      success: true,
      data: json.data.campaigns, // ✅ THIS IS THE KEY FIX
    };
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    return {
      success: false,
      message: error.message ?? "Unexpected error",
    };
  }
};
