const express = require('express')
const con = require('./config')

const app = express();
app.use(express.json());

app.get('/' , (req,resp)=>{
con.query("select * from users" ,(err, result)=>{
if(err){
    resp.status(400).json("Error fetching User details" , err)
}else{
    resp.send(result)
}
})
})

app.post('/adduser' , (req,resp)=>{
    if(!req.body){
        resp.send("Data not received")
        console.log(req.body)
    }
    else{
        const data ={
            id:req.body.id,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }
        con.query('INsert INTO users SET ? ' , data , (err, result , fields)=>{
        if(err){
            resp.status(400).json("Error adding user")
        }
        else{
            resp.send(result)
        }
        })
    }
})


app.put('/updateuser/:id' , (req,resp)=>{
if(!req.body || !req.params.id){
    resp.send("Error")
}
else{
    const data = [
       req.body.name,
        req.body.email,
       req.body.password,
        req.params.id
    ]

    con.query("UPDATE users SET name = ? , email = ? , password = ? where id = ? " , data , (err, result)=>{
   if(err){
    resp.status(400).json("Error updating data")
   }
   else{
    resp.send(result)
   }
    })
}
})

app.delete('/deleteuser/:id', (req,resp)=>{
if(!req.params.id){
    resp.send("Error")
}
else{
    con.query("DELETE FROM users where id =" + req.params.id , (err, result)=>{
     if(err){
        resp.status(400).json("Error deleting data")
     }else{
        resp.send(result)
     }
    })
}
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})