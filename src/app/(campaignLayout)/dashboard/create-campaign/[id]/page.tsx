"use client";

import { use } from "react";
import Editor from "./Editor";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  // unwrap the promised params
  const resolvedParams = use(params);

  return <Editor campaignId={resolvedParams.id} />;
}
