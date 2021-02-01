const mongoose =require('mongoose');

const schema =new mongoose.Schema({
    pname:{
        type:String,
        required:true,
        trim:true,
        unique:true

    },
    pbrand:{
        type:String,    
        trim:true,

    },
    pimage:{
        type:String

    },
    pprice:{
        type:Number,
        required:true
    },
    pdescription:{
        type:String,
        trim:true
    }
})

const Prdt=mongoose.model("Prdt",schema);
module.exports=Prdt;