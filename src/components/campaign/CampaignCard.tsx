/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { singleUserCampaign } from "@/service/campaign/singleUserCampaign";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Mail,
  Plus,
  Send,
} from "lucide-react";
import Link from "next/link";

export default async function CampaignCard() {
  const res = await singleUserCampaign();

  if (!res.success) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 rounded-xl border border-red-100">
        Failed to load campaigns. Please try again later.
      </div>
    );
  }

  const campaigns = res.data;

  // Derive totals
  const totalCampaigns = campaigns.length;
  const totalEmailsSent = campaigns.reduce(
    (sum: number, c: any) => sum + (c.emails?.length ?? 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#FFFBF5] p-6 md:p-10 text-stone-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* ================= HEADER & ACTION ================= */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
              Dashboard
            </h1>
            <p className="text-stone-500 mt-1">
              Overview of your email marketing performance.
            </p>
          </div>

          {/* THE NEW BUTTON */}
          <Link href="/admin/create-campaign">
            <Button className="h-12 px-6 bg-stone-900 hover:bg-orange-600 text-white rounded-full shadow-lg shadow-stone-200 hover:shadow-orange-200 transition-all duration-300 group">
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Create New Campaign
            </Button>
          </Link>
        </div>

        {/* ================= SUMMARY STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stat 1: Total Campaigns */}
          <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
                Total Campaigns
              </p>
              <p className="text-4xl font-serif font-bold text-stone-900">
                {totalCampaigns}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
              <Mail className="w-6 h-6" />
            </div>
          </div>

          {/* Stat 2: Emails Sent */}
          <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
                Emails Delivered
              </p>
              <p className="text-4xl font-serif font-bold text-stone-900">
                {totalEmailsSent.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
              <Send className="w-5 h-5 ml-1" />
            </div>
          </div>
        </div>

        {/* ================= CAMPAIGN GRID ================= */}
        <div>
          <h2 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
            Recent Campaigns
            <Badge
              variant="secondary"
              className="bg-stone-100 text-stone-500 hover:bg-stone-200"
            >
              {totalCampaigns}
            </Badge>
          </h2>

          {totalCampaigns === 0 ? (
            /* Empty State */
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
              <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-stone-900">
                No campaigns yet
              </h3>
              <p className="text-stone-500 mb-6">
                Create your first campaign to get started.
              </p>
              <Link href="/admin/create-campaign">
                <Button variant="outline">Create Campaign</Button>
              </Link>
            </div>
          ) : (
            /* Card Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((c: any) => {
                const isSent = c.status === "COMPLETED" || c.sentAt; // Adjust logic based on your API

                return (
                  <div
                    key={c.id}
                    className="group bg-white p-6 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-stone-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
                  >
                    {/* Card Top */}
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <Badge
                          variant="outline"
                          className={
                            isSent
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }
                        >
                          {isSent ? "Sent" : c.status || "Draft"}
                        </Badge>
                        {c.sentAt && (
                          <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(c.sentAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-serif font-bold text-stone-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                        {c.title}
                      </h3>
                      <p className="text-sm text-stone-500 line-clamp-2 mb-6 h-10">
                        {c.subject || "No subject line..."}
                      </p>
                    </div>

                    {/* Card Bottom (Action) */}
                    <div className="pt-6 border-t border-stone-50 mt-auto">
                      <Link
                        href={`/admin/campaign/${c.id}/analytics`}
                        className="w-full"
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-stone-500 hover:text-stone-900 hover:bg-stone-50 group-hover:bg-orange-50 group-hover:text-orange-700"
                        >
                          <span className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            Analytics
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
