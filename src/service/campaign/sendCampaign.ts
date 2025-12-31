/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { z } from "zod";

const schema = z.object({
  campaignId: z.uuid(),
});

export const sendCampaignEmail = async (
  _state: unknown,
  formData: FormData
) => {
  try {
    const parsed = schema.safeParse({
      campaignId: formData.get("campaignId"),
    });

    if (!parsed.success) {
      return { error: "Invalid campaign ID" };
    }

    const res = await serverFetch.post(`/campaign/${parsed.data.campaignId}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const err = await res.json();
      return { error: err.message ?? "Failed to send campaign" };
    }

    return { success: true };
  } catch (e: any) {
    return { error: e.message ?? "Unexpected error" };
  }
};
