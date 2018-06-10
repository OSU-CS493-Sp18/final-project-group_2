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
    `catId` INT NOT NULL,
    `dadRating` INT NOT NULL,
    `userId` INT NOT NULL,
    `keywords` VARCHAR(255) NOT NULL,
    FOREIGN KEY(`userId`) REFERENCES `users`(`id`)
    ON DELETE CASCADE,
    FOREIGN KEY(`catId`) REFERENCES `categories`(`id`) 
    ON DELETE CASCADE
    
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `comment` TEXT NOT NULL,
    `jokeId` INT NOT NULL,
    `userId` INT NOT NULL,
    `dadRating` INT NOT NULL,
    FOREIGN KEY(`jokeId`) REFERENCES `jokes`(`id`)
    ON DELETE CASCADE, 
    FOREIGN KEY(`userId`) REFERENCES `users`(`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB;

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1, "cheese", "blahblah", "my@email.com");
INSERT INTO `users` VALUES (2, "linus", "stuff and things", "linus.torvald@linux.net");
INSERT INTO `users` VALUES (3, "ultimatedad", "Puntastic", "Puns@pun.net");

LOCK TABLES `categories` WRITE;
INSERT INTO `categories` VALUES (1, "cats");
INSERT INTO `categories` VALUES (2, "computers");
INSERT INTO `categories` VALUES (3, "Puns");
INSERT INTO `categories` VALUES (4, "sigh...");
INSERT INTO `categories` VALUES (5, "Knock Knock");

LOCK TABLES `jokes` WRITE;
INSERT INTO `jokes` VALUES (1, "Really good joke", 4, 2, 1, "good, joke");
INSERT INTO `jokes` VALUES (2, "I've got a really good UDP joke and i don't care if you get it.", 2, 2, 2, "udp, networking");
INSERT INTO `jokes` VALUES (3, "I was going to go camping but it was too intents.", 3, 4, 3, "camping");
INSERT INTO `jokes` VALUES (4, "Why don't they play poker in the jungle? To many Cheetas.", 3, 5, 3, "jungle, cheeta, poker");
INSERT INTO `jokes` VALUES (5, "What daes a zombie vegitarian ead? Graaaaaains.", 3, 3, 3, "zombie, vegitarian");
INSERT INTO `jokes` VALUES (6, "My new thesaurus is terrible. Not only that, but its also terrible.", 3, 5, 3, "thesaurus, terrible");
INSERT INTO `jokes` VALUES (7, "My girlfriend thought I'd never be able to make a car out of spaghetti, You should have seen her face when i drove pasta!", 3, 5, 3, "car, pasta");
INSERT INTO `jokes` VALUES (8, "What do you call the wife of a hippi? A Mississippi", 3, 4, 3, "hippi");
INSERT INTO `jokes` VALUES (9, "What is a programmer's favorit hang out place? Foo Bar", 2, 2, 2, "foo, bar, programmer");
INSERT INTO `jokes` VALUES (10, "Knock Knock, Who's There, Interupting Cow, Interupting Cow.....MOOOOOOOOOOOOO!", 5, 1, 1, "cow, interrupting");
INSERT INTO `jokes` VALUES (11, "What did the cat say when he lost all his moeny? I'm Paw!", 1, 3, 1, "poor, lost, money, cheeta");

LOCK TABLES `comments` WRITE;
INSERT INTO `comments` VALUES (1, "Is this even a joke? I would not merge this joke into the API.", 1, 2,1);
INSERT INTO `comments` VALUES (2, "Nice! How will I know if i don't get the joke?", 2, 1, 4);
INSERT INTO `comments` VALUES (3, "Ha! Thats a good one!", 6, 2, 4);
INSERT INTO `comments` VALUES (4, "Wow, This joke makes me loose faith in humanity...", 11, 2,1);
INSERT INTO `comments` VALUES (5, "Missishippi how silly.", 8, 1, 3);

UNLOCK TABLES;


