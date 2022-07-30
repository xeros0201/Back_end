import express from "express";
import { createProject, getAllProject, updateProject } from "../controller/projectController.js";

const router = express.Router()


router.post('/update',updateProject)
router.post('/create',createProject)
router.get('/',getAllProject)

export default router
