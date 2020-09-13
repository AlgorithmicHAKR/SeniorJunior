const express=require('express');
const route=express.Router();
let {user,allquestions,likesforpost}=require('../db/alldb');
const isAuth = require("../middlewares/isAuth");
// const { is } = require('sequelize/types/lib/operators');
//to get a specific question details, query parameter has  the question id
route.get("/aquestion",isAuth,(req,res)=>{
     console.log("HIHIHIHIH")
    allquestions.findOne({where:{id:req.query.id}}).then(question=>{res.send(question)});
});
//to get all questions asked by students of a particular year
route.get("/allquestions",isAuth,(req,res)=>{
    allquestions.findAll({where:{year:req.query.year}}).then((questions)=>{res.send(questions)});
})
//to get all questions asked by a particular student
route.get("/questionsofoneuser",isAuth,(req,res)=>{
    user.findOne({where:{username:req.query.username}}).then(theuser=>{
        allquestions.findAll({where:{userId:theuser.id}}).then(questions=>{
                 res.send(questions);
        })
    })
})

route.post('/newquestion',(req,res)=>{

    user.findOne({where:{username:req.body.username}}).then((user)=>{
        let point=user.points;
        if(point<10){
            res.send("not possible");
        }else{
            user.update({
                points:point-10,
            })
            //now, we will add the post on myquestions database
            allquestions.create({
                userId:user.id,
                topic:req.body.topic,
                desc:req.body.desc,
                year:user.year,
                likes:0,
                dislikes:0,
                anonymous:0,
            })
            res.send(user);
            //now, the question is to be added on the same year students database
            // if(user.yearofclg==1){
            //     let firstyearquestions=require('../db/firstyearquestions');
            //     firstyearquestions.create({
            //         userid:user.id,
            //         topic:req.body.topic,
            //         description:req.body.desc,
            //         anonymous:0,
            //         likes:0,
            //         dislikes:0,
            //     })
            // }
            // else if(user.yearofclg==2){
            //     let secondyearquestions=require('../db/secondyearquestions');
            //     secondyearquestions.create({
            //         userid:user.id,
            //         topic:req.body.topic,
            //         description:req.body.desc,
            //         anonymous:0,
            //         likes:0,
            //         dislikes:0,
            //     })
            // }
            // else if(user.yearofclg==3){
            //     let thirdyearquestions=require('../db/thirdyearquestions');
            //     thirdyearquestions.create({
            //         userid:user.id,
            //         topic:req.body.topic,
            //         description:req.body.desc,
            //         anonymous:0,
            //         likes:0,
            //         dislikes:0,
            //     })
            // } else if(user.yearofclg==4){
            //     let fourthyearquestions=require('../db/fourthyearquestions');
            //     fourthyearquestions.create({
            //         userid:user.id,
            //         topic:req.body.topic,
            //         description:req.body.desc,
            //         anonymous:0,
            //         likes:0,
            //         dislikes:0,
            //     })
            // }
            
        }
    })
}) 
route.post('/alike',isAuth,(req,res)=>{
      let flag=0;
      allquestions.findOne({where:{id:req.body.id}}).then(question=>{
          likesforpost.findOne({where:{allquestionId:req.body.id,userId:req.body.userId}}).then(
              lfp=>{
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+lfp)
            if(!lfp){
                question.update({
                    likes:
                    question.likes+1
                })
                user.findOne({where:{id:question.userId}}).then(theuser=>{
                    theuser.update({
                        points:theuser.points+1
                    })
                })

               likesforpost.create({
                   allquestionId:req.body.id,
                   userId:req.body.userId,
                   val:1, 
               })         
             }else{
                
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                  flag=1;
                }
            })
            .then(()=>{
                console.log("HOW IS IT POSSIBLE"+flag)
                res.send([{yes:flag}])})
            })

})

route.post('/adislike',isAuth,(req,res)=>{
    allquestions.findOne({where:{id:req.body.id}}).then(question=>{
        question.update({
            dislikes:question.dislikes+1
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