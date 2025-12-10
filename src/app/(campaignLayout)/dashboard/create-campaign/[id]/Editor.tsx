/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  canvasEmptyState,
  layoutSidebarButtons,
  rteProseMirror,
} from "@grapesjs/studio-sdk-plugins";
import StudioEditor from "@grapesjs/studio-sdk/react"; // ← THIS IS THE KEY FIX: React component, not create function
import "@grapesjs/studio-sdk/style"; // ← Keep this for CSS

interface EditorProps {
  campaignId: string;
}

export default function Editor({ campaignId }: EditorProps) {
  console.log("GrapesJS Studio Editor rendering for campaign:", campaignId);

  return (
    <StudioEditor
      options={{
        licenseKey:
          "dac1b694508a4b0691fc77053b326d83a2d6661e1c394473a33d23c526991e37", // ← Use env var
        project: {
          type: "email",
          id: campaignId,
        },
        identity: {
          id: "user-123", // Replace with real user ID later
        },
        assets: {
          storageType: "cloud",
        },
        storage: {
          type: "cloud",
          autosaveChanges: 100,
          autosaveIntervalMs: 10000,
        },
        plugins: [
          rteProseMirror.init({}),
          canvasEmptyState.init({}),
          layoutSidebarButtons.init({}),
        ],
      }}
      onReady={() => {
        console.log("✅ GrapesJS Studio FULLY LOADED! Editor ready.");
      }}
      onUpdate={(err: any) => {
        if (err) {
          console.error("❌ GrapesJS Studio Error:", err);
        }
      }}
      style={{ height: "100vh", width: "100%" }} // ← Simple height — React wrapper handles flex
    />
  );
}
