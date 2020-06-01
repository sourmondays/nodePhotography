-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 01 jun 2020 kl 19:51
-- Serverversion: 5.6.37
-- PHP-version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `images`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `albums`
--

CREATE TABLE IF NOT EXISTS `albums` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumpning av Data i tabell `albums`
--

INSERT INTO `albums` (`id`, `title`, `user_id`) VALUES
(19, 'Animals', 20),
(20, 'Code', 20),
(21, 'Bogan lifestyle', 21),
(22, 'Surfing', 22),
(23, 'Our place', 22);

-- --------------------------------------------------------

--
-- Tabellstruktur `albums_photos`
--

CREATE TABLE IF NOT EXISTS `albums_photos` (
  `album_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumpning av Data i tabell `albums_photos`
--

INSERT INTO `albums_photos` (`album_id`, `photo_id`) VALUES
(20, 100),
(19, 102),
(19, 103),
(21, 104),
(21, 105),
(22, 106),
(22, 107),
(22, 108),
(23, 109),
(23, 110);

-- --------------------------------------------------------

--
-- Tabellstruktur `albums_users`
--

CREATE TABLE IF NOT EXISTS `albums_users` (
  `id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumpning av Data i tabell `albums_users`
--

INSERT INTO `albums_users` (`id`, `album_id`, `user_id`) VALUES
(17, 19, 20),
(18, 20, 20),
(19, 21, 21),
(20, 22, 22),
(21, 23, 22);

-- --------------------------------------------------------

--
-- Tabellstruktur `photos`
--

CREATE TABLE IF NOT EXISTS `photos` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumpning av Data i tabell `photos`
--

INSERT INTO `photos` (`id`, `title`, `comment`, `url`, `user_id`) VALUES
(100, 'Code', 'I''m a coder', 'https://images.unsplash.com/photo-1550645612-83f5d594b671?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80', 20),
(102, 'Cat', 'Cat & butterfly', 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80', 20),
(103, 'Fluffy cat', 'One more cat', 'https://images.unsplash.com/photo-1455970022149-a8f26b6902dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=948&q=80', 20),
(104, 'Aussie lifestyle', 'The aussie bogan starter pack.', 'https://external-preview.redd.it/h7yInHEXkIj7YYyp97sGeviVCQSs3p8mf40Gi-3BI2M.png?auto=webp&s=3990304c6b99433b2c87a8cb0e92122b968c3f48', 21),
(105, 'Aussie!', 'Aussie bogan starter pack Bali.', 'https://external-preview.redd.it/BppgK4PA_-cDQ_eT3bMnHOo5ob4bHccfxqGeYwwv4hc.png?auto=webp&s=8da2c8b7d409c357464efd23d60ec7702d81404c', 21),
(106, 'Tube', 'Mick Fanning surfing a tube.', 'https://images.unsplash.com/photo-1499823382510-3990e4b8a04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80', 22),
(107, 'Cold water', 'Cold water surf in Lofoten, Norway', 'https://images.unsplash.com/photo-1519751869702-10059b4c38ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60', 22),
(108, 'Retro boards', 'Old surfboard', 'https://images.unsplash.com/photo-1586996292898-71f4036c4e07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60', 22),
(109, 'Our home', 'Magazine and stuff', 'https://images.unsplash.com/photo-1541702193626-24fe3a9fbed3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80', 22),
(110, 'Surf beach', 'Our beach close to home', 'https://images.unsplash.com/photo-1504296381867-917df613fbd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1592&q=80', 22);

-- --------------------------------------------------------

--
-- Tabellstruktur `photos_users`
--

CREATE TABLE IF NOT EXISTS `photos_users` (
  `id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumpning av Data i tabell `photos_users`
--

INSERT INTO `photos_users` (`id`, `photo_id`, `user_id`) VALUES
(35, 100, 20),
(37, 102, 20),
(38, 103, 20),
(39, 104, 21),
(40, 105, 21),
(41, 106, 22),
(42, 107, 22),
(43, 108, 22),
(44, 109, 22),
(45, 110, 22);

-- --------------------------------------------------------

--
-- Tabellstruktur `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumpning av Data i tabell `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `first_name`, `last_name`, `email`) VALUES
(20, 'Johan_Nord', '$2b$10$AkmCjAIZvxyAje4qYDXsme2PaWQlaYidN0c8UtIc7CZDn8doFSVVG', 'Johan', 'Nordström', 'jn.hive@gmail.com '),
(21, 'AssieBogan', '$2b$10$hz5iQLb.70YnUAqKJui.6.tSRW0NGjkgaOE.eXA8WqXLQ08a0iHJ.', 'Mark', 'Warick', 'bogan.life@gmail.com '),
(22, 'WaveGarden', '$2b$10$CGuWWIAvFOJo8aBoXSg2ZOqhPgY1bb18pzD9WAqxxzZyd8MlFpUbW', 'Ann', 'Johnson', 'wave_garden@hotmail.com');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `albums_users`
--
ALTER TABLE `albums_users`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `photos_users`
--
ALTER TABLE `photos_users`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT för tabell `albums_users`
--
ALTER TABLE `albums_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT för tabell `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=111;
--
-- AUTO_INCREMENT för tabell `photos_users`
--
ALTER TABLE `photos_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=46;
--
-- AUTO_INCREMENT för tabell `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
