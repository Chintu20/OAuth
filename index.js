const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keyconfig = require('./config/keys');
/*
message to Stephen:
I have removed the ClientID and ClientSecret from the keys.js file 

**It is just a sample application nothing is secret, just for practice I removed
 */

const PORT = process.env.port || 5050;
const app = express();

passport.use(
    new GoogleStrategy
    (
            {clientID:keyconfig.googleclientID,clientSecret:keyconfig.googleclientID,callbackURL: '/auth/google/callback'},
            (profile) => {console.log('profile : ', profile);}
    )
    );

app.get('/',(req,res)=>{res.send('<h1>Welcome to App</h1>');})
app.get('/auth/google',passport.authenticate('google',{ scope: ['profile'] }));
app.get('/auth/google/callback',(req,res)=>{res.send('Thanks for signing in...');});
app.listen(PORT);