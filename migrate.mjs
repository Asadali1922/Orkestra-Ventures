import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: '139.59.84.155',
      user: 'myuser',
      password: 'QwQpxoZe70MDHQM4',
      database: 'orkestra'
    });

    const files = [
      './drizzle/0001_mean_expediter.sql',
      './drizzle/0002_spooky_mephisto.sql',
      './drizzle/0003_organic_tomorrow_man.sql',
      './drizzle/0004_unique_puck.sql'
    ];

    for (const file of files) {
      const sql = readFileSync(file, 'utf8');
      const statements = sql.split(';')
        .map(s => s.trim())
        .filter(s => s && !s.startsWith('-->'));

      for (const stmt of statements) {
        try {
          await conn.query(stmt);
        } catch(e) {
          if (e.code !== 'ER_TABLE_EXISTS_ERROR') {
            console.log('  Error:', e.message.substring(0, 80));
          }
        }
      }
    }

    const [tables] = await conn.query('SHOW TABLES');
    console.log('\n✅ Database migration complete!');
    console.log('📊 Total tables:', tables.length);
    console.log('\n📋 Tables created:');
    tables.forEach(t => console.log('   ✓', Object.values(t)[0]));

    await conn.end();
  } catch(e) {
    console.log('❌ Error:', e.message);
    process.exit(1);
  }
})();
