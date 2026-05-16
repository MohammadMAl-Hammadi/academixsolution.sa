import { getDb } from "../api/queries/connection";

async function main() {
  const db = getDb();
  const tables = [
    "users",
    "service_requests",
    "contact_messages",
    "projects",
    "faq_entries",
    "site_visits",
    "stats",
  ];
  for (const t of tables) {
    try {
      await db.execute("DROP TABLE IF EXISTS `" + t + "`");
      console.log("Dropped", t);
    } catch (e: any) {
      console.log("Skip", t, e.message);
    }
  }
  console.log("Done");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
