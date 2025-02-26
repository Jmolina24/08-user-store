import path from "path";
import fs from "fs";
import { uuidAdapter } from "../../config";


export class ImagesService {


    constructor(
        private readonly uuid = uuidAdapter.generateUUID,
    ) { }



    private checkFolder(folderPath: string) {

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

    }

    // async uploadSingle(file: UploadedFile, folder: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg']) {


    //     try {
    //         const fileExtension = file.mimetype.split('/').at(1) ?? '';


    //         if (!validExtensions.includes(fileExtension)) {
    //             throw CustumError.badRequest(` Invalid extension:  ${fileExtension}, valid ones ${validExtensions}`)
    //         }
    //         const destination = path.resolve(__dirname, '../../../', folder);
    //         this.checkFolder(destination);

    //         const fileName = `${this.uuid()}.${fileExtension}`


    //         file.mv(`${destination}/${fileName}`);
    //         return { fileName };

    //     } catch (error) {
    //         // console.log({ error });
    //         throw error;
    //     }




    // }

    // async uploadMultiple(files: UploadedFile[], folder: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg']) {


    //     const filesNames = await Promise.all(
    //         files.map(file => this.uploadSingle(file, folder, validExtensions))
    //     );
    //     return filesNames;





    // }



}

