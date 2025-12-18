export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h2 className="font-medium">Create Campaign</h2>
          <p className="text-sm text-muted-foreground">
            Design and send a new email campaign
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="font-medium">Campaigns</h2>
          <p className="text-sm text-muted-foreground">
            View and manage existing campaigns
          </p>
        </div>
      </div>
    </div>
  );
}
