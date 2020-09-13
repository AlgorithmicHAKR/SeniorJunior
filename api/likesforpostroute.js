const express=require('express');
const app=express()
const route=express.Router();
const{user,likesforpost}=require('../db/alldb')
route.get('/',(req,res)=>{
   likesforpost.findAll({where:{allquestionId:req.query.allquestionId,username:req.query.username}})
   .then((object)=>{
       if(object===undefined) res.send(0)
       else res.send(1); 
   })
})

route.post('/',(req,res)=>{
    likesforpost.create({
        val:likesforpost.val+req.body.val,
        allquestionId:req.body.allquestionId,
        username:req.body.username, 
    }).then(()=>{

        res.send();
    })
})
module.exports={route}