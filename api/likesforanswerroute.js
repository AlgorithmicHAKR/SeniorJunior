const express=require('express');
const app=express()
const route=express.Router();
const{user,likesforanswer,answers}=require('../db/alldb')
route.get('/',(req,res)=>{
    user.findOne({where:{username:req.query.username}}).
    then((theuser)=>{
        likesforanswer.findAll({where:{answerId:req.query.answerId,userId:theuser.id}})
        .then((object)=>{
            console.log("WWWWWWWWWWWWWWWWWWWW"+object)
            if(object===null) res.send({value:1})
            else res.send({value:0}); 
        })
    })
   
})

route.post('/',(req,res)=>{
    user.findOne({where:{username:req.body.username}}).
    then((theuser)=>{
        likesforanswer.create({
            val:req.body.val,
            answerId:req.body.answerId,
            userId:theuser.id, 
        })
         .then(()=>{
             if(req.body.val==1){
                answers.findOne({where:{id:req.body.answerId}}).then(answer=>{
                    answer.update({
                        likes:
                        answer.likes+1
                    })
                    user.findOne({where:{username:answer.username}}).then(theuser=>{
                        theuser.update({
                            points:theuser.points+1
                        })
                    })
                })
              res.send()
             }else{
                answers.findOne({where:{id:req.body.answerId}}).then(answer=>{
                    answer.update({
                        dislikes:answer.dislikes+1
                    })
                    user.findOne({where:{username:answer.username}}).then(theuser=>{
                        theuser.update({
                            points:theuser.points-1
                        })
                    })
                })
              res.send
             }
         })    
       
    })
   
})
module.exports={route}