import path from "path";
import fs from "fs";
import { uuidAdapter } from "../../config";
import { UploadedFile } from "express-fileupload";
import { CustumError } from "../../domain";


export class FileUploadService {


    constructor(
        private readonly uuid = uuidAdapter.generateUUID,
    ) { }



    private checkFolder(folderPath: string) {

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

    }

    async uploadSingle(file: UploadedFile, folder: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg']) {


        try {
            const fileExtension = file.mimetype.split('/').at(1) ?? '';


            if (!validExtensions.includes(fileExtension)) {
                throw CustumError.badRequest(` Invalid extension:  ${fileExtension}, valid ones ${validExtensions}`)
            }
            const destination = path.resolve(__dirname, '../../../', folder);
            this.checkFolder(destination);

            const fileName = `${this.uuid()}.${fileExtension}`


            file.mv(`${destination}/${fileName}`);
            return { fileName };

        } catch (error) {
            // console.log({ error });
            throw error;
        }




    }

    async uploadMultiple(files: UploadedFile[], folder: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg']) {


        const filesNames = await Promise.all(
            files.map(file => this.uploadSingle(file, folder, validExtensions))
        );
        return filesNames;





    }



    // public async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {

    //     const categoryExits = await CategoryModel.findOne({ name: createCategoryDto.name })

    //     if (categoryExits) throw CustumError.badRequest('Category already exists');

    //     try {
    //         const category = new CategoryModel({
    //             ...createCategoryDto, user: user.id
    //         });

    //         await category.save();
    //         return {
    //             id: category.id,
    //             name: category.name,
    //             available: category.available
    //         };

    //     } catch (error) {
    //         throw CustumError.internalServe(`${error}`)
    //     }


    // }



    // public async listCategory(paginationDto: PaginateDto) {

    //     const { page, limit } = paginationDto;

    //     try {

    //         const [total, categories] = await Promise.all([
    //             CategoryModel.countDocuments(),
    //             CategoryModel.find()
    //                 .skip((page - 1) * limit)
    //                 .limit(limit)

    //         ])

    //         return {
    //             page: page,
    //             limit: limit,
    //             total: total,
    //             next: `/api/categories?page=${ ( page + 1 ) }&limit=${ limit } `,
    //             prev: ( page - 1> 0 )? ` /api/categories?page=${ ( page - 1 ) }&limit=${ limit } ` : null,


    //             data: categories.map(category => ({
    //                 id: category.id,
    //                 name: category.name,
    //                 available: category.available
    //             }))

    //         }

    //     } catch (error) {
    //         throw CustumError.internalServe(`${error}`)
    //     }


    // }

}

