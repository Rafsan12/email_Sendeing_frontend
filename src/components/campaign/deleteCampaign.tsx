"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { deleteCampaign } from "@/service/campaign/deleteCampaign";

interface DeleteCampaignModalProps {
  campaignId: string;
  campaignTitle: string;
}

export function DeleteCampaignModal({
  campaignId,
  campaignTitle,
}: DeleteCampaignModalProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-stone-500 hover:text-red-600 hover:bg-red-50"
          title="Delete Campaign"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600">Delete Campaign</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-stone-900">
              “{campaignTitle}”
            </span>
            ?
            <br />
            <span className="text-red-500 font-medium">
              This action cannot be undone.
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                await deleteCampaign(campaignId);
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
