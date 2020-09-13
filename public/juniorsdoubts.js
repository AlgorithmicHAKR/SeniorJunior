$(()=>{
  let alldoubts=$('#alldoubts');
    $.get('../api/login',{username:localStorage.getItem('username'),token:localStorage.getItem('token')}).then(user=>{
        for(let i=user.year+1;i<=2020;i++){
       //  window.alert(localStorage.getItem('token'))
            $.get("../api/question/allquestions",{year:i,token:localStorage.getItem('token')}).then(allquestions=>{
                allquestions.map((question)=>{
                  // window.alert(author.username);
                  if(question.likes-question.dislikes>=10){
                        $.get("../api/login/withid",{id:question.userId,token:localStorage.getItem('token')})
                        .then(author=>{
                          alldoubts.prepend(
                              `<div class="card shadow p-3 mb-5  rounded border border-primary" style="width:80%;margin-bottom:2rem;margin-left:10%;
                              ">
                              <div class="card-body">
                                <h5 class="card-title  text-center "  style="font-size:2rem; ">${question.topic}</h5>
                                <h6 class="card-subtitle mb-2 text-muted" >By ${author.username}</h6>
                                <p class="card-text" >${question.desc}</p>
                                <button type="button" class="btn btn-primary btn-sm" id=${question.id}>Detail</button>
                              </div>
                              </div>`
                            
                                              )
          
                        })
                        .then(()=>{    $('.btn').click(
                          function(e){
                          let id=e.target.id;
                          console.log("IHIHIHIH")
                          localStorage.setItem('questionid',id);
                         window.location.replace('http://localhost:4343/doubtindetail.html');
                      });
                  })
                        
                    }
                })
            })
            .then(()=>{    $('.button').click(
                function(e){
                let id=e.target.id;
            //    window.alert("HURRAh");
                localStorage.setItem('questionid',id);
                window.location.replace('http://localhost:4343/doubtindetail.html');});
        })
        }
       
    })
})