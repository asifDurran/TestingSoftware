import express from "express"
import {userRegister,registerErrors, loginErrors, userLogin} from "../controllers/userController.js"
const router = express.Router();
router.post('/register',registerErrors, userRegister)
router.post('/login', loginErrors, userLogin)
export default router