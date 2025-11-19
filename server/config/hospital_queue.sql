
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

SET NAMES utf8mb4;

CREATE TABLE `users` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`first_name` varchar(255) NOT NULL,
`last_name` varchar(255) NOT NULL,
`gender` varchar(20) NOT NULL,
`role` varchar(50) NOT NULL,
`email` varchar(255) NOT NULL,
`password` varchar(255) NOT NULL,
`profile_picture` varchar(500) DEFAULT NULL,
`created_at` timestamp NOT NULL DEFAULT current_timestamp(),
PRIMARY KEY (`id`),
UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `first_name`, `last_name`, `gender`, `role`, `email`, `password`, `profile_picture`, `created_at`) VALUES
(1, 'heydera', 'hasen', 'male', 'patient', '[harun@gmail.com](mailto:harun@gmail.com)', '$2b$10$rzBr65txVCDj/L2r7uA7Wu40XqLPtoFFiyUzheYhlBlYLXHw9hUlC', NULL, '2025-11-19 06:59:51'),
(2, 'heyder', 'hasan', 'male', 'admin', '[hey@gmail.com](mailto:hey@gmail.com)', '$2b$10$.xFR2qEPk2XvFqT6r0mxuOIAzgXe2tW8RROmHVOTgLTcKoSAp/yzG', '[http://localhost:5000/uploads/1763536240455-646479.jpg](http://localhost:5000/uploads/1763536240455-646479.jpg)', '2025-11-19 07:08:53'),
(3, 'abdisa', 'muhammed', 'male', 'doctor', '[abdisa@gmail.com](mailto:abdisa@gmail.com)', '$2b$10$NJcmhJiqtewrIR6.2jiXoeXtf3NGgGVpSdbIVqvbIp96aN/xl8irG', NULL, '2025-11-19 07:12:31'),
(4, 'abi', 'ti', 'male', 'patient', '[ab@gmail.com](mailto:ab@gmail.com)', '$2b$10$8SK7fSVBJkb5N73s3PGLfufNdyMj0FDZZm4N/709rrm1Xo9BQjZPa', NULL, '2025-11-19 07:26:44'),
(5, 'chaltu', 'adugna', 'female', 'patient', '[ch@gmail.com](mailto:ch@gmail.com)', '$2b$10$g/tkitXWc/GVcKzwvaKErey/D9rvuvErmsLZjdbQxp5lCVidku.eO', NULL, '2025-11-19 07:33:33');

CREATE TABLE `doctors` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`user_id` int(11) NOT NULL,
`speciality` varchar(100) DEFAULT NULL,
`room` varchar(50) DEFAULT NULL,
`phone` varchar(20) DEFAULT NULL,
`status` enum('available','unavailable') DEFAULT 'available',
PRIMARY KEY (`id`),
KEY `user_id` (`user_id`),
CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `doctors` (`id`, `user_id`, `speciality`, `room`, `phone`, `status`) VALUES
(1, 3, 'cardio', '2', '0987654', 'available');

CREATE TABLE `patients` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`user_id` int(11) NOT NULL,
`cardNo` varchar(50) NOT NULL,
`age` int(11) DEFAULT NULL,
`address` varchar(255) DEFAULT NULL,
`phone` varchar(20) DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `cardNo` (`cardNo`),
KEY `user_id` (`user_id`),
CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `patients` (`id`, `user_id`, `cardNo`, `age`, `address`, `phone`) VALUES
(1, 1, 'C1001', 20, 'gasera', '0920129678'),
(2, 4, 'P0001', 45, 'gasco', '0987765'),
(3, 5, 'P1002', 10, 'asela', '987654');

-- Trigger to auto-generate cardNo
DELIMITER $$
CREATE TRIGGER `before_insert_patient` BEFORE INSERT ON `patients` FOR EACH ROW
BEGIN
IF NEW.cardNo IS NULL OR NEW.cardNo = '' THEN
SET NEW.cardNo = CONCAT(
'P',
LPAD(
IFNULL((SELECT MAX(SUBSTRING(cardNo, 2) + 0) FROM patients), 0) + 1,
4,
'0'
)
);
END IF;
END$$
DELIMITER ;


CREATE TABLE `queue` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`patient_id` int(11) NOT NULL,
`assigned_doctor_id` int(11) DEFAULT NULL,
`queueNo` int(11) DEFAULT NULL,
`status` enum('waiting','called','in_progress','served') DEFAULT 'waiting',
`arrival_time` datetime DEFAULT current_timestamp(),
`called_at` datetime DEFAULT NULL,
`served_at` datetime DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `patient_id` (`patient_id`),
KEY `assigned_doctor_id` (`assigned_doctor_id`),
CONSTRAINT `queue_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
CONSTRAINT `queue_ibfk_2` FOREIGN KEY (`assigned_doctor_id`) REFERENCES `doctors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `queue` (`id`, `patient_id`, `assigned_doctor_id`, `queueNo`, `status`, `arrival_time`, `called_at`, `served_at`) VALUES
(1, 1, 1, 0, 'in_progress', '2025-11-19 10:20:34', '2025-11-19 10:35:01', NULL),
(2, 2, 1, 20251119, 'waiting', '2025-11-19 10:27:38', NULL, NULL),
(3, 3, 1, 20251119, 'waiting', '2025-11-19 10:34:18', NULL, NULL);


DELIMITER $$
CREATE TRIGGER `before_insert_queue` BEFORE INSERT ON `queue` FOR EACH ROW
BEGIN
IF NEW.queueNo IS NULL OR NEW.queueNo = '' THEN
SET NEW.queueNo = CONCAT(
'Q',
LPAD(
IFNULL((SELECT MAX(CAST(SUBSTRING(queueNo,2) AS UNSIGNED)) FROM queue), 0) + 1,
3,
'0'
)
);
END IF;
END$$
DELIMITER ;

COMMIT;
