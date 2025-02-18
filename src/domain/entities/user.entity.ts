import { CustumError } from "../errors/custom.error";



export class UserEntity {

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: string[],
        public img?: string,
    ) { }

    static fromObject(object: { [key: string]: any }) {

        const { id, _id, name, email, emailValidated, password, role, img } = object;


        if (!id && !_id) {
            throw CustumError.badRequest('Missing id');
        }

        if (!name) throw CustumError.badRequest('Missing name');
        if (!email) throw CustumError.badRequest('Missing Email');
        if (emailValidated === undefined) throw CustumError.badRequest('Missing emailValidated');
        if (!password) throw CustumError.badRequest('Missing Password');
        if (!role) throw CustumError.badRequest('Missing Rol');

        return new UserEntity(_id || id, name, email, emailValidated, password, role, img);
    }



}