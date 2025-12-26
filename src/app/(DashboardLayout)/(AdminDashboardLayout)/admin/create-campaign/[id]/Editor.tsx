"use client";

import { Button } from "@/components/ui/button";
import GrapesJsStudio, {
  StudioCommands,
  ToastVariant,
} from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";
import type { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { ArrowLeft, Code2, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CampaignEditor({ campaignId }: { campaignId: string }) {
  const [editor, setEditor] = useState<Editor>();
  const [isSaving, setIsSaving] = useState(false);

  // Editor ready
  const onReady = (editorInstance: Editor) => {
    console.log("Editor loaded", editorInstance);
    setEditor(editorInstance);
  };

  // Show toast message
  const showToast = (id: string, message: string) =>
    editor?.runCommand(StudioCommands.toastAdd, {
      id,
      header: "Notification",
      content: message,
      variant: ToastVariant.Info,
    });

  // Save HTML (Simulated)
  const saveDesign = async () => {
    if (!editor) return;
    setIsSaving(true);

    const html = editor.getHtml();
    const css = editor.getCss();

    console.log("SAVED CONTENT:", { html, css });

    // Simulate API delay
    setTimeout(() => {
      showToast("saved", "Template saved successfully!");
      setIsSaving(false);
    }, 800);
  };

  // Log HTML + CSS
  const logHtmlCss = () => {
    if (editor) {
      console.log("HTML:", editor.getHtml());
      console.log("CSS:", editor.getCss());
      showToast("log-html", "Check your browser console for HTML/CSS");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#FFFBF5]">
      {/* 1. EDITOR HEADER: Replaces the bottom bar for a more "app-like" feel */}
      <header className="flex items-center justify-between px-6 h-16 border-b border-stone-200 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-4">
          <Link href="/admin/create-campaign">
            <Button
              variant="ghost"
              size="icon"
              className="text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Email Builder
            </h1>
            <p className="text-xs text-stone-500">
              Editing Campaign:{" "}
              <span className="font-mono text-orange-600">
                #{campaignId.slice(0, 8)}
              </span>
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={logHtmlCss}
            className="hidden md:flex gap-2 border-stone-200 text-stone-600 hover:bg-stone-100"
          >
            <Code2 className="w-4 h-4" />
            Log Code
          </Button>

          <Button
            size="sm"
            onClick={saveDesign}
            disabled={isSaving}
            className="gap-2 bg-stone-900 text-[#FFFBF5] hover:bg-orange-600 hover:text-white transition-all shadow-md shadow-stone-200"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Template"}
          </Button>
        </div>
      </header>

      {/* 2. MAIN EDITOR AREA */}
      {/* We use flex-1 to fill remaining height. The relative wrapper ensures GrapesJS stays contained. */}
      <div className="flex-1 relative w-full overflow-hidden bg-white">
        <GrapesJsStudio
          className="absolute inset-0 w-full h-full"
          onReady={onReady}
          options={{
            licenseKey:
              "b669eb6e18ee45ac8a8ff765b48fbd9640c1d903f8e2426b878da84b172caf55",
            theme: "light", // Keeps the editor UI clean

            // Custom Layout Configuration
            layout: {
              default: {
                type: "row",
                style: { height: "100%" },
                children: [
                  {
                    type: "sidebarLeft",
                    style: {
                      minWidth: "250px",
                      borderRight: "1px solid #e7e5e4",
                    },
                  }, // Adding border to match stone theme
                  { type: "canvasSidebarTop" }, // The main canvas + top toolbar
                  {
                    type: "sidebarRight",
                    style: {
                      minWidth: "300px",
                      borderLeft: "1px solid #e7e5e4",
                    },
                  },
                ],
              },
            },

            project: {
              type: "email",
              id: campaignId,
              default: {
                pages: [
                  {
                    name: "Home",
                    component: `
                      <div style="font-family: serif; color: #1c1917; padding: 40px; background-color: #fafaf9;">
                        <h1 style="text-align: center; font-size: 32px; margin-bottom: 20px;">
                          Welcome to your new design
                        </h1>
                        <p style="text-align: center; color: #57534e; font-size: 16px; line-height: 1.6;">
                          Start dragging elements from the right panel to build your email.
                        </p>
                      </div>
                    `,
                  },
                ],
              },
            },
          }}
        />
      </div>
    </div>
  );
}
