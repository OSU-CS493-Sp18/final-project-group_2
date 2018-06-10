import {commentModel, addCommentModel} from '../models/comment';
import { Router } from 'express';
import {Comments} from '../controllers/commentController';

export const commentsRouter = Router();
const commentsController = new Comments.CommentController();

commentsRouter.get("/:jokeId", (req, res, next) => {
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

commentsRouter.get("/:userId", (req, res, next) => {
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
            res.status(500).json({error: "Failed to add comment"});
        });
    } else {
        next();
    }
});

commentsRouter.put("/:commentId", (req, res, next) => {
    const comment:commentModel = req.body;
    
    if(comment){
        commentsController.update(comment)
        .then(result => {
            res.status(201).json({msg: "Your comment was updated"});
        })
        .catch(err => {
            res.status(500).json({error: "Failed to update your comment"});
        });
    }
});

commentsRouter.delete("/:commentId", (req, res, next) => {
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