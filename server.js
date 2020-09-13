const express=require('express');
const answerroute=require('./api/answerroute').route
const loginuserroute=require('./api/loginuserroute').route
const questionroute=require('./api/questionroute').route
const notificationroute=require('./api/notificationroute').route;
const app=express();
const socketio=require('socket.io')
const http=require('http');
const likesforanswerroute = require('./api/likesforanswerroute').route;
const likesforpostroute = require('./api/likesforpostroute').route;
const server=http.createServer(app);
const io=socketio(server);

io.on('connection',(socket)=>{
    console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
    socket.on('joinwebsite',(data)=>{
        const {username}=data;
        socket.join(username)
        
    })
    socket.on('message',(data)=>{
        const{touser,sentby,questionid}=data
        console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII'+touser+" "+sentby);
        io.to(touser).emit('notify',{questionid:questionid,sentby:sentby})

    })
})
app.use("/",express.static(__dirname+'/public'));
const port=process.env.port||4343;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/answer',answerroute)
app.use("/api/login",loginuserroute);
app.use('/api/question',questionroute);
app.use('/api/notification',notificationroute);
app.use('/api/likesforanswer',likesforanswerroute)
app.use('/api/likesforpost',likesforpostroute)
// app.use('/juniorsposts',juniorspostsroute);
// app.use('/seniorsposts',seniorspostsroute);
// app.use('/myquestions',myquestionsroute);
// app.use('/myanswers',myanswersroute);
// app.use('/myposts',mypostsroute);

app.listen(port,()=>{
 })