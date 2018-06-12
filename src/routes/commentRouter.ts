import {commentModel, addCommentModel} from '../models/comment';
import { Router } from 'express';
import {Comments} from '../controllers/commentController';
import { parse } from 'path';
import { checkToken, checkUser } from '../controllers/tokenController';

export const commentsRouter = Router();
const commentsController = new Comments.CommentController();

commentsRouter.get("/joke/:jokeId", (req, res, next) => {
    const id = parseInt(req.params['jokeId']);
    if(id) {
        commentsController.getByJoke(id)
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            res.status(404).json({error: "No Comments found."});
        });
    } else {
        next();
    }
});

commentsRouter.get("/:userId", checkToken, checkUser, (req, res, next) => {
    const id = parseInt(req.params['userId']);
    if(id){
        commentsController.getByUser(id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(404).json({error: "No Comments found."});
        });
    } else {
        next();
    }
});

commentsRouter.post("/", (req, res, next) => {
    const comment:addCommentModel = req.body;

    if(comment){
        commentsController.create(comment)
        .then (result => {
            res.status(201).json({msg: "Comment Added!"});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Failed to add comment"});
        });
    } else {
        next();
    }
});

commentsRouter.put("/:userId/:commentId", checkToken, checkUser, (req, res, next) => {
    const id = parseInt(req.params['commentId']);
    const comment:addCommentModel = req.body;
    
    if(comment && id){
        commentsController.update(id, comment)
        .then(result => {
            res.status(201).json({msg: "Your comment was updated"});
        })
        .catch(err => {
            res.status(500).json({error: "Failed to update your comment"});
        });
    }
});

commentsRouter.delete("/:userId/:commentId", checkToken, checkUser, (req, res, next) => {
    const id = parseInt(req.params['commentId']);

    if(id){
        commentsController.delete(id)
        .then(result => {
            res.status(204).json({msg: "Comment Deleted"})
        })
        .catch(err => {
            res.status(500).json({error:"Failed to delete comment"});
        });
    } else {
        next();
    }
});