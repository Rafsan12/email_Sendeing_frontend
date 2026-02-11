"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export async function deleteCampaign(campaignId: string) {
  try {
    const res = await serverFetch.delete(`/campaign/${campaignId}`, {
      cache: "no-store",
    });
    console.log("status:", res);

    if (!res.ok) {
      throw new Error("Failed to delete campaign");
    }
    revalidatePath("/campaign");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
  }
}
