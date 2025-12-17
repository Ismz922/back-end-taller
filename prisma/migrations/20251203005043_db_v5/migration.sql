-- CreateTable
CREATE TABLE `Vehiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `placa` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `anno` INTEGER NOT NULL,
    `kilometraje` DECIMAL(10, 2) NOT NULL,
    `duenno` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Vehiculo_placa_key`(`placa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Observacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `observacion` VARCHAR(191) NULL,
    `rectificacionDiscosDelanteros` BOOLEAN NOT NULL,
    `rectificacionDiscosTraseros` BOOLEAN NOT NULL,
    `rectificacionTambores` BOOLEAN NOT NULL,
    `pastillasDelanteras` VARCHAR(191) NULL,
    `pastillasTraseras` VARCHAR(191) NULL,
    `zapatas` VARCHAR(191) NULL,
    `liquido` VARCHAR(191) NULL,
    `bombas` VARCHAR(191) NULL,
    `caliper` BOOLEAN NOT NULL,
    `mantenDelantero` BOOLEAN NOT NULL,
    `mantenTrasero` BOOLEAN NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `revisado` BOOLEAN NOT NULL DEFAULT false,
    `vehiculoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Observacion` ADD CONSTRAINT `Observacion_vehiculoId_fkey` FOREIGN KEY (`vehiculoId`) REFERENCES `Vehiculo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
