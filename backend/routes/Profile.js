import express from "express"
import {updateImage,coverUpdateImage} from "../controllers/profileController.js"
import auth from  "../utils/authMiddleware.js";
const router = express.Router();
router.post('/update-image',auth, updateImage);
router.post('/cover-image', auth, coverUpdateImage)
export default router;