/* eslint-disable react/no-unescaped-entities */
"use client";

import { createCampaign } from "@/service/campaign/createCampaign";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useActionState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function CreateCampaign() {
  const [state, formAction, isPending] = useActionState(createCampaign, null);
  // console.log(state);
  return (
    <div className="min-h-screen bg-[#FFFBF5] py-20 px-6 flex justify-center">
      <div className="w-full max-w-2xl relative">
        {/* Header */}
        <div className="mb-16 pl-12 md:pl-20">
          <h1 className="text-4xl font-serif font-bold text-stone-900">
            New Campaign
          </h1>
          <p className="text-stone-500 mt-2">
            Follow the steps to launch your next email.
          </p>
        </div>

        <form action={formAction} className="relative">
          {/* THE VERTICAL LINE (The Timeline Track) */}
          <div className="absolute left-4 top-4 bottom-20 w-0.5 bg-linear-to-b from-orange-300 via-orange-100 to-transparent md:left-6"></div>

          {/* STEP 1: IDENTITY */}
          <div className="relative mb-16 pl-12 md:pl-20 group">
            {/* The Dot */}
            <div className="absolute left-0 top-0 w-8 h-8 md:w-12 md:h-12 bg-white border-2 border-orange-200 rounded-full flex items-center justify-center z-10 shadow-sm group-focus-within:border-orange-500 group-focus-within:scale-110 transition-all duration-300">
              <span className="font-mono text-sm font-bold text-orange-600">
                01
              </span>
            </div>

            <div className="space-y-4">
              <label
                htmlFor="title"
                className="block text-lg font-serif font-medium text-stone-900"
              >
                What should we call this?
              </label>
              <div className="relative">
                <Input
                  id="title"
                  name="title"
                  required
                  placeholder="e.g. October Newsletter"
                  className="h-14 bg-white border-stone-100 shadow-sm text-lg focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:border-orange-500 rounded-xl px-5 transition-all"
                />

                <p className="mt-2 text-xs text-stone-400">
                  This is for your internal reference only.
                </p>
              </div>
            </div>
          </div>

          {/* STEP 2: THE HOOK */}
          <div className="relative mb-16 pl-12 md:pl-20 group">
            {/* The Dot */}
            <div className="absolute left-0 top-0 w-8 h-8 md:w-12 md:h-12 bg-white border-2 border-orange-200 rounded-full flex items-center justify-center z-10 shadow-sm group-focus-within:border-orange-500 group-focus-within:scale-110 transition-all duration-300">
              <span className="font-mono text-sm font-bold text-orange-600">
                02
              </span>
            </div>

            <div className="space-y-4">
              <label
                htmlFor="subject"
                className="block text-lg font-serif font-medium text-stone-900"
              >
                What's the subject line?
              </label>
              <div className="relative">
                {/* Decorative Sparkle Icon inside input */}
                <Sparkles className="absolute right-4 top-4 w-5 h-5 text-orange-300 pointer-events-none" />
                <Input
                  id="subject"
                  name="subject"
                  required
                  placeholder="Make it click-worthy..."
                  className="h-14 bg-white border-stone-100 shadow-sm text-lg focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:border-orange-500 rounded-xl px-5 pr-12 transition-all"
                />
              </div>
            </div>
          </div>

          {/* STEP 3: THE AUDIENCE */}
          <div className="relative mb-20 pl-12 md:pl-20 group">
            {/* The Dot */}
            <div className="absolute left-0 top-0 w-8 h-8 md:w-12 md:h-12 bg-white border-2 border-orange-200 rounded-full flex items-center justify-center z-10 shadow-sm group-focus-within:border-orange-500 group-focus-within:scale-110 transition-all duration-300">
              <span className="font-mono text-sm font-bold text-orange-600">
                03
              </span>
            </div>

            <div className="space-y-4">
              <label
                htmlFor="recipients"
                className="block text-lg font-serif font-medium text-stone-900"
              >
                Who is receiving this?
              </label>
              <div className="relative bg-white border border-stone-100 rounded-xl p-1 shadow-sm focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all">
                <Textarea
                  id="recipients"
                  name="recipients"
                  required
                  placeholder="email@example.com..."
                  className="min-h-30 border-none shadow-none text-base resize-none bg-transparent focus-visible:ring-0"
                />
                <div className="px-3 pb-2 flex justify-between items-center border-t border-stone-50 pt-2">
                  <span className="text-xs text-stone-400">
                    Separate with commas
                  </span>
                  <div className="text-xs font-mono text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                    RAW INPUT
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FINAL STEP: SUBMIT */}
          <div className="relative pl-12 md:pl-20">
            <Button
              type="submit"
              disabled={isPending}
              className="h-16 w-full md:w-auto md:min-w-50 rounded-full bg-stone-900 hover:bg-orange-600 text-white text-lg font-medium shadow-xl shadow-stone-200 transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Setting up...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  Start Building
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
