"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { sendCampaignEmail } from "@/service/campaign/sendCampaign";
import { AlertCircle, Loader2, Rocket, Send } from "lucide-react";
import { startTransition, useActionState } from "react";

export default function SendCampaign({ campaignId }: { campaignId: string }) {
  const [state, formAction, isPending] = useActionState(
    sendCampaignEmail,
    null
  );

  const handleSend = () => {
    const fd = new FormData();
    fd.append("campaignId", campaignId);

    startTransition(() => {
      formAction(fd);
    });
  };

  // 2. READY TO SEND VIEW
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full bg-[#FFFBF5]">
      <Card className="relative w-full max-w-lg border-0 shadow-2xl shadow-stone-200/50 bg-white overflow-hidden">
        {/* Top Decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />

        <div className="p-8 md:p-12">
          {/* Icon Header */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center border border-orange-100">
                <Rocket className="w-10 h-10 text-orange-600 ml-1" />
              </div>
              {/* Pulsing Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-orange-500/10 animate-ping" />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center space-y-4 mb-10">
            <h1 className="text-3xl font-serif font-bold text-stone-900">
              Ready for liftoff?
            </h1>
            <p className="text-stone-500 text-base leading-relaxed">
              You are about to send campaign{" "}
              <span className="font-mono text-xs bg-stone-100 px-2 py-1 rounded text-stone-700">
                #{campaignId.slice(0, 8)}
              </span>{" "}
              to your audience. This action cannot be undone.
            </p>
          </div>

          {/* Error Message */}
          {state?.error && (
            <Alert
              variant="destructive"
              className="mb-6 border-red-200 bg-red-50 text-red-800"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          {/* Action Button */}
          <div className="space-y-4">
            <Button
              onClick={handleSend}
              disabled={isPending}
              className="w-full h-14 text-lg font-semibold bg-stone-900 hover:bg-orange-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-200 group"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending emails...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>Send Campaign Now</span>
                </div>
              )}
            </Button>

            <p className="text-xs text-center text-stone-400">
              By clicking send, you agree to our anti-spam policy.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
