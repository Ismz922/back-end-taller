import { Router } from 'express';
import { VehiculoRoutes } from './vehiculo.routes';
import { ObservacionRoutes } from './observacion.routes';



export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use('/vehiculo', VehiculoRoutes.routes),
            router.use('/observacion', ObservacionRoutes.routes)
        return router;
    }
}
