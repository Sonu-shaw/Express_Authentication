import express from "express"
import { deleteUser, getAllUser, getById, updateUser } from "../controller/userController.js";

const router = express.Router()

router.get("/", getAllUser)
router.get("/getById/:id", getById)
router.put("/update/:id", updateUser)
router.delete("/delete/:id", deleteUser)

export default router;