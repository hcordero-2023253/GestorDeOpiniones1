import { body } from 'express-validator';
import { validateErrors, validateErrorsFiles} from './validate.errors.js'
import { existEmail, existUsername, notRequiredFlied } from "../utils/db.validators.js";
import { existCategory } from '../utils/db.validators.js';
import { existPostName , existPostcontent } from '../utils/db.validators.js';
import { existComment } from '../utils/db.validators.js';

//User validation
export const registerValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('lastname', 'Lastname cannot be empty').notEmpty(),
    body('username','Username cannot be empty').notEmpty().toLowerCase().custom(existUsername),
    body('email', 'Email cannot be empty').notEmpty().isEmail().custom(existEmail),
    body('password','Password cannot be empty').notEmpty().isStrongPassword().withMessage('The Passsword must be strong').isLength({min:8}),
]

export const updateValidatorUser = [
    body('name', 'Name cannot be empty').optional().notEmpty().custom(notRequiredFlied),
    body('lastname', 'Lastname cannot be empty').optional().notEmpty().custom(notRequiredFlied),
    body('username').optional().notEmpty().toLowerCase().custom((username, {req})=> existUsername(username, req.user)),
    body('email').optional().notEmpty().isEmail().custom((email, {req})=> existEmail(email, req.user)),
    body('password').optional().notEmpty().custom(notRequiredFlied),
    validateErrorsFiles
]

//Category validation
export const categoryValidator = [
    body('name', 'Name cannot be empty').notEmpty().custom(existCategory),
    body('description', 'Description cannot be empty').notEmpty(),
    validateErrors
]

//Post validation
export const postValidator = [
    body('title', 'Title cannot be empty').notEmpty().isLength({max:50}).withMessage('Title must be less than 50 characters').custom(existPostName),
    body('content', 'Content cannot be empty').notEmpty().isLength({max:20000}).withMessage('Content must be less than 20000 characters').custom(existPostcontent),
    body('category', 'Category cannot be empty').notEmpty().custom(existCategory),
    body('user', 'User cannot be empty').notEmpty().custom(existUsername),
]

//Comment validation
export const commentValidator = [
     body('content', 'Content cannot be empty').notEmpty().isLength({max:20000}).withMessage('Content must be less than 50 characters').custom(existComment),
     body('post', 'Post cannot be empty').notEmpty().custom(existPostName),
     body('user', 'User cannot be empty').notEmpty().custom(existUsername),
]

