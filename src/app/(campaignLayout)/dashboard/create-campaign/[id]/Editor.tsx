"use client";

import createStudioEditor from "@grapesjs/studio-sdk";
import {
  canvasEmptyState,
  layoutSidebarButtons,
  rteProseMirror,
} from "@grapesjs/studio-sdk-plugins";
import "@grapesjs/studio-sdk/style";
import { useEffect, useRef } from "react";

export default function Editor({ campaignId }: { campaignId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorInitialized = useRef(false);

  useEffect(() => {
    if (!containerRef.current || editorInitialized.current) return;

    console.log("Mounting GrapesJS Studio on real DOM element");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const editor = createStudioEditor({
      root: containerRef.current, // ← THIS IS THE FIX (pass the real DOM node, not a selector)
      licenseKey:
        "dac1b694508a4b0691fc77053b326d83a2d6661e1c394473a33d23c526991e37",
      project: {
        type: "email",
        id: campaignId,
      },
      identity: { id: "user-123" },
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

    editorInitialized.current = true;
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
      <div
        ref={containerRef}
        style={{ flex: 1, minHeight: 0, background: "#f9fafb" }}
      />
    </div>
  );
}
