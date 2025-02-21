import {Router} from 'express';
import {addCategory, viewCategory, viewCategoryById, updateCategory, deleteCategory} from '../category/category.controller.js'
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js';
import { categoryValidator } from '../../middlewares/validators.js'

const category = Router();

category.get('/',validateJwt, isAdmin, viewCategory);
category.get('/:id',validateJwt, isAdmin, viewCategoryById);
category.post('/addCategory',validateJwt, isAdmin,categoryValidator, addCategory);
category.put('/updateCategory/:id',validateJwt, isAdmin,categoryValidator, updateCategory);
category.delete('/deleteCategory/:id', validateJwt, isAdmin, deleteCategory);

export default category;