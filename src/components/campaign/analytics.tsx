"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { singleCampaignData } from "@/service/campaign/analytics";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
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
  console.log(state);
  const data = state?.data.data.emails;
  console.log(data);

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
    return <div className="p-10">Loading analytics…</div>;
  }

  /* ❌ Error */
  if (state.error) {
    return <div className="p-10 text-red-600">{state.error}</div>;
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
            <Link
              href="/campaigns"
              className="text-sm text-stone-500 flex items-center gap-1 mb-2"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Campaigns
            </Link>

            <h1 className="text-3xl font-serif font-bold flex items-center gap-3">
              {campaignData?.title}
              <Badge className="bg-green-100 text-green-700">Sent</Badge>
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
            <Button variant="outline">Export</Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal />
            </Button>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Sent"
            value={totalSent}
            icon={<Mail />}
            footer={formatDate(campaignData.sentAt)}
          />

          <StatCard
            title="Open Rate"
            value={`${openRate}%`}
            icon={<Eye />}
            footer={`${totalOpened} opens`}
            highlight="text-orange-600"
          />

          <StatCard
            title="Click Rate"
            value={`${clickRate}%`}
            icon={<MousePointerClick />}
            footer={`${totalClicked} clicks`}
          />

          <StatCard
            title="Success"
            value="100%"
            icon={<CheckCircle2 />}
            footer="No bounces"
          />
        </div>

        {/* ================= TABLE ================= */}
        <Card>
          <CardHeader>
            <CardTitle>Recipient Activity</CardTitle>
          </CardHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50">
                <tr>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Opened At</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((email) => (
                  <tr key={email.id} className="border-t">
                    <td className="px-6 py-3">{email.recipient}</td>
                    <td className="px-6 py-3">
                      {email.opened ? "Opened" : "Unread"}
                      {email.clicked && " · Clicked"}
                    </td>
                    <td className="px-6 py-3">{formatDate(email.openedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
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
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle className="text-sm text-stone-500">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${highlight ?? ""}`}>{value}</div>
        <p className="text-xs text-stone-500 mt-1">{footer}</p>
      </CardContent>
    </Card>
  );
}
