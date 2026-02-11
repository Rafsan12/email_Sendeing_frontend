/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  campaignId: z.uuid(),
});

export const sendCampaignEmail = async (
  _state: unknown,
  formData: FormData,
) => {
  try {
    const parsed = schema.safeParse({
      campaignId: formData.get("campaignId"),
    });

    if (!parsed.success) {
      return { error: "Invalid campaign ID" };
    }

    const campaignId = parsed.data.campaignId;

    const res = await serverFetch.post(`/campaign/${campaignId}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const err = await res.json();
      return { error: err.message ?? "Failed to send campaign" };
    }

    // ✅ redirect MUST be last
    redirect(`/create-campaign/${campaignId}/analytics`);
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return { error: error.message ?? "Unexpected error" };
  }
};
