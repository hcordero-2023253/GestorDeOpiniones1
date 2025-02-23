import { Router } from "express";
import { addComment,viewComments,viewCommentsById, updateComments,deleteComment } from "./comments.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { commentValidator} from "../../middlewares/validators.js";

const comments = Router();

comments.get('/',validateJwt, viewComments)
comments.get('/:id',validateJwt, viewCommentsById)
comments.post('/addComment',validateJwt, commentValidator, addComment);
comments.put('/updateComment/:id',validateJwt,updateComments)
comments.delete('/delete/:id' , validateJwt,deleteComment)

export default comments;