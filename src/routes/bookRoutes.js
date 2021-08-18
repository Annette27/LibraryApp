const express = require("express")

const booksRouter = express.Router();
const Bookdata = require("../model/bookdata")
const Userdata = require("../model/userdata")
const redirectlogin = (req,res,next)=>{
  if(req.session.Userid!=="admin@gmail.com"){
      let response = {};
          response.title = 'library';
          response.error1="";
          response.error2="";
          response.error3="";
          response.error4="";
          response.nav = nav.first;
      res.redirect("/",response)
  }
  else{
      next()
  }
  }
function router(nav){
  let response = {};
    response.title = 'SignUp';
    response.nav = nav.first; 
    response.error1="";
    response.error2="";
    response.error3="";
    response.error4="";
    
    booksRouter.get("/",function(req,res){
      if(req.session.Userid=="admin@gmail.com"){
        Bookdata.find()
        .then(function(books){
            res.render("books",{
        
                title:"Books",
                nav:nav.admin,
                books
            
            })
        })
      }
  else if(Userdata.find({ exampleInputEmail1:req.session.Userid})){
    Bookdata.find()
    .then(function(books){
        res.render("books",{
    
            title:"Books",
            nav:nav.user,
            books
        
        })
    })

  }

      
      else{
        res.render("index",response)
      }
     
        });
        booksRouter.get("/:id",function(req,res){
          const id= req.params.id
          if(req.session.Userid=="admin@gmail.com"){
            Bookdata.findOne({_id:id})
            .then(function(book){
              res.render("book",{
              
                  title:"Book",
                  nav:nav.admin,
                  book
              
              })
              });

          }
          else if(Userdata.find({ exampleInputEmail1:req.session.Userid})){
            Bookdata.findOne({_id:id})
            .then(function(book){
              res.render("book",{
              
                  title:"Book",
                  nav:nav.user,
                  book
              
              })
              });
          }
          else{
            res.render("index",response)
          }
          
          
          })
           
            return booksRouter
}

module.exports = router;        