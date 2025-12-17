import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/custom.error";
import { PrismaClient } from "../../generated/prisma";
export class ObservacionController {
    prisma = new PrismaClient();
    get = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const listado = await this.prisma.observacion.findMany({
                orderBy: {
                    fecha: 'asc'
                },
                include: {
                    vehiculo: {
                        select: {
                            duenno: true,
                            placa: true,
                            marca: true,
                            modelo: true,
                            telefono: true,
                            correo: true
                        }
                    }
                }
            })
            response.json(listado)
        } catch (error) {
            next(error);
        }
    };
    //Obtener por Id
    getById = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            const idParam = request.params.id;

            if (!idParam) {
                return next(AppError.badRequest('El ID del vehículo es requerido'));
            }

            let idVehiculo = parseInt(idParam);
            if (isNaN(idVehiculo)) {
                next(AppError.badRequest('El ID del vehiculo no es valida'))
            }
            const carro = await this.prisma.observacion.findFirst(
                {
                    where: { id: idVehiculo },
                    include: {
                        vehiculo: {
                            select: {
                                duenno: true,
                                placa: true,
                                marca: true,
                                modelo: true,
                                telefono: true,
                                correo: true,
                                kilometraje:true
                            }
                        }
                    }
                }
            )
            if (carro) {
                response.status(200).json(carro)
            } else {
                next(AppError.notFound('No existe el vehiculo'))
            }


        } catch (error: any) {
            next(error)
        }
    };
    //Crear
    create = async (request: Request, response: Response, next: NextFunction) => {
        try {

            const body = request.body

            const carro = await this.prisma.observacion.create({
                data: {
                    observacion: body.observacion,
                    fecha: new Date,
                    rectificacionDiscosDelanteros: body.rectificacionDiscosDelanteros,
                    rectificacionDiscosTraseros: body.rectificacionDiscosTraseros,
                    rectificacionTambores: body.rectificacionTambores,
                    pastillasDelanteras: body.pastillasDelanteras,
                    pastillasTraseras: body.pastillasTraseras,
                    zapatas: body.zapatas,
                    liquido: body.liquido,
                    bombas: body.bombas,
                    caliper: body.caliper,
                    mantenDelantero: body.mantenDelantero,
                    mantenTrasero: body.mantenTrasero,
                    vehiculoId: body.vehiculoId
                }
            })

            response.status(201).json(carro)
        } catch (error) {
            next(error);
        }
    };
    //Actualizar
    update = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const body = request.body;
            const idParam = request.params.id;

            if (!idParam) {
                return next(AppError.badRequest('El ID del vehículo es requerido'));
            }
            var idCarro = parseInt(idParam)

            const vehiculoExistente = await this.prisma.observacion.findUnique({
                where: { id: idCarro },

            });
            if (!vehiculoExistente) {
                response
                    .status(404)
                    .json({ message: "El vehiculo no existe" });
                return
            }
            const carro = await this.prisma.observacion.update({
                where: {
                    id: vehiculoExistente.id,
                },
                data: {
                    observacion: body.observacion,
                    rectificacionDiscosDelanteros: body.rectificacionDiscosDelanteros,
                    rectificacionDiscosTraseros: body.rectificacionDiscosTraseros,
                    rectificacionTambores: body.rectificacionTambores,
                    pastillasDelanteras: body.pastillasDelanteras,
                    pastillasTraseras: body.pastillasTraseras,
                    zapatas: body.zapatas,
                    liquido: body.liquido,
                    bombas: body.bombas,
                    caliper: body.caliper,
                    mantenDelantero: body.mantenDelantero,
                    mantenTrasero: body.mantenTrasero,
                }
            })

            response.status(201).json(carro)
        } catch (error) {
            next(error);
        }
    };

    revisado = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const body = request.body;
            const idParam = request.params.id;

            if (!idParam) {
                return next(AppError.badRequest('El ID del vehículo es requerido'));
            }
            var idCarro = parseInt(idParam)

            const vehiculoExistente = await this.prisma.observacion.findUnique({
                where: { id: idCarro },

            });
            if (!vehiculoExistente) {
                response
                    .status(404)
                    .json({ message: "El vehiculo no existe" });
                return
            }
            const carro = await this.prisma.observacion.update({
                where: {
                    id: vehiculoExistente.id,
                },
                data: {
                    revisado: true
                }
            })

            response.status(201).json(carro)
        } catch (error) {
            next(error);
        }
    };
}