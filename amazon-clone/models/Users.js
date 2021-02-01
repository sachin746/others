var mongoose=require("mongoose");
const validator = require('validator');
var bcypt=require('bcryptjs');

var schema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8
    },
    date:{
        type:Date,
        default:Date.now
    }
})



module.exports=mongoose.model("User",schema);