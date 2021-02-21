$(()=>{
  if(localStorage.getItem('username')==undefined){
    window.location.replace("./blank.html")
}
    $.get('../api/question/questionsofoneuser',{username:localStorage.getItem('username'),token:localStorage.getItem('token')})
    // .then(allqs=>{ 
        // allqs.json()})
        .then(allqs=>{
            $('#allquestions').empty()
            
            allqs.map((question)=>{
            
            $('#allquestions').append( 
                 `<div class="card" style="width: 18rem;border-style:solid;">
            <div class="card-body">
            <p class="card-text">${question.topic}</p>
            <p class="card-text">HI</p>
            <p class="card-text">${question.desc}</p>
            <h6>${question.likes} likes</h6>
            <button class="button" id=${question.id}>Detail</button>
            </div>
         </div>`)
          })
         // return questions;
      
    }).then(()=>{    $('.button').click(
        function(e){
        let id=e.target.id;
      //  window.alert(id);
        localStorage.setItem('questionid',id);
        window.location.replace('./doubtindetail.html');});
})
})