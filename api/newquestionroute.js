const express=requier('express');
const route=express.Router();
let allquestions=require('../db/allquestions')
//to get a specific question details, query parameter has  the question id
route.get("/aquestion",isAuth,(req,res)=>{
  allquestions.findOne({where:{id:req.query.id}}).then(question=>{res.send(question)});
});
//to get all questions asked by students of a particular year
route.get("/allquestions")
route.post('/newquestion',isAuth,(req,res)=>{
    Users.findOne({where:{username:req.body.username}}).then((user)=>{
        let point=user.points;
        if(points<10){
            res.send(null);
        }else{
            user.update({
                points:point-10,
            })
            //now, we will add the post on myquestions database
            allquestions.create({
                userid:user.id,
                topic:req.body.topic,
                description:req.body.desc,
                year:user.year,
                likes:0,
                dislikes:0,
                anonymous:0,

                //todo
            })
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