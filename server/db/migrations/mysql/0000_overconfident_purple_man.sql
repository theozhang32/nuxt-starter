CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` text NOT NULL,
	`avatar` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
