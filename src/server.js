// var express = require('express')//import thư viện express vào
import express from "express";
import configVE from './configs/ViewEngine';
import initwebRouter from './route/web';
import flash from 'connect-flash';
import session from "express-session";
// import connection from './configs/connectsql';


require('dotenv').config();

var app = express()//tạo 1 biến sử dụng các tính năng express
var port = process.env.PORT;

app.use(express.json());
app.use(session({
  secret: 'SecretStringForSession',
  cookie: {maxAge: 60000},
  resave: true,
  saveUninitialized: true
}))
app.use(flash())
//set up view engine
configVE(app);
//init web route
initwebRouter(app);


app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})