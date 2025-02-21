import { CategoryModel, ProductModel } from "../../data";
import { CustumError, PaginateDto } from "../../domain";
import { CreateProductoDto } from "../../domain/dtos/products/create-product.dto";


export class ProductService {


    constructor() { }


    public async createProduct(createProductoDto: CreateProductoDto) {


        const productExits = await CategoryModel.findOne({ name: createProductoDto.name })

        if (productExits) throw CustumError.badRequest('Product not exists');

        try {
            const product = new ProductModel(createProductoDto);

            await product.save();

            return product;

        } catch (error) {
            throw CustumError.internalServe(`${error}`)
        }

    }



    public async listProduct(paginationDto: PaginateDto) {

        const { page, limit } = paginationDto;

        try {

            const [total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip((page - 1 ) * limit )
                    .limit( limit )
                    // .populate( 'user', 'name email')
                    .populate( 'user')

            ])

            return {
                page: page,
                limit: limit,
                total: total,
                next: `/api/products?page=${(page + 1)}&limit=${limit} `,
                prev: (page - 1 > 0) ? ` /api/products?page=${(page - 1)}&limit=${limit} ` : null,
                products: products

            }

        } catch (error) {
            throw CustumError.internalServe(`${error}`)
        }


    }

}

