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
        // check("exampleInputEmail1").notEmpty().normalizeEmail(),
        check("exampleInputEmail1").isEmail(),
        check("exampleInputPassword1").isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z](?=.*[A-Z])[a-zA-Z\d@$.!%*#?&])/),
        ],
        (req,res)=>{
           
            var errors=[];
            errors.push(validationResult(req))
            var item ={
                    exampleInputEmail1: req.body.exampleInputEmail1,
                    exampleInputPassword1: req.body.exampleInputPassword1,
                      }
                      console.log(Object.entries(errors[0].errors).length )
        if(Object.entries(errors[0].errors).length === 1 && (req.body.exampleInputPassword1 === req.body.exampleInputPassword2)){
            // errors.push({"value":"password mismatch"})
            
             Userdata.findOne({exampleInputEmail1: item.exampleInputEmail1})
              
                    .then(()=>     {
                            
                        let response = {};
                         response.title = 'SignUp';
                         response.nav = nav.first; 
                         response.error1="User Already exists.Please Signin";
                         response.error2="";
                         response.error3="";
                         response.error4="";
                        // console.log(user)
                        res.render("signup",response)
                    })
                    if(item.exampleInputEmail1==="admin@gmail.com"){
                            
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
           
        }
        
        // else if(  (req.body.exampleInputPassword1 === req.body.exampleInputPassword2) && req.body.exampleInputPassword1.length <5 ){
        else if(  (req.body.exampleInputPassword1 === req.body.exampleInputPassword2) && !check(req.body.exampleInputPassword1.length).isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z](?=.*[A-Z])[a-zA-Z\d@$.!%*#?&])/)  ){

            let response = {};
            response.title = 'SignUp';
            response.nav = nav.first; 
            response.error1="";
            response.error2="";
            response.error3="Password should be atleast 8 characcter and conatin atleast one uppercase,one lowercase, one number and one special character ";
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
        else if(req.body.exampleInputName.length<3 ) {
            let response = {};
            response.title = 'SignUp';
            response.nav = nav.first; 
            response.error1="Invalid Username";
            response.error2="";
            response.error3="";
            response.error4="";
            res.render("signup",response)
                }
                else if(!check(req.body.exampleInputEmail1).isEmail().normalizeEmail() ) {
                    let response = {};
                    response.title = 'SignUp';
                    response.nav = nav.first; 
                    response.error1="";
                    response.error2="Email Id Invalid";
                    response.error3="";
                    response.error4="";
                    res.render("signup",response)
                        }    
         else {
          
            let response = {};
            response.title = 'SignUp';
            response.nav = nav.first; 
            response.error1="Email Id Invalid";
            response.error2="";
            response.error3="";
            response.error4="";
            res.render("signup",response)
            }
        
        
        }) 

       return signupRouter;
}

module.exports = router;        