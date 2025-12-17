import { Router } from 'express'
import { VehiculoController } from '../controllers/vehiculoController'
export class VehiculoRoutes {
    static get routes(): Router {
        const router = Router()
        const controller = new VehiculoController()
        //localhost:3000/orden/
        router.get('/', controller.get)
        //localhost:3000/orden/2
        router.get('/:id', controller.getById)
        //Crear
        router.post('/', controller.create)
        //Actualizar
        router.put('/:id', controller.update)



        return router
    }
}