function isAdmin(req,res,next){
    if(req.isAuthenticated()){
    if(req.user.email==='sachinbhadur9@gmail.com'){
      next()
    }}
    else{
      req.flash('error_msg','You are not admin you cantt add items sign in as admin');
      res.redirect('/users/signin');
    }
  }
  module.exports=isAdmin;
  