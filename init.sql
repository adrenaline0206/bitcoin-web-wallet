CREATE TABLE `users` (
`user_id` int(11) NOT NULL AUTO_INCREMENT,
`user_name` varchar(255) DEFAULT NULL,
`email` varchar(255) DEFAULT NULL,
`password` varchar(255) DEFAULT NULL,
`created_at` datetime DEFAULT NULL,
`private_key` varchar(255) DEFAULT NULL,
PRIMARY KEY (`user_id`)) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
