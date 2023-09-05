const express = require("express");
const path=require('path');

const mysql=require("mysql");

const dotenv=require("dotenv")
dotenv.config({
path:'./configs.env'
})
const app = express();

const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});
const publicDirectory = path.join(__dirname,'./public');//current directory

app.use(express.static(publicDirectory))
app.set('view engine','hbs'); //view engine for html

//grab the date from html pages
app.use(express.urlencoded({extended:false}));

//parse JSON bodies as sent by API clients
app.use(express.json());

db.connect((error)=>{
if(error){
    console.log(error)
} else{
    console.log("Mysql connected....")
}
})


app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));


// app.get("/", (req, res) => {
//   //res.send("<h1>Home Page</h1>");
//   res.render('index');
// });
// app.get("/register", (req, res) => {
//     //res.send("<h1>Home Page</h1>");
//     res.render('register');
//   });

app.listen(5001, () => {
  console.log("Server started");
});
