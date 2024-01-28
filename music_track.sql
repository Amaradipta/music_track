-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2024 at 09:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `music_track`
--

-- --------------------------------------------------------

--
-- Table structure for table `playlist`
--

CREATE TABLE `playlist` (
  `playlist_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `playlist_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `playlisttrack`
--

CREATE TABLE `playlisttrack` (
  `playlist_track_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL,
  `releaseDate` datetime NOT NULL,
  `audioURL` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`id`, `title`, `duration`, `releaseDate`, `audioURL`, `createdAt`, `updatedAt`) VALUES
(2, 'home', 3, '2024-01-21 08:59:49', 'https://youtu.be/WFsmB2NMgno?si=E_v5LIN0tkKOv8Zc', '2024-01-21 08:59:49', '2024-01-21 08:59:49'),
(3, 'Angel Numbers / Ten Toes', 5, '2024-01-21 09:12:12', 'https://youtu.be/zDYRrG22FO8?si=vWrbM6VGmkRVwwGd', '2024-01-21 09:12:12', '2024-01-21 09:12:12'),
(4, 'Angel Numbers / Ten Toes', 5, '2024-01-21 09:12:12', 'https://youtu.be/zDYRrG22FO8?si=vWrbM6VGmkRVwwGd', '2024-01-21 09:12:12', '2024-01-21 09:12:12'),
(5, 'Angel Numbers / Ten Toes gvvbbv', 5, '2024-01-21 09:12:12', 'https://youtu.be/zDYRrG22FO8?si=vWrbM6VGmkRVwwGd', '2024-01-21 09:31:53', '2024-01-21 09:31:53');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(5, 'Iko Gusama dhasdhkasd', 'Iko Gustama@examjdasjdple.com', '$2b$10$BAScgDvqYPJ4cd5tMvTYo.h162dYYdpt0lQNt89mp7kJdofalyTEG', '2024-01-21 08:04:38', '2024-01-21 08:04:38'),
(13, 'hshjahsjas', 'dhakjdhajsjskad@gmail.com', '$2b$10$/GopIqqQy/AQDotTTOrNWuFIHd0GCZGacsu2o9DOSBj65yTEtWcBO', '2024-01-21 08:21:39', '2024-01-21 08:21:39'),
(14, 'Ditto', 'Ditto@example.com', '$2b$10$cuDBJnO7jr631toVgnXyA.GSAj6I4PfyU0Xj8ou2DWntaTktNoy7C', '2024-01-28 07:33:57', '2024-01-28 07:33:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
