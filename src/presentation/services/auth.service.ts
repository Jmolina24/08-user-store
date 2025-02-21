import { bcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustumError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-use.dto";
import { EmailService } from "./email.service";




export class AuthService {


    constructor(

        private readonly emailService: EmailService,

    ) { }


    public async registerUser(registerUserDto: RegisterUserDto) {

        const exisUser = await UserModel.findOne({ email: registerUserDto.email })

        if (exisUser) throw CustumError.badRequest('Email already exist');

        try {
            const user = new UserModel(registerUserDto);

            user.password = bcryptAdapter.hash(registerUserDto.password);

            await user.save();

            this.sendEmailValidateLink(user.email);

            const { password, ...userEntity } = UserEntity.fromObject(user)

            return {
                user: { ...userEntity }
            };

        } catch (error) {
            throw CustumError.internalServe(`${error}`)
        }


    }


    public async loginUser(loginUserDto: LoginUserDto) {

        const user = await UserModel.findOne({ email: loginUserDto.email })

        if (!user) throw CustumError.badRequest('Email not exist');
        const isMatchPass = bcryptAdapter.compare(loginUserDto.password, user.password);
        if (!isMatchPass) throw CustumError.badRequest('Passowrd is not Valid');

        const token = await JwtAdapter.generateToken({ id: user.id });
        if (!token) throw CustumError.internalServe('Error while creating JWT');

        const { password, ...userEntity } = UserEntity.fromObject(user)
        return {
            user: { ...userEntity },
            token: token
        };



    }

    private sendEmailValidateLink = async (email: string) => {

        const token = await JwtAdapter.generateToken({ email });

        if (!token) throw CustumError.internalServe('Error getting token');

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

        const html = `
        <h1> Validate your email </h1>
        <p> Click on the following link to validate your email </p>
        <a href="${link}"> Validate you email: ${email} </a> 
        `;

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html
        }

        const isSent = await this.emailService.sendEmail(options);

        if (!isSent) throw CustumError.internalServe('Error sending email');

        return true;

    }


    public validateEmail = async (token: string) => {

        const payload = await JwtAdapter.validateToken( token );
        if ( !payload ) throw CustumError.unauthorized('Invalid token');


        const  { email } = payload as { email: string };

        if ( !email ) throw CustumError.internalServe('Email not in token');

        const user = await UserModel.findOne( { email } );

        if ( !user ) throw CustumError.internalServe('Email not exists');

        user.emailValidated = true
        await user.save();

        return true;





    }


}




export { EmailService };

