const express = require("express")
const credential = {
    email : "admin@gmail.com",
    password :"admin12345"
}
const nav =[
    {
        link:"/books",name:"Books"
    },
    {
        link:"/authors",name:"Authors"
    },
    {
        link:"/signin",name:"Sign In"
    },
    {
        link:"/signup",name:"Sign Up"
    },
    {
        link:"/addbook",name:"Add Book"
    }
]
const signinRouter = express.Router();
function router(nav){
    
    signinRouter.get("/",function(req,res){
        res.render("signin",{
        
            nav,
            error1: "",
            error2: ""
        
        })
        });
     
       return signinRouter;
}
signinRouter.post("/",(req,res)=>{
    if(req.body.email ==credential.email && req.body.password == credential.password){
      req.session.user=req.body.email;
  
      res.render("index",{nav,title:"Libray",error1: "",error2:""})
       
    }
    else if(req.body.email !=credential.email && req.body.password == credential.password){
       
        res.render("signin",{nav,title:"Libray",error1: "incorrect username",error2:""})
    }
    else if(req.body.password != credential.password && req.body.email ==credential.email){
        res.render("signin",{nav,title:"Libray",error2: "incorrect password",error1:""})
    }
    else{
        // res.end("invalid Password")
        res.render("signin",{nav,title:"Libray",error2: "incorrect password",error1: "incorrect username"})

    }
}) 
module.exports = router;        