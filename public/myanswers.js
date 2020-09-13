$(()=>{
    $.get('http://localhost:4343/api/answer/allanswers',{username:localStorage.getItem('username')})
    .then(allans=>allans.json()).then(allans=>{
        allans.map((answer)=>{
            $('#allanswers').empty()
            $('#allanswers').add( 
                 `<div class="card" style="width: 18rem;border-style:solid;">
            <div class="card-body">
            <p class="card-text">${answer.text}</p>
            <h6>${answer.likes} likes</h6>
            <img src="./likeincon.png" onclick=increaselike(${answer})>  
            </div>
         </div>`)
       })
    })

})