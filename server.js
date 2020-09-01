const express=require('express');
const app=express();
app.use("/",express.static(__dirname+'/public'));
const port=process.env.port||4343;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/juniorsposts',juniorspostsroute);
// app.use('/seniorsposts',seniorspostsroute);
// app.use('/myquestions',myquestionsroute);
// app.use('/myanswers',myanswersroute);
// app.use('/myposts',mypostsroute);

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`);
})