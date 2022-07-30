import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import products from './routes/product.js'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import dotenv  from "dotenv"

import auth from './routes/auth.js'
import user from './routes/user.js'
import gen from './routes/genres.js'
import discount from './routes/discount.js'
import project from './routes/project.js'
import events from './routes/event.js'
import contact from './routes/contact'
const app= express();
const PORT =  8001

dotenv.config();
//CONECT DATABASE
mongoose.connect(process.env.MG_URL,
{ useNewUrlParser:true, useUnifiedTopology:true,
}).then(()=>{
    console.log("Connected")
}).catch(err =>{
    console.log('err',err)
})

app.disable('etag');

app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"    }));
app.use(cors());
app.use(morgan("common"));
app.use(cookieParser())
app.use(express.json())


//ROUTES
// app.use("/v1/author",authorRoute)
app.use("/api/products",products)
app.use("/api/auth",auth)
app.use("/api/user",user)
app.use("/api/genres",gen)
app.use("/api/discount",discount)
app.use("/api/project",project)
app.use("/api/event",events)

app.use("/api/contact",contact)

app.listen(PORT,()=>{
    console.log("server is running")
})