"use client";

import { sendCampaignEmail } from "@/service/campaign/sendCampaign";
import { startTransition, useActionState } from "react";
import { Button } from "../ui/button";

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

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Send Campaign</h1>

      <p className="text-muted-foreground">
        This will send the email to all recipients.
      </p>

      <Button onClick={handleSend} disabled={isPending}>
        {isPending ? "Sending..." : "Send Now"}
      </Button>

      {state?.success && <p className="text-green-600">Sent successfully ✅</p>}
      {state?.error && <p className="text-red-600">{state.error}</p>}
    </div>
  );
}
