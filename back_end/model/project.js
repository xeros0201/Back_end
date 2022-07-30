import mongoose from "mongoose";



const schema = new mongoose.Schema({
  name:{
    type:String,
      required:true,
   
  },

  title:{
      type:String,
      required:true,

  },
  caption:{
    type:String,
  },
  type:{
    type:[String],
    required:true,
    //hạng mục
  },

  cooperation:{
    type:String,
   
  },
  sponsers:{
    type:[String],
    
  },
  year:{
    type:String,
    required:true,
  },
  picHero:{
    type:String,
    required:true,
  },
  about:{
    type:String,
    required:true,

  },
  details:{
    type:[String],
  },
  story:{
    title:{
      type:String,
    },
    para:{
      type:[String],
    }
  },
  pics:{
    type:[String],
   
  },
  goal1:{
    title:{
      type:String,
    },
    para:{

      type:[String],

    }
  },
  goal2:{
    title:{
      type:String,
    },
    para:{

      type:[String],

    }
  },
  // achievments:{
  //   type:[String],
  //   required:true,  
  // },
  picHero2:{
    //triple pic
    type:[String],
    
  },
  picHero3:{
  
    type:String,
    
  },
  awards:[{
    title:{
      type:String,
   
   
    },
    link:{
      type:String,
    }
  }]
    
},{timestamps:true})
export const ProjectModel = mongoose.model("Projects",schema)