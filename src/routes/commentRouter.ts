import {commentModel, addCommentModel} from '../models/comment';
import { Router } from 'express';
import {Comments} from '../controllers/commentController';

export const commentsRouter = Router();

commentsRouter.get("/", (req, res, next) => {

});

commentsRouter.get("/:userId", (req, res, next) => {

});

commentsRouter.post("/", (req, res, next) => {

});

commentsRouter.put("/:commentId", (req, res, next) => {

});

commentsRouter.delete("/:commentId", (req, res, next) => {

});