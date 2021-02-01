var express = require("express");
var app = express();
port = process.env.PORT || 4000;
var bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Prdt = require('./models/Item.js')
var path = require('path');
var session =require('express-session');
const MongoStore = require('connect-mongo')(session);
var passport=require('passport');
var flash=require('connect-flash');

require('./config/passport')(passport)
mongoose.connect('mongodb+srv://sachin746:15august@cluster0.nmt1k.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(console.log(`mongodb connected`)).catch(err=>console.log(err));

app.use(session({
  secret:'mysecretnotyours',
  resave:false,
  saveUninitialized:false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

var usersRouter = require('./router/user');
var  indexRouter = require('./router/index');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.json());
app.use(express.static('product_image'));
app.use(session({secret:'mysecretnotyours',resave:true,saveUninitialized:true}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//global variables
app.use((req,res,next)=>{
  res.locals.success_msg=req.flash('success_msg');
  res.locals.error_msg=req.flash('error_msg');
  res.locals.error=req.flash('error');
  res.locals.cart=req.session.cart;
  next();
})
app.use('/',indexRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
  console.log("\nserver is running on the port " + port);
})