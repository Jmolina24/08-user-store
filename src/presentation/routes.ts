import { Router } from 'express';
import { AuthRoutes } from './auth/auth.routes';
import { CategoryRoutes } from './category/category.routes';
import { ProductRoutes } from './products/product.routes';
import { FileUploadRoutes } from './file-upload/file-upload.routes';
import { ImagesRoutes } from './images/images.routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes );
    router.use('/api/categories', CategoryRoutes.routes );
    router.use('/api/products', ProductRoutes.routes );
    router.use('/api/upload', FileUploadRoutes.routes );
    router.use('/api/images', ImagesRoutes.routes );



    return router;
  }


}

