import { categoryModel, addCategoryModel } from '../models/category';
import { Router } from 'express';
import { Categories } from '../controllers/categoryController';
export const categoriesRouter = Router();

const categoriesController = new Categories.CategoryController();

categoriesRouter.get("/", (req, res, next) => {
    categoriesController.getAll().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        next();
    });
});

categoriesRouter.get("/:categoryId", (req, res, next) => {
    const id = parseInt(req.params.categoryId);

    if (id) {
        categoriesController.get(id).then(result => {
            res.status(200).json(result);
        }).catch(err => {
            res.status(404).json({ error: "No category found." });
        });
    } else { next(); }
});

categoriesRouter.post("/", (req,res,next) => {

});

categoriesRouter.put("/", (req,res,next) => {
    
});

categoriesRouter.delete("/", (req,res,next) => {
    
});