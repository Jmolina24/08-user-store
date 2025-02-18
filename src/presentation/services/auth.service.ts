import { bcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustumError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-use.dto";




export class AuthService {


    constructor(

    ) { }


    public async registerUser(registerUserDto: RegisterUserDto) {

        const exisUser = await UserModel.findOne({ email: registerUserDto.email })

        if (exisUser) throw CustumError.badRequest('Email already exist');

        try {
            const user = new UserModel(registerUserDto);

            user.password = bcryptAdapter.hash(registerUserDto.password);

            await user.save();
            const { password, ...userEntity } = UserEntity.fromObject(user)

            return {
                user: { ...userEntity },
                token: 'ABC'
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



}




