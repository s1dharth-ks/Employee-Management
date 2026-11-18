import { Router } from "express";
import { getEmployees, login, register } from "../controller/userController.js";

const router = Router()

router.post("/reg",register)
router.get("/get",getEmployees)
router.post("/login",login)
export default router