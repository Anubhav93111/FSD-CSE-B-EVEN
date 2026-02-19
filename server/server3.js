import http from 'http';
const port=5001;
const users =[{id:1,name:"ABC",email:"abc@gmail.com"},
    {id:2,name:"ABC1",email:"abc1@gmail.com"},
    
];
const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    if(url=='/' && req.method == "GET"){
        res.end("<h1>HomePage</h1>");
    }else if(url=='/users' && req.method == "GET"){
        res.end(JSON.stringify(users));
    } 
     
    else if(url.startsWith("/users/") && req.method == "GET"){
        const id = url.split('/')[2];
       const user = users.filter(u=>u.id==id);
       console.log("Data found", user);
       if(!user){
        res.statusCode=404;
        return res.end("User Not Found");
       }
        res.statusCode=200;
        res.end(JSON.stringify(user));
    } 
     else if(url=="/createusers" && req.method == "POST"){
        res.end("Create User");
    }  
    else if(url.startsWith("/users/") && req.method == "PUT"){
        res.end("Edit User");
    }  
    else if(url.startsWith("/users/") && req.method == "DELETE"){
        const id = url.split('/')[2];
        const userIndex = users.findIndex(u=>u.id==id)
        if(userIndex==-1){
            res.statusCode=400;
            return res.end(id,"User not found");
        }
        users.splice(userIndex,1);
        console.log(id,"User Deleted Successfuly");
        res.end("User Deleted Successfuly");
    } 
    else{
        res.statusCode=404;
        res.end("Error Page")
    }
})
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})