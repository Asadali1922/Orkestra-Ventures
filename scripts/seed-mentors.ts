import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { mentors } from "../drizzle/schema";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read mentors from JSON file
const mentorsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../mentors_parsed.json"), "utf-8")
);

async function seedMentors() {
  // Get database URL from environment
  const connectionString =
    process.env.DATABASE_URL || "mysql://root@localhost:3306/orkestra";

  console.log("Connecting to database...");
  
  // Create connection
  const connection = await mysql.createConnection(connectionString);
  const db = drizzle(connection);

  console.log(`Seeding ${mentorsData.length} mentors...`);

  let added = 0;
  let skipped = 0;

  for (const mentor of mentorsData) {
    try {
      // Check if mentor already exists
      const [existing]: any = await connection.execute(
        "SELECT id FROM mentors WHERE linkedin = ?",
        [mentor.linkedin]
      );

      if (existing.length > 0) {
        console.log(`⏭️  Skipping ${mentor.name} - already exists`);
        skipped++;
        continue;
      }

      // Insert mentor
      await connection.execute(
        `INSERT INTO mentors (name, expertise, company, bio, linkedin, availability, sessions_conducted, rating, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          mentor.name,
          mentor.expertise || "Business Strategy",
          mentor.company || "Independent Consultant",
          mentor.bio,
          mentor.linkedin,
          "available",
          0,
          5.0,
        ]
      );

      console.log(`✅ Added: ${mentor.name}`);
      added++;
    } catch (error: any) {
      console.error(`❌ Error adding ${mentor.name}:`, error.message);
    }
  }

  await connection.end();

  console.log(`\n🎉 Seeding complete!`);
  console.log(`   Added: ${added} mentors`);
  console.log(`   Skipped: ${skipped} mentors`);
}

seedMentors()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
