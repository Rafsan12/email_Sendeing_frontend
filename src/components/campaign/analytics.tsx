"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { singleCampaignData } from "@/service/campaign/analytics";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  LayoutDashboard,
  Mail,
  MoreHorizontal,
  MousePointerClick,
} from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState, useEffect } from "react";

/* ================= TYPES ================= */

type EmailAnalytics = {
  id: string;
  recipient: string;
  opened: boolean;
  clicked: boolean;
  openedAt: string | null;
  sentAt: string | null;
};

type CampaignAnalyticsData = {
  id: string;
  title: string;
  subject: string;
  contentHtml: string;
  sentAt: string | null;
  createdAt: string;
  emails: EmailAnalytics[];
};

/* ================= COMPONENT ================= */

export default function CampaignAnalytics({
  campaignId,
}: {
  campaignId: string;
}) {
  const [state, formAction, isPending] = useActionState(
    singleCampaignData,
    null
  );

  /* 🔁 Fetch analytics on mount */
  useEffect(() => {
    const fd = new FormData();
    fd.append("campaignId", campaignId);

    startTransition(() => {
      formAction(fd);
    });
  }, [campaignId, formAction]);

  /* ⏳ Loading */
  if (isPending || !state) {
    return (
      <div className="p-10 flex items-center gap-2 text-stone-500">
        Loading analytics...
      </div>
    );
  }

  /* ❌ Error */
  if (state.error) {
    return (
      <div className="p-10 text-red-600 bg-red-50 m-6 rounded-lg border border-red-100">
        {state.error}
      </div>
    );
  }

  /* ✅ Data */
  const campaignData = state.data.data as CampaignAnalyticsData;

  const emails = Array.isArray(campaignData.emails) ? campaignData.emails : [];

  /* 📊 Metrics */
  const totalSent = emails.length;
  const totalOpened = emails.filter((e) => e.opened).length;
  const totalClicked = emails.filter((e) => e.clicked).length;

  const openRate =
    totalSent === 0 ? "0.0" : ((totalOpened / totalSent) * 100).toFixed(1);

  const clickRate =
    totalSent === 0 ? "0.0" : ((totalClicked / totalSent) * 100).toFixed(1);

  /* 🕒 Date formatter */
  const formatDate = (date: string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] p-6 md:p-10 text-stone-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-start gap-4">
          <div>
            {/* BUTTON 1: Top Navigation */}
            <Link href="/admin/campaign">
              <Button
                variant="ghost"
                className="pl-0 text-stone-500 hover:text-orange-600 hover:bg-transparent mb-2 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Campaigns
              </Button>
            </Link>

            <h1 className="text-3xl font-serif font-bold flex items-center gap-3">
              {campaignData?.title}
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                Sent
              </Badge>
            </h1>

            <p className="text-sm text-stone-500 flex items-center gap-2 mt-1">
              <Mail className="w-4 h-4" />
              Subject:{" "}
              <span className="font-medium text-stone-700">
                {campaignData.subject}
              </span>
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-stone-200 text-stone-600"
            >
              Export
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-stone-400 hover:text-stone-900"
            >
              <MoreHorizontal />
            </Button>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Sent"
            value={totalSent}
            icon={<Mail className="text-stone-400" />}
            footer={formatDate(campaignData.sentAt)}
          />

          <StatCard
            title="Open Rate"
            value={`${openRate}%`}
            icon={<Eye className="text-orange-400" />}
            footer={`${totalOpened} opens`}
            highlight="text-orange-600"
          />

          <StatCard
            title="Click Rate"
            value={`${clickRate}%`}
            icon={<MousePointerClick className="text-blue-400" />}
            footer={`${totalClicked} clicks`}
          />

          <StatCard
            title="Success"
            value="100%"
            icon={<CheckCircle2 className="text-green-500" />}
            footer="No bounces"
          />
        </div>

        {/* ================= TABLE ================= */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif">Recipient Activity</CardTitle>
          </CardHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-stone-50 text-stone-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Opened At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {emails.map((email) => (
                  <tr
                    key={email.id}
                    className="hover:bg-stone-50/50 transition-colors"
                  >
                    <td className="px-6 py-3 font-medium text-stone-700">
                      {email.recipient}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        {email.opened ? (
                          <Badge
                            variant="secondary"
                            className="bg-green-50 text-green-700 hover:bg-green-100"
                          >
                            Opened
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-stone-100 text-stone-500 hover:bg-stone-200"
                          >
                            Unread
                          </Badge>
                        )}
                        {email.clicked && (
                          <Badge
                            variant="secondary"
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                          >
                            Clicked
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-stone-500">
                      {formatDate(email.openedAt)}
                    </td>
                  </tr>
                ))}
                {emails.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-8 text-center text-stone-400 italic"
                    >
                      No emails found for this campaign.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ================= FOOTER ACTIONS ================= */}
        {/* BUTTON 2: Bottom Navigation */}
        <div className="flex justify-center pt-8 border-t border-stone-200/50">
          <Link href="/admin/campaign">
            <Button
              variant="outline"
              className="border-stone-300 text-stone-600 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 transition-all"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Return to All Campaigns
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE STAT ================= */

function StatCard({
  title,
  value,
  footer,
  icon,
  highlight,
}: {
  title: string;
  value: string | number;
  footer: string;
  icon: React.ReactNode;
  highlight?: string;
}) {
  return (
    <Card className="border-stone-200 shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-stone-500 uppercase tracking-wider">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div
          className={`text-2xl font-bold font-serif ${
            highlight ?? "text-stone-900"
          }`}
        >
          {value}
        </div>
        <p className="text-xs text-stone-400 mt-1">{footer}</p>
      </CardContent>
    </Card>
  );
}
