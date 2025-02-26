import { Request, Response } from "express";
import { CustumError } from "../../domain";
import { ImagesService } from "../services";
import path from "path";
import fs from "fs";




export class ImagesController {



    constructor(
        private readonly imagesService: ImagesService,
    ) { }



    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustumError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }





     getImages = (req: Request, res: Response) => {

        const { type= '', img= '' } = req.params;
        const imagenPath = path.resolve(__dirname, `../../../uploads/${type}/${img}`);
        console.log(imagenPath);


        if ( !fs.existsSync( imagenPath ) ) {
            return res.status(404).send('Image not found');
        }

        res.sendFile( imagenPath );




    }

    // uploadMultipleFile = (req: Request, res: Response) => {

    //     const type = req.params.type;
    //     const files = req.body.files as UploadedFile[];

    //     this.fileUploadService.uploadMultiple(files, `uploads/ ${type}`)
    //         .then(uploaded => res.json(uploaded))
    //         .catch(error => this.handleError(error, res));


    // }




}

