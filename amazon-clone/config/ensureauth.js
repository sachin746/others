function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
      next()
    }
    else{
      req.flash('error_msg','Please log in first');
      res.redirect('/users/signin');
    }
  }
  module.exports=isLoggedin;