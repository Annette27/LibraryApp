const express = require("express");
const { check, validationResult } = require("express-validator");
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
const signupRouter = express.Router();
function router(nav){
    
    signupRouter.get("/",function(req,res){
        res.render("signup",{
        
            nav,
            error1: "",
            error2: "",
            error3: "",
            error4: "",
                  
        })
        });
     
       return signupRouter;
}
signupRouter.post("/",
[check("exampleInputName").notEmpty().isLength({ min: 3 }),
check("exampleInputEmail1").notEmpty().normalizeEmail(),
check("exampleInputPassword1").notEmpty().isLength({ min: 5 }),
check("exampleInputPassword2").notEmpty().isLength({ min: 5 })
],
(req,res)=>{
    req.session.user=req.body.exampleInputName;
    var errors=[];
    errors.push(validationResult(req))

if(Object.entries(errors[0].errors).length === 0 && (req.body.exampleInputPassword1 === req.body.exampleInputPassword2)){
    errors.push({"value":"password mismatch"})
    res.render("D:/coding/Asslibraryapp/src/views/index",{nav,title:"Libray",error1: "",error2:"",error3:"",error4:""})
  
}
else if(  (req.body.exampleInputPassword1 === req.body.exampleInputPassword2) && req.body.exampleInputPassword1.length <5 ){
  
    res.render("D:/coding/Asslibraryapp/src/views/signup",{nav,title:"Libray",error1: "",error2:"",error3:"Password weak",error4:""})
    }
else if(req.body.exampleInputPassword1 !== req.body.exampleInputPassword2) {
  
        res.render("D:/coding/Asslibraryapp/src/views/signup",{nav,title:"Libray",error1: "",error2:"",error3:"",error4:"Password mismatch"})
        }   
else if(req.body.exampleInputName.length<3 && (req.body.exampleInputPassword1 !== req.body.exampleInputPassword2)  ) {
  
            res.render("D:/coding/Asslibraryapp/src/views/signup",{nav,title:"Libray",error1: "Invalid crentials",error2:"",error3:"",error4:""})
            }  
 else {
  
    res.render("D:/coding/Asslibraryapp/src/views/signup",{nav,title:"Libray",error1: "Invalid crentials",error2:"",error3:"",error4:""})
    }


}) 
module.exports = router;        