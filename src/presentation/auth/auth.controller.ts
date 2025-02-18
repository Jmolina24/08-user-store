import { Request, Response } from "express";
import { CustumError, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";
import { LoginUserDto } from "../../domain/dtos/auth/login-use.dto";




export class AuthController {



    constructor(public readonly authService: AuthService) { }



private handleError = (error: unknown, res: Response) => {
    if ( error instanceof CustumError ) {
        return res.status(error.statusCode).json({error: error.message });
    }
    console.log(`${ error }`);
    return res.status(500).json({error: 'Internal server error' });
}



    registerUser = (req: Request, res: Response) => {

        const [error, registerDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error })
        this.authService.registerUser(registerDto!)
            .then((user) => res.json(user))
            .catch( error => this.handleError( error, res ))

    }

    LoginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ error })
        this.authService.loginUser(loginUserDto!)
            .then((user) => res.json(user))
            .catch( error => this.handleError( error, res ))

    }


    validateEmail = (req: Request, res: Response) => {
        res.json('validateEmail');
    }

}

