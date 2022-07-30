import mongoose from "mongoose";


const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        minlength:4
    },

},{timestamps:true,writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
 }})
export const genresModel = mongoose.model("Genres",schema)