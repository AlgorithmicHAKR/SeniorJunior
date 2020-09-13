$(()=>{
    $('#submit').click(()=>{
        let topic=$('#topic').val();
        let desc=$('#desc').val();
        let username=localStorage.getItem('username')
        let token=localStorage.getItem('username')
        console.log("##############"+topic+" "+token+" "+username);
        $.post('http://localhost:4343/api/question/newquestion',
        {topic:topic,desc:desc,username:username,token:token}).then(()=>window.location.replace('./home.html'));
    })
})