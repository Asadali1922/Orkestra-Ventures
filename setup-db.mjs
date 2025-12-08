import mysql from 'mysql2/promise';

const createAllTables = async () => {
  const conn = await mysql.createConnection({
    host: '139.59.84.155',
    user: 'myuser',
    password: 'QwQpxoZe70MDHQM4',
    database: 'orkestra'
  });

  const tables = [
    `CREATE TABLE IF NOT EXISTS \`contacts\` (
      \`id\` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
      \`name\` varchar(255) NOT NULL,
      \`email\` varchar(320) NOT NULL,
      \`phone\` varchar(50),
      \`subject\` varchar(255) NOT NULL,
      \`message\` text NOT NULL,
      \`status\` enum('new','in_progress','resolved') NOT NULL DEFAULT 'new',
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS \`cohorts\` (
      \`id\` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
      \`name\` varchar(255) NOT NULL,
      \`code\` varchar(50) NOT NULL UNIQUE,
      \`startDate\` timestamp NOT NULL,
      \`endDate\` timestamp NOT NULL,
      \`capacity\` int NOT NULL,
      \`enrolled\` int DEFAULT 0,
      \`status\` enum('planning','recruiting','active','completed') DEFAULT 'planning',
      \`location\` varchar(255),
      \`description\` text,
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS \`employees\` (
      \`id\` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
      \`employeeId\` varchar(50) NOT NULL UNIQUE,
      \`fullName\` varchar(255) NOT NULL,
      \`email\` varchar(320) NOT NULL UNIQUE,
      \`phone\` varchar(50),
      \`position\` varchar(255) NOT NULL,
      \`department\` enum('management','operations','marketing','technology','finance','hr') NOT NULL,
      \`employmentType\` enum('full-time','part-time','contract','intern') NOT NULL,
      \`salary\` decimal(10,2),
      \`currency\` varchar(10) DEFAULT 'EGP',
      \`hireDate\` date NOT NULL,
      \`endDate\` date,
      \`status\` enum('active','on-leave','terminated') NOT NULL DEFAULT 'active',
      \`address\` text,
      \`emergencyContact\` varchar(255),
      \`emergencyPhone\` varchar(50),
      \`notes\` text,
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS \`expenses\` (
      \`id\` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
      \`budgetId\` int,
      \`category\` varchar(100) NOT NULL,
      \`description\` text NOT NULL,
      \`amount\` decimal(10,2) NOT NULL,
      \`expenseDate\` timestamp NOT NULL,
      \`vendor\` varchar(255),
      \`status\` enum('pending','approved','paid') DEFAULT 'pending',
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS \`invoices\` (
      \`id\` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
      \`invoiceNumber\` varchar(50) NOT NULL UNIQUE,
      \`clientName\` varchar(255) NOT NULL,
      \`clientEmail\` varchar(320),
      \`description\` text NOT NULL,
      \`amount\` decimal(10,2) NOT NULL,
      \`currency\` varchar(10) DEFAULT 'EGP',
      \`taxAmount\` decimal(10,2) DEFAULT '0',
      \`totalAmount\` decimal(10,2) NOT NULL,
      \`status\` enum('draft','sent','paid','overdue','cancelled') NOT NULL DEFAULT 'draft',
      \`issueDate\` date NOT NULL,
      \`dueDate\` date NOT NULL,
      \`paidDate\` date,
      \`paymentMethod\` varchar(100),
      \`notes\` text,
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS \`leads\` (
      \`id\` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
      \`firstName\` varchar(100) NOT NULL,
      \`lastName\` varchar(100) NOT NULL,
      \`email\` varchar(255) NOT NULL,
      \`phone\` varchar(50),
      \`company\` varchar(255),
      \`source\` enum('website','referral','event','social_media','partner','other') DEFAULT 'website',
      \`status\` enum('new','contacted','qualified','converted','lost') DEFAULT 'new',
      \`notes\` text,
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS \`mentors\` (
      \`id\` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
      \`firstName\` varchar(100) NOT NULL,
      \`lastName\` varchar(100) NOT NULL,
      \`email\` varchar(255) NOT NULL UNIQUE,
      \`phone\` varchar(50),
      \`company\` varchar(255),
      \`expertise\` text,
      \`bio\` text,
      \`status\` enum('active','inactive') DEFAULT 'active',
      \`sessionsCompleted\` int DEFAULT 0,
      \`linkedin\` varchar(500),
      \`profileImage\` varchar(500),
      \`availability\` enum('available','busy','unavailable') DEFAULT 'available',
      \`rating\` decimal(3,2) DEFAULT '5.00',
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS \`newsletterSubscribers\` (
      \`id\` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
      \`email\` varchar(320) NOT NULL UNIQUE,
      \`name\` varchar(255),
      \`isActive\` int NOT NULL DEFAULT 1,
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`unsubscribedAt\` timestamp
    )`,
    
    `CREATE TABLE IF NOT EXISTS \`siteSettings\` (
      \`id\` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
      \`settingKey\` varchar(100) NOT NULL UNIQUE,
      \`settingValue\` text,
      \`settingType\` enum('text','url','image','number','json') NOT NULL DEFAULT 'text',
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS \`transactions\` (
      \`id\` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
      \`transactionNumber\` varchar(50) NOT NULL UNIQUE,
      \`type\` enum('income','expense') NOT NULL,
      \`category\` varchar(100) NOT NULL,
      \`description\` text NOT NULL,
      \`amount\` decimal(10,2) NOT NULL,
      \`currency\` varchar(10) DEFAULT 'EGP',
      \`paymentMethod\` varchar(100),
      \`referenceNumber\` varchar(100),
      \`relatedInvoiceId\` int,
      \`relatedExpenseId\` int,
      \`transactionDate\` date NOT NULL,
      \`status\` enum('completed','pending','cancelled') NOT NULL DEFAULT 'completed',
      \`notes\` text,
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS \`webPages\` (
      \`id\` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
      \`slug\` varchar(255) NOT NULL UNIQUE,
      \`title\` varchar(255) NOT NULL,
      \`content\` text NOT NULL,
      \`status\` enum('draft','published') DEFAULT 'draft',
      \`updatedBy\` varchar(100),
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS \`applications\` (
      \`id\` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
      \`fullName\` varchar(255) NOT NULL,
      \`email\` varchar(320) NOT NULL,
      \`phone\` varchar(50) NOT NULL,
      \`country\` varchar(100) NOT NULL,
      \`city\` varchar(100) NOT NULL,
      \`track\` enum('technical','business') NOT NULL,
      \`careerPath\` enum('egypt','uae','international','entrepreneurship') NOT NULL,
      \`education\` text NOT NULL,
      \`currentRole\` varchar(255),
      \`yearsExperience\` int,
      \`technicalBackground\` text,
      \`motivation\` text NOT NULL,
      \`goals\` text NOT NULL,
      \`linkedinUrl\` varchar(500),
      \`portfolioUrl\` varchar(500),
      \`status\` enum('pending','reviewing','accepted','rejected') NOT NULL DEFAULT 'pending',
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`
  ];

  for (const sql of tables) {
    try {
      await conn.query(sql);
      const tableName = sql.match(/IF NOT EXISTS \`([^`]+)\`/)[1];
      console.log('✅', tableName);
    } catch(e) {
      console.log('⚠️ ', e.message.substring(0, 60));
    }
  }

  const [result] = await conn.query('SHOW TABLES');
  console.log('\n✅ Migration complete! Total tables:', result.length);
  console.log('\n📋 All tables:');
  result.forEach(t => console.log('   ✓', Object.values(t)[0]));

  await conn.end();
};

createAllTables().catch(e => {
  console.log('❌ Error:', e.message);
  process.exit(1);
});
