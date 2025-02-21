import { Router } from "express";
import { updateUser } from "../user/user.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js";
import {updateValidator} from "../../middlewares/validators.js"

const user = Router()

user.put('/updateUser/:id',[validateJwt, updateValidator] ,updateUser)

export default user;