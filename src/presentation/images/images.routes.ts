import { Router } from 'express';
import { ImagesController } from './images.controller';
import { ImagesService } from '../services';





export class ImagesRoutes {


    static get routes(): Router {

        const router = Router();

        const imagesController = new ImagesController( new ImagesService() );

        // Definir las rutas
        router.get('/:type/:img', imagesController.getImages);
        return router;
    }


}

