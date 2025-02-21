import { Request, Response } from "express";
import { CreateCategoryDto, CustumError, PaginateDto } from "../../domain";
import { ProductService } from "../services";
import { CreateProductoDto } from "../../domain/dtos/products/create-product.dto";




export class ProductController {



    constructor(
        private readonly productService: ProductService,
    ) { }



    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustumError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }



    listProducts = (req: Request, res: Response) => {

        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = PaginateDto.create(+page, +limit);
        if (error) return res.status(400).json({ error });
        this.productService.listProduct(paginationDto!)
            .then((products) => res.json(products))
            .catch(error => this.handleError(error, res))
    }

    createProduct = (req: Request, res: Response) => {
        const [error, createProductoDto] = CreateProductoDto.create({ ...req.body, user: req.body.user.id });

        if (error) return res.status(400).json({ error });

        this.productService.createProduct(createProductoDto!)

            .then((product) => res.status(201).json(product))
            .catch(error => this.handleError(error, res));

    }




}

