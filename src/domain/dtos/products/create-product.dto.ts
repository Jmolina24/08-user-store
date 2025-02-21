import { Validators } from "../../../config";


export class CreateProductoDto {

    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string, // ID
        public readonly category: string, // ID

    ) { }


    static create(object: { [key: string]: any }): [string?, CreateProductoDto?] {
        const { name, available, price, description, user, category } = object;

        if (!name) return ['Missing Name'];
        
        if (!user) return ['Missing User'];

        if ( !Validators.isMongoID(user) ) return ['Invalid User ID'];

        if ( !Validators.isMongoID(category) ) return ['Invalid Category ID'];

        if (!category) return ['Missing Category'];

        return [undefined, new CreateProductoDto(name, !!available, price, description, user, category)];

    }


}


