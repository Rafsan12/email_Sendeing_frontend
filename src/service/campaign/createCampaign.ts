"use server";

import { serverFetch } from "@/lib/server-fetch";
import { getCookie } from "@/service/auth/tokenHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import z from "zod";

const createCampaignSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subject: z.string().min(1, "Subject is required"),
  contentHtml: z.string().optional(),
  createdById: z.uuid("Invalid createdById"),
  recipients: z
    .array(z.string().trim().email("Invalid email address"))
    .min(1, "At least one recipient is required")
    .max(50, "Too many recipients"),
});

export const createCampaign = async (
  _currentData: unknown,
  formData: FormData,
) => {
  try {
    const token = await getCookie("accessToken");
    // console.log(token);
    if (!token) {
      return {
        success: false,
        errors: [{ field: "general", message: "Unauthorized" }],
      };
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET!,
    ) as JwtPayload;
    const userId = decoded.id;

    const recipientsRaw = formData.get("recipients");
    const recipientsArray =
      recipientsRaw
        ?.toString()
        .split(/[,\n;\s]+/)
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean) ?? [];

    const uniqueEmail = Array.from(new Set(recipientsArray));

    const campaignData = {
      title: formData.get("title")?.toString(),
      subject: formData.get("subject")?.toString(),
      contentHtml: formData.get("contentHtml")?.toString(),
      createdById: userId,
      recipients: uniqueEmail,
    };

    const validated = createCampaignSchema.safeParse(campaignData);
    console.log("from server", validated);

    if (!validated.success) {
      return {
        success: false,
        errors: validated.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      };
    }

    const res = await serverFetch.post("/campaign/create-campaign", {
      body: JSON.stringify(validated.data),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const err = await res.json();
      return {
        success: false,
        errors: [
          {
            field: "general",
            message: err.message ?? "Failed to create campaign",
          },
        ],
      };
    }

    const { data: campaign } = await res.json();

    const campaignId = campaign?.id;

    if (!campaignId) {
      throw new Error("Campaign ID missing from response");
    }

    redirect(`/create-campaign/${campaignId}`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
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
