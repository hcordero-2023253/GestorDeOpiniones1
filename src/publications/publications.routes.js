import { Router } from "express";
import { addPost,viewPost,viewPostById,updatePost,deletePost } from "../publications/publications.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { postValidator } from "../../middlewares/validators.js";

const post = Router()

post.get('/',validateJwt,viewPost)
post.get('/:id',validateJwt,viewPostById)
post.post('/addPost',validateJwt, postValidator, addPost)
post.put('/updatePost/:id',validateJwt, postValidator, updatePost)
post.delete('/deletePost/:id',validateJwt, deletePost)

export default post;