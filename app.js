const express = require("express");

const mysql=require("mysql");

const app = express();

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:'nodejs-login'
})

db.connect((error)=>{
if(error){
    console.log(error)
} else{
    console.log("Mysql connected....")
}
})

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.listen(5001, () => {
  console.log("Server started");
});
