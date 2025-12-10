"use client";

import createStudioEditor from "@grapesjs/studio-sdk";
import {
  canvasEmptyState,
  layoutSidebarButtons,
  rteProseMirror,
} from "@grapesjs/studio-sdk-plugins";
import "@grapesjs/studio-sdk/style";
import { useEffect } from "react";

export default function Editor({ campaignId }: { campaignId: string }) {
  console.log("Editor component loaded");

  useEffect(() => {
    console.log("Initializing editor with ID:", campaignId);
    createStudioEditor({
      root: "#studio-editor",
      licenseKey:
        "dac1b694508a4b0691fc77053b326d83a2d6661e1c394473a33d23c526991e37",
      project: {
        type: "email",
        id: campaignId, // connect GrapesJS to this campaign
      },
      identity: {
        id: "STATIC_OR_USER_ID",
      },
      assets: { storageType: "cloud" },
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
    });
  }, [campaignId]);

  return <div id="studio-editor" style={{ height: "100vh", width: "100%" }} />;
}
