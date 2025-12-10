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
  useEffect(() => {
    console.log("Initializing GrapesJS Studio for campaign:", campaignId);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const editor = createStudioEditor({
      root: "#studio-editor",
      licenseKey:
        "dac1b694508a4b0691fc77053b326d83a2d6661e1c394473a33d23c526991e37",
      project: {
        type: "email",
        id: campaignId,
      },
      identity: {
        id: "user-123", // change later if you have real user
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

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div id="studio-editor" style={{ flex: 1, minHeight: 0 }} />
    </div>
  );
}
