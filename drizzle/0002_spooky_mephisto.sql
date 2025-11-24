CREATE TABLE `budgets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`category` enum('operations','marketing','programs','hr','other') NOT NULL,
	`allocated` decimal(12,2) NOT NULL,
	`spent` decimal(12,2) DEFAULT '0',
	`fiscalYear` int NOT NULL,
	`status` enum('active','closed') DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `budgets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cohorts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`code` varchar(50) NOT NULL,
	`startDate` timestamp NOT NULL,
	`endDate` timestamp NOT NULL,
	`capacity` int NOT NULL,
	`enrolled` int DEFAULT 0,
	`status` enum('planning','recruiting','active','completed') DEFAULT 'planning',
	`location` varchar(255),
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cohorts_id` PRIMARY KEY(`id`),
	CONSTRAINT `cohorts_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `expenses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`budgetId` int,
	`category` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`expenseDate` timestamp NOT NULL,
	`vendor` varchar(255),
	`status` enum('pending','approved','paid') DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `expenses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firstName` varchar(100) NOT NULL,
	`lastName` varchar(100) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(50),
	`company` varchar(255),
	`source` enum('website','referral','event','social_media','partner','other') DEFAULT 'website',
	`status` enum('new','contacted','qualified','converted','lost') DEFAULT 'new',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mentors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firstName` varchar(100) NOT NULL,
	`lastName` varchar(100) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(50),
	`company` varchar(255),
	`expertise` text,
	`bio` text,
	`status` enum('active','inactive') DEFAULT 'active',
	`sessionsCompleted` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mentors_id` PRIMARY KEY(`id`),
	CONSTRAINT `mentors_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `siteSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`settingKey` varchar(100) NOT NULL,
	`settingValue` text,
	`settingType` enum('text','url','image','number','json') NOT NULL DEFAULT 'text',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `siteSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `siteSettings_settingKey_unique` UNIQUE(`settingKey`)
);
--> statement-breakpoint
CREATE TABLE `webPages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`status` enum('draft','published') DEFAULT 'draft',
	`updatedBy` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `webPages_id` PRIMARY KEY(`id`),
	CONSTRAINT `webPages_slug_unique` UNIQUE(`slug`)
);
