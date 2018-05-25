DROP TABLE IF EXISTS `jokes`;

CREATE TABLE `jokes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `joke` VARCHAR(255) NOT NULL,
    `dadRating` INT NOT NULL,
    `user` TEXT NOT NULL,
    `keywords` VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` TEXT NOT NULL,
    `pass` TEXT NOT NULL,
    `email` TEXT NOT NULL,
    `dadRating` INT NOT NULL
) ENGINE=InnoDB;

LOCK TABLES `users` WRITE;

INSERT INTO `users` VALUES (1, "cheese", "blahblah", "my@email.com", 3);

UNLOCK TABLES;

LOCK TABLES `jokes` WRITE;

INSERT INTO `jokes` VALUES (1, "Really good joke", 2, "cheese", "good, joke");

UNLOCK TABLES;