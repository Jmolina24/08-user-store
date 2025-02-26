import { Router } from 'express';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from '../services';
import { FileUploadMiddleware } from '../middlewares/file-upload.midddeware';
import { TypeMiddleware } from '../middlewares/type.middeware';




export class FileUploadRoutes {


    static get routes(): Router {

        const router = Router();

        const fileUploadController = new FileUploadController(
            new FileUploadService()
        );


        router.use(FileUploadMiddleware.containFiles);
        router.use(TypeMiddleware.validTypes(['users', 'products', 'categories']));

        // Definir las rutas
        router.post('/file/:type', fileUploadController.uploadFile);
        router.post('/multi-file/:type', fileUploadController.uploadMultipleFile);
        return router;
    }


}

