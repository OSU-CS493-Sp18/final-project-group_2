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