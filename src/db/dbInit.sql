DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `pass` TEXT NOT NULL,
    `email` TEXT NOT NULL,
    UNIQUE (`username`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    UNIQUE (`name`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `jokes`;

CREATE TABLE `jokes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `joke` VARCHAR(255) NOT NULL,
    `dadRating` INT NOT NULL,
    `userId` INT NOT NULL,
    FOREIGN KEY(`userId`) REFERENCES `users`(`id`), 
    `keywords` VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `cmnt` TEXT NOT NULL,
    `jokeId` INT NOT NULL,
    `userId` INT NOT NULL,
    `dadRating` INT NOT NULL,
    FOREIGN KEY(`jokeId`) REFERENCES `jokes`(`id`), 
    FOREIGN KEY(`userId`) REFERENCES `users`(`id`)
) ENGINE=InnoDB;

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1, "cheese", "blahblah", "my@email.com");
INSERT INTO `users` VALUES (2, "linus", "stuff and things", "linus.torvald@linux.net");
INSERT INTO `users` VALUES (3, "ultimatedad", "Puntastic", "Puns@pun.net");
UNLOCK TABLES;

LOCK TABLES `categories` WRITE;
INSERT INTO `categories` VALUES (1, "cats");
INSERT INTO `categories` VALUES (2, "computers");
INSERT INTO `categories` VALUES (3, "Puns");
INSERT INTO `categoreis` VALUES (4, "sigh...");
INSERT INTO `categories` VALUES (5, "Knock Knock");
UNLOCK TABLES;

LOCK TABLES `jokes` WRITE;
INSERT INTO `jokes` VALUES (1, "Really good joke", 2, 1, 0, "good, joke");
INSERT INTO `jokes` VALUES (2, "I've got a really good UDP joke and i don't care if you get it.", 2, 2);
INSERT INTO `jokes` VALUES (3, "I was going to go camping but it was too intents.", 4, 3, "udp, networking");
INSERT INTO `jokes` VALUES (4, "Why don't they play poker in the jungle? To many Cheetas.", 5, 2, "jungle, cheeta, poker");
INSERT INTO `jokes` VALUES (5, "What daes a zombie vegitarian ead? Graaaaaains.", 3, 1, 0, "zombie, vegitarian");
INSERT INTO `jokes` VALUES (6, "My new thesaurus is terrible. Not only that, but its also terrible.", 5, , 0, "thesaurus, terrible");





UNLOCK TABLES;