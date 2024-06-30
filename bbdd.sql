-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 30-06-2024 a las 23:31:29
-- Versión del servidor: 8.0.17
-- Versión de PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ferremax01`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `name`, `description`, `price`, `stock`, `category`, `created_at`) VALUES
(1, 'Destornillador Phillips', 'Destornillador con punta Phillips, mango ergonómico.', '12.99', 50, 'Herramientas manuales', '2024-06-30 23:30:19'),
(2, 'Martillo de carpintero', 'Martillo de cabeza de acero forjado, mango de madera resistente.', '24.99', 30, 'Herramientas manuales', '2024-06-30 23:30:19'),
(3, 'Cinta métrica 5 metros', 'Cinta métrica de acero con carcasa de plástico, medidas en centímetros y pulgadas.', '9.49', 100, 'Medición y marcaje', '2024-06-30 23:30:19'),
(4, 'Llave ajustable 10 pulgadas', 'Llave ajustable de acero con apertura hasta 10 pulgadas.', '18.75', 40, 'Herramientas manuales', '2024-06-30 23:30:19'),
(5, 'Taladro eléctrico 600W', 'Taladro eléctrico con velocidad variable y función de percusión.', '89.99', 20, 'Herramientas eléctricas', '2024-06-30 23:30:19'),
(6, 'Sierra de mano para metal', 'Sierra de mano para cortar metales finos, con mango antideslizante.', '15.50', 25, 'Herramientas manuales', '2024-06-30 23:30:19'),
(7, 'Clavos de acero 2 pulgadas (paquete de 100)', 'Clavos de acero galvanizado, adecuados para madera y estructuras metálicas.', '5.99', 200, 'Fijaciones y tornillería', '2024-06-30 23:30:19'),
(8, 'Pistola de silicona caliente', 'Pistola de silicona caliente para manualidades y reparaciones.', '7.99', 50, 'Adhesivos y selladores', '2024-06-30 23:30:19'),
(9, 'Pala de jardín', 'Pala de jardín con mango de madera y pala de acero inoxidable.', '29.95', 15, 'Herramientas para jardinería', '2024-06-30 23:30:19'),
(10, 'Llave de tubo ajustable 12 pulgadas', 'Llave de tubo ajustable de acero para trabajos en tuberías y fontanería.', '22.50', 35, 'Fontanería', '2024-06-30 23:30:19');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
