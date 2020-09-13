$(()=>{
   // import io from 'socket.io-client';
   let socket=io()
    let id=localStorage.getItem('questionid')
  //  let year=localStorage.getItem('questionofthisyearstudent')
    let userId=null;
    let usernaame=null;
    let personidwhowrotethepost;
    let topic;
    let answerlikeid=undefined;
   // window.alert(id) 
    $.get('../api/question/aquestion',{id:id,token:localStorage.getItem('token')})
   //  .then(q=>q.json())
    .then(question=>{
    //   window.alert('we reached here') 
    personidwhowrotethepost=question.userId;
    topic=question.topic;
      $('#topic').text(question.topic);
        $('#description').text(question.desc);
        $("#likes").text(question.likes);
        $("#dislikes").text(question.dislikes);
        $("#likebutton").click(()=>{
         $.get('../api/login/',{username:localStorage.getItem('username'),token:localStorage.getItem('token')})
         .then((user)=>{
          // window.alert(user.username);  
          usernaame=user.username;
            userId=user.id;
           $.post('../api/question/alike',{id:id,userId:user.id,token:localStorage.getItem('token')})
           .then((ap)=>
           {
              if(ap[0].yes===0){
             question.likes+=1;
            $("#likes").text(question.likes);
              }else{
                 window.alert("you have already voted for this post")
              }
            // $.get('../api/question/aquestion',{id:id,token:localStorage.getItem('token')})
            // //  .then(q=>q.json())
            //  .then(question=>{
            //     $("#likes").text(question.likes+" likes");
            //    }
            // )
        })})})
        $("#dislikebutton").click(()=>{
           console.log(answerlikeid)
         $.post('../api/question/adislike',{id:id,token:localStorage.getItem('token')})
         .then(()=>
         {
           question.dislikes+=1;
          $("#dislikes").text(question.dislikes);
        
         })
      })
       
        $.get('../api/login/',{username:localStorage.getItem('username'),token:localStorage.getItem('token')})
        .then((user)=>{
         // window.alert(user.username);  
         usernaame=user.username;

           userId=user.id;
           if(user.year>=question.year){
              $('#answerbox').hide();
              $('#send').hide();
              $('#send1').hide();
            }else{
               $("#answerbox").show();
               $("#send").show();
               $('#send').show();
       
//     $('#discuss').click(()=>{
//         $.get('../api/discussroute',{questionid:id}).thenthen((discussions)=>{
//          discussions.map((discussion)=>{
//              $('#details').empty()
//              $('#details').add( 
//                   `<div class="card" style="width: 18rem;">
//              <div class="card-body">
//               <p class="card-text">${discussion.text}</p>
//             </div>
//           </div>`)
//         })
//      })
    
//  })
}  }     )})
             $.get('../api/answer/allanswersofaquestion',{id:id,token:localStorage.getItem('token')})
             // .then(ans=>ans.json())
             .then((answers)=>{
                $('#allanswersarea').empty()
                
                answers.map((answer)=>{
                   // window.alert(answer.topic)
                  $('#allanswersarea').prepend( 
                       `<div class="card rounded border border-primary shadow p-3 mb-5 bg-white rounded" style="margin-left:222%;width:38rem;margin:0 auto;margin-top:2%">
                  <div class="card-body">
                  <p class="card-text">Answer wrote by ${answer.username}</p>
                  <p class="card-text">${answer.topic}</p>
                  <h6>${answer.likes} likes</h6>

                  <button id=${answer.id} class="like btn btn-outline-light">
                  <img src="./likeicon.png" style="width:1rem">
                  </img>
                  </button>
                  <button id=${answer.id} class="dislike btn btn-outline-light" style="margin-left:0rem"> 
                  <img src="./dislikeicon.jpg" style="width:1rem"></button>
                  </div>
                  </div>`)
                })})
                  .then(()=>{
                $('.like').click((e)=>{
                   answerlikeid=$('.like');
                  // window.alert("show up")
                  let id1=e.target.id;
                  // console.log("HHIHIHIH")
                  // window.alert(id1+" ");
                  $.get('../api/likesforanswer',{answerId:id1,username:localStorage.getItem('username')}).
                  then(alreadyliked=>{
                     if(alreadyliked.value===1){
                        window.alert("You cannot vote twice")
                     }else{
                        
                        $.post('../api/likesforanswer',{val:1,answerId:id1,username:localStorage.getItem('username')})
                        .then(()=>{
                           $.get('../api/answer/allanswersofaquestion',{id:id,token:localStorage.getItem('token')})
                           // .then(ans=>ans.json())
                           .then((answers)=>{
                              $('#allanswersarea').empty()
                              
                              answers.map((answer)=>{
                                 // window.alert(answer.topic)
                                $('#allanswersarea').prepend(  
                                     `<div class="card shadow-lg p-3 mb-5 bg-white rounded" style="margin-left:222%;width:38rem;border-style:solid;margin:0 auto;margin-top:2%">
                                <div class="card-body">
                                <p class="card-text">Answer wrote by ${answer.username}</p>
                                <p class="card-text">${answer.topic}</p>
                                <h6>${answer.likes} likes</h6>
                                <button id=${answer.id} class="like">like</button>
                                <h6>${answer.dislikes} likes</h6>
                                <button id=${answer.id} class="dislike">dislike</button>
                                </div>
                             </div>`)
                           })
                               
                        })
                        })
                  }} 
                      )
                     
                     
                  })
                  $('.dislike').click((e)=>{
                     let id1=e.target.id;  window.alert(id1+" ");
                     $.get('../api/likesforanswer',{answerId:id1,username:localStorage.getItem('username')}).
                     then(alreadyliked=>{
                        if(alreadyliked==1){
                           Window.alert("You cannot vote twice")
                        }else{
                           $.post('../api/likesforanswer',{val:-1,answerId:id1,username:localStorage.getItem('username')})
                           .then(()=>{
                              $(`h6#${id1}`).text('')
                              $.get('../api/answer/allanswersofaquestion',{id:id,token:localStorage.getItem('token')})
                              // .then(ans=>ans.json())
                              .then((answers)=>{
                                 $('#allanswersarea').empty()
                                 
                                 answers.map((answer)=>{
                                   window.alert(answer.topic)
                                   $('#allanswersarea').prepend( 
                                        `<div class="card" style="margin-left:222%;width:38rem;border-style:solid;margin:0 auto;margin-top:2%">
                                   <div class="card-body">
                                   <p class="card-text">Answer wrote by ${answer.username}</p>
                                   <p class="card-text">${answer.topic}</p>
                                   <h6 id=${answer.id}>${answer.likes} likes</h6>
                                   <button id=${answer.id} class="like">like</button>
                                   <h6>${answer.dislikes} likes</h6>
                                   <button id=${answer.id} class="dislike">dislike</button>
                                   </div>
                                </div>`)
                              })
                                  
                           })
                           })
                     }} 
                         )
                          
                     })
             })
    
            
             $('#send').click(()=>{
               $.post('../api/answer/',{username:usernaame,userId:userId,id:id,sentby:localStorage.getItem('username'),topic:$('#answerbox').val(),token:localStorage.getItem('token')})
               .then(()=>{
                $.get('../api/answer/allanswersofaquestion',{id:id,token:localStorage.getItem('token')})
                // .then(ans=>ans.json())
                .then((answers)=>{
                   $('#allanswersarea').empty()
                answers.map((answer)=>{
                 $('#allanswersarea').prepend( 
                    `<div class="card rounded border border-primary shadow p-3 mb-5 bg-white rounded" style="margin-left:222%;width:38rem;margin:0 auto;margin-top:2%">
               <div class="card-body">
               <p class="card-text">Answer wrote by ${answer.username}</p>
               <p class="card-text">${answer.topic}</p>
               <h6>${answer.likes} likes</h6>

               <button id=${answer.id} class="like btn btn-outline-light">
               <img src="./likeicon.png" style="width:1rem">
               </img>
               </button>
               <button id=${answer.id} class="dislike btn btn-outline-light" style="margin-left:0rem"> 
               <img src="./dislikeicon.jpg" style="width:1rem"></button>
               </div>
               </div>`)
                })
               })
           })
            
         .then(()=>{
            
            $.get('../api/login/withid',{id:personidwhowrotethepost,token:localStorage.getItem('token')})
            .then(theuserwhowrotethepost=>{
              socket.emit('message',{
                 sentby:usernaame,
                 touser:theuserwhowrotethepost.username,
              questionid:id,
           })  
           })

            
            //********************************************************************** */
            {
               answerlikeid.click(()=>{
                  
                  let id1=e.target.id;
                  // console.log("HHIHIHIH")
                  // window.alert(id1+" ");
                  $.get('../api/likesforanswer',{answerId:id1,username:localStorage.getItem('username')}).
                  then(alreadyliked=>{
                     if(alreadyliked.value===1){
                        window.alert("You cannot vote twice")
                       }else{
                          $.post('../api/likesforanswer',{val:1,answerId:id1,username:localStorage.getItem('username')})
                          .then(()=>{

                          })}})})}})

              
              // window.alert("HI")
             // window.alert(usernaame); 
          
                     })
                  })