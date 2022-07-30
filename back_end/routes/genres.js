import express from "express";
import {createGenres,getAllGen,getOneGen} from '../controller/genresController'
import{verifyToken,verifyTokenAndUser} from '../controller/middlewareController'
const router = express.Router()
 router.post("/",createGenres)
 router.get("/gen/:id",getOneGen)
 router.get('/all',getAllGen)
export default router