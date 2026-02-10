"use client";

import { Button } from "@/components/ui/button";
import { saveEmailTemplate } from "@/service/campaign/saveCampaignDesign";
import GrapesJsStudio from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";
import type { Editor } from "grapesjs";

import "grapesjs/dist/css/grapes.min.css";
import { ArrowLeft, Code2, Save, Send } from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState, useState } from "react";

export default function CampaignEditor({ campaignId }: { campaignId: string }) {
  const [editor, setEditor] = useState<Editor | null>(null);

  const [state, formAction, isPending] = useActionState(
    saveEmailTemplate,
    null
  );

  const onReady = (editorInstance: Editor) => {
    setEditor(editorInstance);
  };

  const saveDesign = () => {
    if (!editor) return;

    const mjml = editor.getHtml();

    const fd = new FormData();
    fd.append("campaignId", campaignId);
    fd.append("contentHtml", mjml);

    startTransition(() => {
      formAction(fd);
    });
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#FFFBF5]">
      {/* ================= HEADER ================= */}
      <header className="flex items-center justify-between px-6 h-16 border-b border-stone-200 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/admin/create-campaign">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>

          <div>
            <h1 className="text-sm font-bold">Email Builder</h1>
            <p className="text-xs text-stone-500">
              Campaign:
              <span className="font-mono ml-1 text-orange-600">
                #{campaignId.slice(0, 8)}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (!editor) return;
              console.log("MJML:", editor.getHtml());
            }}
          >
            <Code2 className="w-4 h-4 mr-1" />
            Debug
          </Button>

          <Link href={`/admin/create-campaign/${campaignId}/send`}>
            <Button variant="outline" size="sm">
              <Send className="w-4 h-4 mr-1" />
              Send Test
            </Button>
          </Link>

          <Button
            size="sm"
            onClick={saveDesign}
            disabled={isPending}
            className="bg-stone-900 text-white"
          >
            <Save className="w-4 h-4 mr-1" />
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>

      {/* ================= EDITOR ================= */}
      <div className="flex-1 relative w-full overflow-hidden bg-white">
        <GrapesJsStudio
          className="absolute inset-0 w-full h-full"
          onReady={onReady}
          options={{
            licenseKey: process.env.NEXT_PUBLIC_GRAPESJS_KEY!,
            theme: "auto",

            project: {
              type: "email",
              id: campaignId,
              default: {
                pages: [
                  {
                    name: "Email",
                    component: `
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="20px" font-weight="bold">
          Hello 👋
        </mj-text>
        <mj-text>
          Start designing your email.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
                    `,
                  },
                ],
              },
            },
          }}
        />
      </div>

      {/* ================= STATUS ================= */}
      {state?.success && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded">
          Saved successfully ✅
        </div>
      )}
    </div>
  );
}
