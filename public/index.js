$(()=>{
 
  if(localStorage.getItem('username')!=undefined) localStorage.removeItem('username')
  if(localStorage.getItem('token')!=undefined) localStorage.removeItem('token')
   $("#submit").click(()=>{
    let username=$('#username').val()
    let password=$("#password").val()
      console.log(username+" "+password);
       $.post('../api/login/login',{ username:username,password:password}).
     //   then(token=>token.text).
       then(token=>{
           if(token){
           localStorage.setItem('username',username)
           localStorage.setItem('token',token)
         window.location.replace('./home.html'); 
         }else{
           window.alert("username or password did not match")
         }
    })
   })
})