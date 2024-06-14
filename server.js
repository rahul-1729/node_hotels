const express = require('express');
const app = express();
const db = require('./db'); 
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const logRequest = (req,res,next)=>{
    console.log(`${new Date().toLocaleString()} request made to : ${req.originalUrl} `);
    next();
}
app.use(logRequest)

passport.use(new LocalStrategy(async(USERNAME,password,done)=>{

    try{
          console.log('Received credentials:',USERNAME,password);
          const user = await Person.findOne({username: USERNAME});
          if(!user)
          {
              return done(null,false,{message: 'incorrect username'})
          }
          const isPasswordMatch = user.password == password ? true:false;
          if(isPasswordMatch){
            return done(null,user);
          }
          else
          {
            return done(null,false,{message: 'incorrect password'})
          }
    }
    catch(err)
    {
         return done(err);
    }
}))
passport.use(passport.initialize());

app.get('/',passport.authenticate('local',{session:false}), (req, res) => {
    res.send('Welcome to my home');
});






const personRoutes = require('./routes/personRoutes');
app.use('/person',logRequest,personRoutes)

const MenuItem=require('./routes/menuRoutes');
app.use('/menu',logRequest,MenuItem)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
