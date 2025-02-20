import { body } from 'express-validator';
import { validateErrors, validateErrorsFiles} from './validate.errors.js'
import { existEmail, existUsername, notRequiredFlied } from "../utils/db.validators.js";

//User validation
export const registerValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('lastname', 'Lastname cannot be empty').notEmpty(),
    body('username','Username cannot be empty').notEmpty().toLowerCase().custom(existUsername),
    body('email', 'Email cannot be empty').notEmpty().isEmail().custom(existEmail),
    body('password','Password cannot be empty').notEmpty().isStrongPassword().withMessage('The Passsword must be strong').isLength({min:8}),
]