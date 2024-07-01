-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 01-07-2024 a las 00:15:44
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
-- Estructura de tabla para la tabla `divisas`
--

CREATE TABLE `divisas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `divisas`
--

INSERT INTO `divisas` (`id`, `nombre`, `valor`, `fecha`) VALUES
(1, 'dolar', '951.02', '2024-06-30 23:51:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `divisa_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `name`, `description`, `divisa_id`, `price`, `stock`, `category`, `created_at`) VALUES
(11, 'Martillo de carpintero', 'Martillo de acero con mango de madera', 1, 9990, 50, 'Herramientas manuales', '2024-07-01 00:14:33'),
(12, 'Destornillador Phillips', 'Destornillador de cruz, punta magnética', 1, 3990, 100, 'Herramientas manuales', '2024-07-01 00:14:33'),
(13, 'Sierra circular eléctrica', 'Sierra de 7 1/4 pulgadas, 1800W', 1, 79990, 20, 'Herramientas eléctricas', '2024-07-01 00:14:33'),
(14, 'Taladro percutor', 'Taladro con función de percusión, 800W', 1, 49990, 30, 'Herramientas eléctricas', '2024-07-01 00:14:33'),
(15, 'Llave ajustable', 'Llave inglesa de 10 pulgadas', 1, 7990, 75, 'Herramientas manuales', '2024-07-01 00:14:33'),
(16, 'Cinta métrica', 'Cinta métrica de 5 metros', 1, 4990, 150, 'Medición', '2024-07-01 00:14:33'),
(17, 'Nivel de burbuja', 'Nivel de aluminio de 60 cm', 1, 12990, 40, 'Medición', '2024-07-01 00:14:33'),
(18, 'Pistola de silicona', 'Pistola para aplicar silicona, uso manual', 1, 6990, 60, 'Adhesivos y selladores', '2024-07-01 00:14:33'),
(19, 'Pintura látex', 'Pintura blanca para interiores, 1 galón', 1, 19990, 80, 'Pinturas', '2024-07-01 00:14:33'),
(20, 'Brocha', 'Brocha de 3 pulgadas para todo uso', 1, 2990, 200, 'Pinturas', '2024-07-01 00:14:33'),
(21, 'Escalera de aluminio', 'Escalera plegable de 6 peldaños', 1, 39990, 15, 'Escaleras', '2024-07-01 00:14:33'),
(22, 'Tornillos para madera', 'Caja de 100 tornillos para madera, 2 pulgadas', 1, 3490, 300, 'Fijaciones', '2024-07-01 00:14:33'),
(23, 'Clavos', 'Caja de 1 kg de clavos surtidos', 1, 4990, 250, 'Fijaciones', '2024-07-01 00:14:33'),
(24, 'Lija para madera', 'Paquete de 10 lijas de grano medio', 1, 2990, 180, 'Abrasivos', '2024-07-01 00:14:33'),
(25, 'Disco de corte para metal', 'Disco de 4 1/2 pulgadas para amoladora', 1, 1990, 120, 'Abrasivos', '2024-07-01 00:14:33'),
(26, 'Guantes de trabajo', 'Par de guantes de cuero para trabajo pesado', 1, 5990, 100, 'Seguridad', '2024-07-01 00:14:33'),
(27, 'Gafas de seguridad', 'Gafas protectoras transparentes', 1, 3990, 150, 'Seguridad', '2024-07-01 00:14:33'),
(28, 'Casco de seguridad', 'Casco de protección ajustable', 1, 8990, 50, 'Seguridad', '2024-07-01 00:14:33'),
(29, 'Candado', 'Candado de acero de 50 mm', 1, 7990, 80, 'Cerrajería', '2024-07-01 00:14:33'),
(30, 'Cerradura para puerta', 'Cerradura de pomo para puerta interior', 1, 14990, 40, 'Cerrajería', '2024-07-01 00:14:33');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `divisas`
--
ALTER TABLE `divisas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_producto_divisa` (`divisa_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `divisas`
--
ALTER TABLE `divisas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_producto_divisa` FOREIGN KEY (`divisa_id`) REFERENCES `divisas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
