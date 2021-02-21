$(()=>{
    if(localStorage.getItem('username')==undefined){
        window.location.replace("./blank.html")
    }
    // import io from 'socket.io-client';
    let socket=io()
    console.log(socket);
    socket.emit('joinwebsite',{username:localStorage.getItem('username')})
    socket.on('notify',(data)=>{
        const{sentby,questionid}=data;
     //   window.alert(sentby+" "+questionid);
        $.post('../api/notification',{sentby:sentby,questionid:questionid,username:localStorage.getItem('username'),
          token:localStorage.getItem('token') 
           }).then(()=>{
               console.log("HIHIHIHIHIHIHIHIHIHIH");
               $('#notification').prepend(`
               <li id=${questionid} style="color:red">
                ${sentby} has sent an answer 
               </li>
               `)
           }).then(()=>{
               $("li").click((e)=>{
                   let id=e.target.id;
                   $.post('../api/notification/seen',{id:id,token:localStorage.getItem('token')})
                   .then(()=>{
                       localStorage.setItem('questionid',id);
                       window.location.replace('./doubtindetail.html');});
                   })
               })
           })
    $.get("../api/notification",{username:localStorage.getItem('username'),token:localStorage.getItem('token')})
     .then(notifications=>{
         notifications.map((singlenotificaiton)=>{
             if(singlenotificaiton.seen==0){
            $('#notification').prepend(`
            <li class="li" style="color:red" id=${singlenotificaiton.questionid}>
             ${singlenotificaiton.sentby} has sent an answer
            </li>
            `)}else{
                $('#notification').prepend(`
                <li class="li" style="color:white" id=${singlenotificaiton.questionid}>
                 ${singlenotificaiton.sentby} has sent an answer
                </li>
                `)  
            }
         })
     }).then(()=>{
        $(".li").click((e)=>{
            let id=e.target.id;
            $.post('../api/notification/seen',{id:id,token:localStorage.getItem('token')})
            .then(()=>{
                localStorage.setItem('questionid',id);
                window.location.replace('./doubtindetail.html');});
            })
        })
    let alldoubts=$('#alldoubts')
    $.get("../api/login",{username:localStorage.getItem('username'),token:localStorage.getItem('token')})
    .then(theuser=>{
       // window.alert(theuser.username)
        $.get("../api/question/allquestions",{year:theuser.year,token:localStorage.getItem('token')}).then(allquestions=>{
        allquestions.map((question)=>{
            {

              $.get("../api/login/withid",{id:question.userId,token:localStorage.getItem('token')})
              .then(author=>{
                alldoubts.prepend(
                    `<div class="card shadow p-3 mb-5  rounded border border-primary" style="width:80%;margin-bottom:2rem;margin-left:10%;
                    
                    ">
                    <div class="card-body">
                      <h5 class="card-title  text-center "  style="font-size:2rem; ">${question.topic}</h5>
                      <h6 class="card-subtitle mb-2 text-muted" >By ${author.username}</h6>
                      <p class="card-text" >${question.desc}</p>
                      <button type="button" class="btn btn-primary" id=${question.id}>Detail</button>
                    </div>
                    </div>`
                 )

              })
              .then(()=>{    $('.btn').click(
                function(e){
                let id=e.target.id;
                console.log("IHIHIHIH")
                localStorage.setItem('questionid',id);
               window.location.replace('./doubtindetail.html');
            });
        })
              
                
            }
        })
    })
   })

$('#logout').click(()=>{
    console.log("HI")
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    window.replace.href="./index.html"
})
}
)
