/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import z from "zod";

const saveDesignSchema = z.object({
  campaignId: z.uuid(),
  contentHtml: z.string().min(1),
});
export const saveEmailTemplate = async (
  _currentData: unknown,
  formData: FormData
) => {
  try {
    const payload = {
      campaignId: formData.get("campaignId")?.toString(),
      contentHtml: formData.get("contentHtml")?.toString(),
    };
    const validated = saveDesignSchema.safeParse(payload);

    if (!validated.success) {
      return {
        success: false,
        errors: validated.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      };
    }

    const res = await serverFetch.put(
      `/campaign/design/${validated.data.campaignId}`,
      {
        body: JSON.stringify(validated.data),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) {
      const err = await res.json();
      return { success: false, error: err.message };
    }

    return { success: true };
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return {
      success: false,
      errors: [
        {
          field: "general",
          message: error.message ?? "Unexpected error",
        },
      ],
    };
  }
};
