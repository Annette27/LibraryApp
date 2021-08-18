const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://userone:userone@libraryfiles.o5pxy.mongodb.net/LIBRARYAPPNEW?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true});

const { check, validationResult } = require("express-validator");
const Userdata = require("../model/userdata")

const signupRouter = express.Router();
function router(nav){
    let response = {};
    response.title = 'SignUp';
    response.nav = nav.first; 
    response.error1="";
    response.error2="";
    response.error3="";
    response.error4="";
    signupRouter.get("/",function(req,res){
        res.render("signup",response)
        });
     
        signupRouter.post("/",
        [check("exampleInputName").isLength({ min: 3 }).trim().withMessage("enter valid name"),
        check("exampleInputEmail1").notEmpty().normalizeEmail(),
        check("exampleInputPassword1").notEmpty().isLength({ min: 5 }).trim(),
        check("exampleInputPassword2").notEmpty().isLength({ min: 5 }).trim()
        ],
        (req,res)=>{
           
            // req.session.user=req.body.exampleInputName;
            var errors=[];
            errors.push(validationResult(req))
            var item ={
                    exampleInputEmail1: req.body.exampleInputEmail1,
                    exampleInputPassword1: req.body.exampleInputPassword1,
                      }
        if(Object.entries(errors[0].errors).length === 0 && (req.body.exampleInputPassword1 === req.body.exampleInputPassword2)){
            errors.push({"value":"password mismatch"})
        
             Userdata.findOne({exampleInputEmail1: item.exampleInputEmail1})
              
                         
                .then((user)=>{
                   
                    if(user){
                        let response = {};
                         response.title = 'SignUp';
                         response.nav = nav.first; 
                         response.error1="User Already exists.Please Signin";
                         response.error2="";
                         response.error3="";
                         response.error4="";
                        // console.log(user)
                        res.render("signup",response)
                    }
                    else{
                        let response = {};
                        response.title = 'Signin';
                        response.nav = nav.first; 
                        response.error1="";
                        response.error2="";
                        response.error3="";
                        response.error4="";
                        const user=Userdata(item);
                        user.save();
                        res.render("signin",response)                    
                          
                    }
                     
                } )
               
        }
        
        else if(  (req.body.exampleInputPassword1 === req.body.exampleInputPassword2) && req.body.exampleInputPassword1.length <5 ){
            let response = {};
            response.title = 'SignUp';
            response.nav = nav.first; 
            response.error1="";
            response.error2="";
            response.error3="Password weak";
            response.error4="";
            res.render("signup",response)
            }
        else if(req.body.exampleInputPassword1 !== req.body.exampleInputPassword2) {
            let response = {};
            response.title = 'SignUp';
            response.nav = nav.first; 
            response.error1="";
            response.error2="";
            response.error3="";
            response.error4="Password mismatch";
            res.render("signup",response)
                }   
        else if(req.body.exampleInputName.length<3 && (req.body.exampleInputPassword1 !== req.body.exampleInputPassword2)  ) {
            let response = {};
            response.title = 'SignUp';
            response.nav = nav.first; 
            response.error1="Invalid crentials";
            response.error2="";
            response.error3="";
            response.error4="";
            res.render("signup",response)
                }
         else {
          
            let response = {};
            response.title = 'SignUp';
            response.nav = nav.first; 
            response.error1="Invalid crentials";
            response.error2="";
            response.error3="";
            response.error4="";
            res.render("signup",response)
            }
        
        
        }) 

       return signupRouter;
}

module.exports = router;        