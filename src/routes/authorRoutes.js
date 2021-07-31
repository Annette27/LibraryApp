const express = require("express")

const authorsRouter = express.Router();
function router(nav){
    var authors=[
        {
            title:"Christopher Paolini",
            nationality:"The U.S",
            genre:"Fantasy",
            img:"chris.jpg"
        },
        {
            title:"J K Rowling",
            nationality:"U.K",
            genre:"Fantasy,drama",
            img:"jkrowling.jpg"
        },
        {
            title:"Enid Blyton",
            nationality:"U.K",
            genre:"Children's Literature,mystery",
            img:"enid.jpg"
        },
        {
            title:"Arundhathi Roy",
            nationality:"India",
            genre:"fiction & Non-fiction",
            img:"arun.jpg"
        },
        {
            title:"Agatha Christy",
            nationality:"U.K",
            genre:"Murder mystery,detective story,thriller",
            img:"agatha.jpg"
        },
        {
            title:"Ruskin Bond",
            nationality:"India",
            genre:"fiction,Children's books",
            img:"ruskin.jpg"
        }
    
    ]
   
    authorsRouter.get("/",function(req,res){
        res.render("authors",{
        
            title:"Authors",
            nav,
            authors
        
        })
        });
        authorsRouter.get("/:id",function(req,res){
          const id= req.params.id
            res.render("author",{
            
                title:"Author",
                nav,
                author:authors[id]
            
            })
            });
            return authorsRouter
}

module.exports = router;        