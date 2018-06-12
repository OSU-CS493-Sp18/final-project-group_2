import { categoryModel, addCategoryModel } from '../models/category';
import { Router } from 'express';
import { Categories } from '../controllers/categoryController';
import { checkToken } from '../controllers/tokenController';
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

categoriesRouter.post("/", checkToken, (req,res,next) => {
    const newCategory = req.body;
    if (newCategory) {
        categoriesController.create(newCategory).then(results => {
            res.status(201).json({ msg: "New category added to database" });
        }).catch(err => {
            res.status(500).json({ error: "Failed to insert new category" });
        });
    } else {
        next();
    }
});

categoriesRouter.put("/", checkToken,(req,res,next) => {
    const updatedCategory = req.body;
    if(updatedCategory) {
        categoriesController.update(updatedCategory).then(results => {
            console.log(results);
            res.status(201).json({ msg: "Updated category in database" });
        }).catch(err => {
            res.status(500).json({ error: "Failed to update category" });
        });
    } else {
        next();
    }
});

categoriesRouter.delete("/:categoryId", checkToken,(req,res,next) => {
    const id = parseInt(req.params.categoryId);
    if (id) {
        categoriesController.delete(id).then(result => {
            res.status(204).json({ msg: "deleted category in database" });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to delete category" });
        });
    } else {
        next();
    }
});