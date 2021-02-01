var express = require('express');
var router = express.Router();
const Prdt = require('../models/Item.js')
var session =require('express-session');
var isAdmin=require('../config/admin');
var flash=require('connect-flash');
var bodyparser = require('body-parser');

const multer = require("multer");
var path = require('path');

router.use(express.static(__dirname + '/public'));
router.use(express.static('product_image'));
router.use(flash());
router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());

var p1image;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'product_image');
  },
  filename: function (req, file, cb) {
    p1image=file.fieldname+"_"+Date.now() +path.extname(file.originalname)
    cb(null, p1image)
  }
})
var product_image = multer({ storage: storage })

router.get("/",async(req, res)=> {
    const prdt1=await Prdt.find();
    res.render("home",{prdt:prdt1,totalquantity:req.session.totalquantity||0,user:req.user});
  })
  
  
  
router.get("/product/:id",async(req,res)=>{
    const prdt=await Prdt.findById(req.params.id);
    res.render("productdetail",{prdt:prdt,totalquantity:req.session.totalquantity||0,user:req.user})
  })
  
router.post("/additem",isAdmin, product_image.single('pimage'), async (req, res) => {
    var product = {
      pname: req.body.pname,
      pbrand: req.body.pbrand,
      pimage: p1image,
      pprice: req.body.pprice,
      pdescription:req.body.pdescription
    }
    Prdt.create(product);
    res.redirect("/");
  })
  
router.get("/additem",isAdmin, function (req, res) {
    res.render('additem',{user:req.user});
  })

router.post('/cart/:id',function(req,res){
  var productid=req.params.id;
  var cart=req.session.cart?req.session.cart:{};
  Prdt.findById(productid,function(err,product){
    if(err){console.log(err)}
    if(cart[productid]){
      cart[productid].qty++;
    }else{
      cart[productid]={
        item:product._id,
        image:product.pimage,
        title:product.pname,
        price:product.pprice,
        qty:1
      }
    }
    req.session.cart=cart;
    res.redirect('/cart')
  })
})

router.get('/cart',async(req,res)=>{
  var cart=req.session.cart;
  displaycart={items:[],totalquantity:0,total:0};
  var total=0;
  var totalquantity=0;
  for(var item in cart){
    displaycart.items.push(cart[item]);
    total+=cart[item].qty*cart[item].price;
    totalquantity++;
  }
  displaycart.total=total;
  displaycart.totalquantity=totalquantity;
  req.session.totalquantity=totalquantity;
  res.render('cart',{cart:displaycart,user:req.user})
  })

module.exports = router;