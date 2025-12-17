import { PrismaClient } from "../generated/prisma/";
import { observaciones } from "./seeds/observaciones";
import { vehiculos } from "./seeds/vehiculos";
const prisma = new PrismaClient();

const main = async () => {
  try {

    await prisma.vehiculo.createMany({ data: vehiculos })
    await prisma.observacion.createMany({ data: observaciones })
    console.log('Datos insertados correctamente.');
  } catch (error) {
    console.error('Error durante el seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();