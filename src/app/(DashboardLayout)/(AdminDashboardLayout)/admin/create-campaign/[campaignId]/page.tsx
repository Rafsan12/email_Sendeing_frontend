import CampaignEditor from "./Editor";

export default async function EditPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = await params;

  return <CampaignEditor campaignId={campaignId} />;
}

// export default function Page({ params }: { params: Promise<{ id: string }> }) {
//   // unwrap the promised params
//   const resolvedParams = use(params);

//   return <CampaignEditor campaignId={resolvedParams.id} />;
// }
