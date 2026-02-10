import SendCampaign from "@/components/campaign/SendCampaign";

export default async function SendPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = await params;

  return <SendCampaign campaignId={campaignId} />;
}
