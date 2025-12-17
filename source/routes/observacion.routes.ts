import { Router } from 'express'

import { ObservacionController } from '../controllers/observacionController'
export class ObservacionRoutes {
    static get routes(): Router {
        const router = Router()
        const controller = new ObservacionController()
        //localhost:3000/orden/
        router.get('/', controller.get)
        //localhost:3000/orden/2
        router.get('/:id', controller.getById)
        //Crear
        router.post('/', controller.create)
        //Actualizar
        router.put('/:id', controller.update)
        router.put('/:id/revisar', controller.revisado)


        return router
    }
}