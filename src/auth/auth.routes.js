import {  Router } from 'express';
import { register,
         login} from '../auth/auth.controller.js'
import {validateJwt} from '../../middlewares/validate.jwt.js'
import {registerValidator} from '../../middlewares/validators.js'

const api = Router()

api.post('/register',registerValidator,register)
api.post('/login', login)

export default api;