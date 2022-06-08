const express = require('express');
require('dotenv').config({path:'./config/.env'});
const { dbConnection } = require('./config/dbConn');
const app = express();
app.use(express.json());
app.use('/api/users/',require('./api/user.route'));
app.use('/api/notes',require('./api/note.route'));
app.get('*',(req,res)=>{
    res.send('404 not found');
})
dbConnection();
app.listen(process.env.PORT,()=>{
    console.log(`server is running`);
});