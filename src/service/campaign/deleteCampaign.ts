"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export async function deleteCampaign(campaignId: string) {
  const res = await serverFetch.delete(`/campaign/${campaignId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to delete campaign");
  }

  revalidatePath("/admin/campaign");
}
