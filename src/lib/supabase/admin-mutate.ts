export async function adminDbMutate({
  table,
  action,
  data,
  match,
  onConflict,
}: {
  table: string;
  action: "insert" | "upsert" | "update" | "delete";
  data?: any;
  match?: Record<string, any>;
  onConflict?: string;
}) {
  const res = await fetch("/api/admin/db", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ table, action, data, match, onConflict }),
  });

  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(json.error || "İşlem gerçekleştirilemedi.");
  }

  return json.data;
}
