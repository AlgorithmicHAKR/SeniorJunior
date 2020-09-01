$(()=>{
    let id=localStorage.getItem('questionid')
    let year=localStorage.getItem('questionofthisyearstudent')
    
    $.get('../api/newquestionroute/aquestion',{id:id}).then(question=>{
        $('#topic').text=question.topic;
        $('#description').text=question.desc;
  })
    $('#answer').click(()=>{
           $.get('../api/answerroute',{questionid:id}).then((answers)=>{
            answers.map((answer)=>{
                $('#details').empty()
                $('#details').add( 
                     `<div class="card" style="width: 18rem;">
                <div class="card-body">
                 <p class="card-text">${answer.text}</p>
               </div>
             </div>`)
           })
        })
       
    })
    $('#discuss').click(()=>{
        $.get('../api/discussroute',{questionid:id}).then((discussions)=>{
         discussions.map((discussion)=>{
             $('#details').empty()
             $('#details').add( 
                  `<div class="card" style="width: 18rem;">
             <div class="card-body">
              <p class="card-text">${discussion.text}</p>
            </div>
          </div>`)
        })
     })
    
 })
})