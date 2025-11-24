ALTER TABLE `mentors` ADD `linkedin` varchar(500);--> statement-breakpoint
ALTER TABLE `mentors` ADD `profileImage` varchar(500);--> statement-breakpoint
ALTER TABLE `mentors` ADD `availability` enum('available','busy','unavailable') DEFAULT 'available';--> statement-breakpoint
ALTER TABLE `mentors` ADD `rating` decimal(3,2) DEFAULT '5.00';