import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthService, EmailService } from '../services';
import { envs } from './../../config';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    );

    const authService = new AuthService( emailService);
    
    const authController = new AuthController( authService );

    // Definir las rutas
     router.post('/login', authController.LoginUser );
     router.post('/register', authController.registerUser );
     router.get('/validate-email/:token', authController.validateEmail );


    return router;
  }


}

