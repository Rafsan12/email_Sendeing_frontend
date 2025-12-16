"use client";

import { use } from "react";
import CampaignEditor from "./Editor";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  // unwrap the promised params
  const resolvedParams = use(params);

  return <CampaignEditor campaignId={resolvedParams.id} />;
}
