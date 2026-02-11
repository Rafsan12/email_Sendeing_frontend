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
  recipients: z.array(z.email("Invalid email address")),
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

    const campaignData = {
      title: formData.get("title")?.toString(),
      subject: formData.get("subject")?.toString(),
      contentHtml: formData.get("contentHtml")?.toString(),
      createdById: userId,
      recipients: recipientsRaw
        ? recipientsRaw
            .toString()
            .split(",")
            .map((email) => email.trim())
            .filter(Boolean)
        : [],
    };

    const validated = createCampaignSchema.safeParse(campaignData);

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
