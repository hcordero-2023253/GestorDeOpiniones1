import { Router } from "express";
import { updateUser } from "../user/user.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js";

const user = Router()

user.put('/updateUser/:id',validateJwt ,updateUser)

export default user;