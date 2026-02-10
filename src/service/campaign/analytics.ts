/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const singleCampaignData = async (
  _state: unknown,
  formData: FormData
) => {
  try {
    const campaignId = formData.get("campaignId") as string | null;

    if (!campaignId) {
      return { error: "Campaign ID is required" };
    }

    const res = await serverFetch.get(`/campaign/${campaignId}`);

    if (!res.ok) {
      const err = await res.json();
      return { error: err?.message ?? "Failed to fetch campaign" };
    }

    const data = await res.json();

    return {
      success: true,
      data,
    };
  } catch (e: any) {
    return {
      error: e?.message ?? "Unexpected error",
    };
  }
};
