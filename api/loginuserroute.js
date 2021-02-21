const express=require('express');
const jwt=require('jsonwebtoken')
const { user } = require('../db/alldb');
const route=express.Router();const isAuth = require("../middlewares/isAuth");
route.get('/',isAuth,(req,res)=>{
  //  console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
    user.findOne({where:{username:req.query.username}}).then(theuser=>{
        res.send(theuser);
    })
})
route.get('/withid',isAuth,(req,res)=>{
    user.findOne({where:{id:req.query.id}}).then(theuser=>{
        res.send(theuser) 
    })
})
route.post('/login',(req,res)=>{
    user.findOne({where:{username:req.body.username}}).then(user1=>
       {
           if(user1!=undefined){
            console.log(user1.username+"dfd "+user1.password)

             if(user1.password.localeCompare(req.body.password)==0){
                 let token=jwt.sign({
                     userId:user1.id
                 },
                 "pw5y439pfhq983ypfhgpewp43rhfwh",   { expiresIn: "1h" }
                 
                 );
                console.log("**************"+token);
               res.send(token);
            }
        }else res.send(null);
    }
    )
    
    // console.log("((((((((()))))))))");
        // res.send("could not login");
    })
    route.post('/signup',(req,res)=>{
        console.log("**************"+req.body.username+" "+req.body.password+" "+req.body.year);
        user.findOne({where:{username:req.body.username}}).then(user1=>
            {if(user1){
                 res.send("username exist");        
            }else{
                user.create({username:req.body.username,password:req.body.password,year:req.body.year,points:50}).then((user1)=>res.send(user1));
                res.send("user");
            }
        }
            )
    })
    module.exports={
        route
    }