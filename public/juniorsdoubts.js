$(()=>{
    let alldoubts=$('#alldoubts');
    $.get('../api/user',{username:username}).then(user=>{
        if(user.year===2){
            //questionsroute me 1styearquestions, 2ndyearquestions,3rd and 4th yearquestions database hoga
            //its not necessary to create seperate routes  for everything
            //here we will send year in the query parameter to fetch that year's all questions
            //but we will display only those questions which have likes-dislikes>=10
                $.get("../api/allquestionsroute",{where:{year:[1]}}).then(allquestions=>{
                allquestions.map((question)=>{
                    if(question.likes-question.dislikes>=10){
                        alldoubts.add(
                            `<div class="card" style="width: 18rem;">
                         <div class="card-body">
                          <h5 class="card-title">${question.topic}</h5>
                          <p class="card-text">${question.desc}</p>
                          <button  type="button" onclick="gotodetails()">Details</button>
                          <a href="./doubtindetail" class="btn btn-primary">Detail</a>
                        </div>
                      </div>`)
                    }
                })
            })
        }else if(user.year=2){
            $.get("../api/questionsroute",{year:2}).then(secondyearquestions=>{
                secondyearquestions.map((question)=>{
                    if(question.likes-question.dislikes>=10){
                        alldoubts.add(
                            `<div class="card" style="width: 18rem;">
                         <div class="card-body">
                          <h5 class="card-title">${question.topic}</h5>
                          <p class="card-text">${question.desc}</p>
                          <button  type="button" onclick="gotodetails()">Details</button>
                        </div>
                      </div>`)
                    }
                })
            })
        }
        if(user.year>3){
            $.get("../api/questionsroute",{year:3}).then(thirdyearquestions=>{
                thirdyearquestions.map((question)=>{
                    if(question.likes-question.dislikes>=10){
                        alldoubts.add(
                            `<div class="card" style="width: 18rem;">
                         <div class="card-body">
                          <h5 class="card-title">${question.topic}</h5>
                          <p class="card-text">${question.desc}</p>
                          <button  type="button" onclick="gotodetails(${question})">Details</button>
                        </div>
                      </div>`)
                    }
                })
            })
        }
    })
    //still have doubt on how do I take the questionid to doubtindetail page 
    //because localstorage is I think not safe, the user can change the value in localstorage
    gotodetails=function(question){
        localStorage.setItem('questionid',question.id);
        localStorage.setItem('questionofthisyearstudent',question.year);
        window.location.replace("./doubtindetail.html");
    }
})