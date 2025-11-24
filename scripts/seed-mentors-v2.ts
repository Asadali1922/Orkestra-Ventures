import mysql from "mysql2/promise";
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

  console.log("Updating mentors table schema...");
  
  // Add new columns if they don't exist
  try {
    await connection.execute(`
      ALTER TABLE mentors 
      ADD COLUMN IF NOT EXISTS linkedin VARCHAR(500),
      ADD COLUMN IF NOT EXISTS profileImage VARCHAR(500),
      ADD COLUMN IF NOT EXISTS availability ENUM('available', 'busy', 'unavailable') DEFAULT 'available',
      ADD COLUMN IF NOT EXISTS rating DECIMAL(3, 2) DEFAULT 5.00
    `);
    console.log("✅ Schema updated successfully");
  } catch (error: any) {
    console.log("Note:", error.message);
  }

  console.log(`\nSeeding ${mentorsData.length} mentors...`);

  let added = 0;
  let skipped = 0;

  for (const mentor of mentorsData) {
    try {
      // Split name into first and last name
      const nameParts = mentor.name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || firstName;
      
      // Generate email from name if not available
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(/\s+/g, '')}@mentor.orkestra.ventures`;

      // Check if mentor already exists by email or linkedin
      const [existing]: any = await connection.execute(
        "SELECT id FROM mentors WHERE email = ? OR (linkedin IS NOT NULL AND linkedin = ?)",
        [email, mentor.linkedin]
      );

      if (existing.length > 0) {
        console.log(`⏭️  Skipping ${mentor.name} - already exists`);
        skipped++;
        continue;
      }

      // Insert mentor
      await connection.execute(
        `INSERT INTO mentors (
          firstName, lastName, email, company, expertise, bio, 
          linkedin, availability, rating, status, sessionsCompleted, createdAt, updatedAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          firstName,
          lastName,
          email,
          mentor.company || "Independent Consultant",
          mentor.expertise || "Business Strategy",
          mentor.bio,
          mentor.linkedin,
          "available",
          5.0,
          "active",
          0
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
