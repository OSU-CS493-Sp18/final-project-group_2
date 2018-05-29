DROP TABLE IF EXISTS `jokes`;

CREATE TABLE `jokes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `joke` VARCHAR(255) NOT NULL,
    `dadRating` INT NOT NULL,
    `userId` INT NOT NULL,
    FOREIGN KEY(`userId`) REFERENCES `users`(`id`), 
    `keywords` VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` TEXT NOT NULL,
    `pass` TEXT NOT NULL,
    `email` TEXT NOT NULL,
    `dadRating` INT NOT NULL,
    CONSTRAINT UNIQUE (`username`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` TEXT NOT NULL,
    CONSTRAINT UNIQUE (`name`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `cmnt` TEXT NOT NULL,
    `jokeId` INT NOT NULL,
    `userId` INT NOT NULL,
    FOREIGN KEY(`jokeId`) REFERENCES `jokes`(`id`), 
    FOREIGN KEY(`userId`) REFERENCES `users`(`id`), 
) ENGINE=InnoDB;

LOCK TABLES `users` WRITE;

INSERT INTO `users` VALUES (1, "cheese", "blahblah", "my@email.com", 3);

UNLOCK TABLES;

LOCK TABLES `jokes` WRITE;

INSERT INTO `jokes` VALUES (1, "Really good joke", 2, 1, "good, joke");

UNLOCK TABLES;