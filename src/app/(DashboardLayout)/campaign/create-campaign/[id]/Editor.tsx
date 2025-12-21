"use client";

import GrapesJsStudio, {
  StudioCommands,
  ToastVariant,
} from "@grapesjs/studio-sdk/react";
import type { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { useState } from "react";

import "@grapesjs/studio-sdk/style";

export default function CampaignEditor({ campaignId }: { campaignId: string }) {
  const [editor, setEditor] = useState<Editor>();
  const [initialHtml] = useState<string>(""); // no loading from API

  // Editor ready
  const onReady = (editorInstance: Editor) => {
    console.log("Editor loaded", editorInstance);
    setEditor(editorInstance);

    // If you want to load saved HTML in the future:
    // if (initialHtml) editorInstance.setComponents(initialHtml);
  };

  // Show toast message
  const showToast = (id: string, message: string) =>
    editor?.runCommand(StudioCommands.toastAdd, {
      id,
      header: "Notification",
      content: message,
      variant: ToastVariant.Info,
    });

  // Save HTML (no backend yet)
  const saveDesign = async () => {
    if (!editor) return;

    const html = editor.getHtml();
    console.log("SAVED HTML:", html);

    // Future backend integration:
    // await fetch(`/api/campaign/${campaignId}/design`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ contentHtml: html }),
    // });

    showToast("saved", "Template saved (console only for now)");
  };

  // Log HTML + CSS
  const logHtmlCss = () => {
    if (editor) {
      console.log("HTML:", editor.getHtml());
      console.log("CSS:", editor.getCss());
      showToast("log-html", "HTML/CSS logged in console");
    }
  };

  return (
    <main className="flex flex-col " style={{ height: "100vh" }}>
      {/* Editor takes all space except bottom bar */}
      <div className="flex-1  relative overflow-hidden">
        <GrapesJsStudio
          className="absolute bg-red-900 inset-0"
          onReady={onReady}
          options={{
            licenseKey:
              "b669eb6e18ee45ac8a8ff765b48fbd9640c1d903f8e2426b878da84b172caf55",
            theme: "light",

            layout: {
              default: {
                type: "row",
                style: { height: "100%" },
                children: [
                  { type: "sidebarLeft" },
                  { type: "canvasSidebarTop" },
                  { type: "sidebarRight" },
                ],
              },
            },

            plugins: [
              (editor) =>
                editor.onReady(() => {
                  // let's show the global style panel on start
                  editor.runCommand("studio:layoutToggle", {
                    id: "gs",
                    layout: "panelGlobalStyles",
                    header: { label: "Global Styles" },
                    placer: { type: "absolute", position: "right" },
                  });
                }),
            ],
            project: {
              type: "email",
              id: campaignId,
              default: {
                pages: [
                  {
                    name: "Hello",
                    component: `<h1 style="padding: 2rem; text-align: center">
                    Hello Email 👋
                  </h1>`,
                  },
                ],
              },
            },
            // layout configuration removed - use default layout
          }}
        />
      </div>

      {/* Bottom buttons - fixed height */}
      <div className="h-16 flex items-center justify-center gap-4 border-t border-gray-200 px-4 shrink-0">
        <button
          onClick={saveDesign}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save Template
        </button>
        <button
          onClick={logHtmlCss}
          className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          Log HTML / CSS
        </button>
      </div>
    </main>
  );
}
