const express=require('express');
const jwt=require('jsonwebtoken')
const { user,notification } = require('../db/alldb');
const route=express.Router();const isAuth = require("../middlewares/isAuth");
route.get('/',isAuth,(req,res)=>{
    notification.findAll({where:{username:req.query.username}}).then(notifications=>{
        res.send(notifications)
    })
})
route.post('/seen',isAuth,(req,res)=>{
   notification.findAll({where:{questionid:req.body.id}})
   .then(allnoti=>{
    allnoti.map(n=>{
      
    n.update({
        seen:1,
    })  
    })
   }).then(()=>{
       res.send()
   })
})
route.post('/',isAuth,(req,res)=>{
    console.log('33333333333333333333333333333333333333333')
    notification.create({
        sentby:req.body.sentby,
        username:req.body.username,
         questionid:req.body.questionid,
         seen:0,
    })
    res.send();
    
})

module.exports={route}