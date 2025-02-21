import { Router } from 'express';
import {  ProductController} from './product.controller';
import { AuthMiddeware } from '../middlewares/auth.middeware';
import { ProductService } from '../services';




export class ProductRoutes {


    static get routes(): Router {

        const router = Router();

        const productService = new ProductService()
        const productController = new ProductController( productService );

        // Definir las rutas
        router.get('/', productController.listProducts);
        router.post('/',[AuthMiddeware.validateJWT ] ,productController.createProduct);
        return router;
    }


}

