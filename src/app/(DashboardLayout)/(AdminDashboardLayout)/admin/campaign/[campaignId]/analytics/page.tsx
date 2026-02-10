import CampaignAnalytics from "@/components/campaign/analytics";

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = await params;

  return <CampaignAnalytics campaignId={campaignId} />;
}
