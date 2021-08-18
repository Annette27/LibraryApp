module.exports = router;        

const express = require("express")

const authorsRouter = express.Router();
const Authordata = require("../model/authordata")
const Userdata = require("../model/userdata")

function router(nav){
  let response = {};
    response.title = 'SignUp';
    response.nav = nav.first; 
    response.error1="";
    response.error2="";
    response.error3="";
    response.error4="";
    
    authorsRouter.get("/",function(req,res){
      if(req.session.Userid=="admin@gmail.com"){
        Authordata.find()
        .then(function(authors){
            res.render("authors",{
        
                title:"Authors",
                nav:nav.admin,
                authors
            
            })
        })
      }
  else if(Userdata.find({ exampleInputEmail1:req.session.Userid})){
    Authordata.find()
    .then(function(authors){
        res.render("authors",{
    
            title:"Authors",
            nav:nav.user,
            authors
        
        })
    })

  }

      
      else{
        res.render("index",response)
      }
     
        });
        authorsRouter.get("/:id",function(req,res){
          const id= req.params.id
          if(req.session.Userid=="admin@gmail.com"){
          Authordata.findOne({_id:id})
          .then(function(author){
            res.render("author",{
            
                title:"Author",
                nav:nav.admin,
                author
            
            })
            });
          }
          else if(Userdata.find({ exampleInputEmail1:req.session.Userid})){
            Authordata.findOne({_id:id})
            .then(function(author){
              res.render("author",{
              
                  title:"Author",
                  nav:nav.user,
                  author
              
              })
              });
          }
          else{
            res.render("index",response)
          }
          })
           
            return authorsRouter
}

module.exports = router;        