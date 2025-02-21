import { Router } from 'express';
import { CategoryController } from './category.controller';
import { AuthMiddeware } from '../middlewares/auth.middeware';
import { CategoryService } from '../services/category.service';




export class CategoryRoutes {


    static get routes(): Router {

        const router = Router();

        const categoryService = new CategoryService()
        const categoryController = new CategoryController( categoryService );

        // Definir las rutas
        router.get('/', categoryController.listCategory);
        router.post('/',[AuthMiddeware.validateJWT ] ,categoryController.createCategory);
        return router;
    }


}

