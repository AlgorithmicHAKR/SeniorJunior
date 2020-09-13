const express=require('express');
const route=express.Router();
let {user,answers,notification}=require('../db/alldb');
const isAuth = require("../middlewares/isAuth");

//all answers of a particular user
route.get('/allanswers',isAuth,(req,res)=>{
     answers.findAll({where:{username:req.query.username}},(allans)=>{
      res.send(allans);
     })
})

//all answers in a particular question
route.get('/allanswersofaquestion',(req,res)=>{
    
    answers.findAll({where:{allquestionId:req.query.id}}).then((allans)=>{
        res.send(allans);
    })
})
//post an answer, requires username and question id and text
route.post('/',(req,res)=>{
    console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
    answers.create({
        allquestionId:req.body.id,
        username:req.body.username,
        topic:req.body.topic,
        likes:0,
        dislikes:0
    }).then(()=>{
        notification.create({
            sentby:req.body.sentby,
            username:req.body.username,
             questionid:req.body.id,
             seen:0,
        })
    }).then(()=>{
        res.send()

    })
})
route.post('/alike',isAuth,(req,res)=>{
    answers.findOne({where:{id:req.body.id}}).then(answer=>{
        answer.update({
            likes:
            answer.likes+1
        })
        user.findOne({where:{id:answer.userId}}).then(theuser=>{
            theuser.update({
                points:theuser.points+1
            })
        })
    })
  res.send()
  }) 
  route.post('/adislike',isAuth,(req,res)=>{
    answers.findOne({where:{id:req.body.id}}).then(answer=>{
        answer.update({
            dislikes:answer.dislikes+1
        })
        user.findOne({where:{id:question.userId}}).then(theuser=>{
            theuser.update({
                points:theuser.points-1
            })
        })
    })
  res.send()
  })
module.exports={
    route
}