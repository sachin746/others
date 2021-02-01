var express = require('express');
var router = express.Router();
var User=require("../models/Users");
var isLoggedin=require('../config/ensureauth');
var session =require('express-session');
var passport=require('passport');
var bcrypt=require('bcryptjs');
var flash=require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
var bodyparser = require('body-parser');



router.use(session({secret:'mysecretnotyours',resave:true,saveUninitialized:true}))
router.use(flash());
router.use(bodyparser.urlencoded({ extended: true }));
router.use(passport.initialize());
router.use(passport.session());
router.use(bodyparser.json());


router.get('/',isLoggedin,(req,res)=>{
  res.send(req.user)
})

/* GET users listing. */
router.get('/signin', function(req, res, next) {
  res.render('./signuplogin/signin');
});

router.post('/login',function(req, res, next) {
  passport.authenticate('local',{
    successRedirect:"/users",
    failureRedirect:"/users/signin",
    failureFlash:true
  })(req,res,next)
});



router.get('/logout',(req,res)=>{
  req.logOut();
  req.flash('success_msg','you are log out')
  res.redirect('/users/signup')
})

router.get('/signup', function(req, res, next) {
    res.render('./signuplogin/signup');
});

router.post('/signup',async (req,res)=>{
  const {name,email,password,password2}=req.body;
  let errors=[];
  //check required field
  if(!name||!email||!password||!password2){
    errors.push({msg:"Please fill in All field"})
  } 
  //check password match
  if(password!=password2){
    errors.push({msg:"Password do not match"})
  }
  //check passlength
  if(password.length<8){
    errors.push({msg:"Password should of at least 8 character"})
  }
  if(errors.length>0){
    res.render('./signuplogin/signup',{
      errors,
      name,email,password,password2
    })
  }else{
    //Validation
    User.findOne({email:email}).then(user=>{
      if(user){
        //user exist
        errors.push({msg:"Email already registered"})
        res.render('./signuplogin/signup',{
          errors,
          name,email,password,password2
        })
      }
      else{
        const newUser=new User({
          name,email,password
        })
        //hash password
        bcrypt.genSalt(10,(err,salt)=>{
          bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err){throw err;}
            newUser.password=hash;
            newUser.save().then(user=>{
              req.flash('success_msg','YOU are now registered and can log in')
              res.redirect("/users/signin")}).catch(err=>console.log(err))
          })
        })
      }
    })
  }
});

module.exports = router;