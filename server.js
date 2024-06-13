const express = require('express');
const app = express();
const db = require('./db'); 

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const logRequest = (req,res,next)=>{
    console.log(`${new Date().toLocaleString()} request made to : ${req.originalUrl} `);
    next();
}
app.use(logRequest)
app.get('/', (req, res) => {
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
