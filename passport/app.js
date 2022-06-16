const express = require=("express");
const app =express();
const passport =require("passport")
const LocalStrategy = require("passport-local").Strategy;
const bodyParser=require("body-parser")

const session = require("express-session");
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

passport.use(new LocalStrategy(
    {
        // フィールドがusername passport以外の場合
        usernameField:'login-id',
        passwordField:'password',
        session:false,
    },
    (username, password,done)=>{
        // 検証用コールバック
        if(username !== User1.username){

        }
    }
))