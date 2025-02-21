import { Request, Response } from "express";
import { CreateCategoryDto, CustumError, PaginateDto } from "../../domain";
import { CategoryService } from "../services/category.service";




export class CategoryController {



    constructor(
        private readonly categoryService: CategoryService,
    ) { }



    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustumError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }



    listCategory = (req: Request, res: Response) => {

        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = PaginateDto.create(+page, +limit);
        if (error) return res.status(400).json({ error });
        this.categoryService.listCategory(paginationDto!)
            .then((category) => res.json(category))
            .catch(error => this.handleError(error, res))
    }

    createCategory = (req: Request, res: Response) => {
        const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

        if (error) return res.status(400).json({ error });

        this.categoryService.createCategory(createCategoryDto!, req.body.user)

            .then((category) => res.status(201).json(category))
            .catch(error => this.handleError(error, res));

    }




}

