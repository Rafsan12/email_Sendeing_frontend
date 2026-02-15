import CampaignEditor from "./Editor";

export default async function EditPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = await params;

  return <CampaignEditor campaignId={campaignId} />;
}
