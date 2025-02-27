import { regularExps } from "../../../config";




export class RegisterUserDto {

    private constructor(
        public name: string,
        public email: string,
        public password: string,
    ) { }


    static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { name, email, password } = object;

        if (!name) return ['Missing Name'];
        if (!email) return ['Missing Email'];

        if (!regularExps.email.test(email)) return ['Email is not Valid'];
        if (!password) return ['Missing Pasword'];
        if (password.length < 6) return ['Password too short'];

        return [undefined, new RegisterUserDto(name, email, password)];

    }


}


