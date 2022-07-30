import express from "express";
import { createContact, getAllContactAdmin } from "../controller/contactController.js";

const router = express.Router()

router.post('/',createContact)
router.post('/admincontact',getAllContactAdmin)
export default router
