import { Router } from "express";
import { updateUser } from "../user/user.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js";
import {updateValidatorUser} from "../../middlewares/validators.js"

const user = Router()

user.put('/updateUser/:id',[validateJwt, updateValidatorUser] ,updateUser)

export default user;