import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustumError, PaginateDto, UserEntity } from "../../domain";


export class CategoryService {


    constructor() { }


    public async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {

        const categoryExits = await CategoryModel.findOne({ name: createCategoryDto.name })

        if (categoryExits) throw CustumError.badRequest('Category already exists');

        try {
            const category = new CategoryModel({
                ...createCategoryDto, user: user.id
            });

            await category.save();
            return {
                id: category.id,
                name: category.name,
                available: category.available
            };

        } catch (error) {
            throw CustumError.internalServe(`${error}`)
        }


    }



    public async listCategory(paginationDto: PaginateDto) {

        const { page, limit } = paginationDto;

        try {

            const [total, categories] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)

            ])

            return {
                page: page,
                limit: limit,
                total: total,
                next: `/api/categories?page=${ ( page + 1 ) }&limit=${ limit } `,
                prev: ( page - 1> 0 )? ` /api/categories?page=${ ( page - 1 ) }&limit=${ limit } ` : null,
                

                data: categories.map(category => ({
                    id: category.id,
                    name: category.name,
                    available: category.available
                }))

            }

        } catch (error) {
            throw CustumError.internalServe(`${error}`)
        }


    }

}

