import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/custom.error";
import { PrismaClient } from "../../generated/prisma";
export class VehiculoController {
    prisma = new PrismaClient();
    get = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const listado = await this.prisma.vehiculo.findMany({
                orderBy: {
                    placa: 'asc'
                },
                include: {
                    observaciones: {
                        select: {
                            observacion: true,
                            fecha: true
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
            const carro = await this.prisma.vehiculo.findFirst(
                {
                    where: { id: idVehiculo },
                    include: {
                        observaciones: {
                            select: {
                                id:true,
                                observacion: true,
                                fecha: true,
                                rectificacionDiscosTraseros:true,
                                rectificacionDiscosDelanteros:true,
                                rectificacionTambores:true,
                                pastillasDelanteras:true,
                                pastillasTraseras:true,
                                zapatas:true,
                                liquido:true,
                                bombas:true,
                                caliper:true,
                                mantenDelantero:true,
                                mantenTrasero:true

                            },
                            orderBy:{
                                fecha:'desc'
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

            const carro = await this.prisma.vehiculo.create({
                data: {
                    placa: body.placa,
                    marca: body.marca,
                    modelo: body.modelo,
                    anno: Number(body.anno),
                    kilometraje: Number(body.kilometraje),
                    duenno: body.duenno,
                    telefono: body.telefono,
                    correo: body.correo
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

            const vehiculoExistente = await this.prisma.vehiculo.findUnique({
                where: { id: idCarro },

            });
            if (!vehiculoExistente) {
                response
                    .status(404)
                    .json({ message: "El vehiculo no existe" });
                return
            }
            const carro = await this.prisma.vehiculo.update({
                where: {
                    id: vehiculoExistente.id,
                },
                data: {
                    placa: body.placa,
                    marca: body.marca,
                    modelo: body.modelo,
                    anno: Number(body.anno),
                    kilometraje: Number(body.kilometraje),
                    duenno: body.duenno,
                    telefono: body.telefono,
                    correo: body.correo
                }
            })

            response.status(201).json(carro)
        } catch (error) {
            next(error);
        }
    };
}