const {get}=require("jquery");
const jwt=require('jsonwebtoken')
module.exports=(req,res,next)=>{
    let token=req.query.token;

    console.log("#######################"+token)
    if(token===undefined) 
      token=req.body.token;
    console.log("#######################"+token)
    let decodedtoken=jwt.verify(token,"pw5y439pfhq983ypfhgpewp43rhfwh")
    if(decodedtoken){
        next();
    }else{
        const error=new Error("not authenticated")
        error.statusCode=401;
        throw error;
    }
}