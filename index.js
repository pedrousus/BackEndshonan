const express = require('express');
const mysql = require('mysql2');
const mycoon = require('express-myconnection');
const cors= require('cors')
const path=require('path')
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express()

app.use(cors())

// app.use(express.static(path.join(__dirname,'dbimages')))

app.use(express.static(path.join(__dirname,'/public')))

app.use(bodyParser.json());

const dbOptions = {
    host:'shonandeb',
    user: 'root',
    password: '1234',
    database: 'shonan',
    port:3306
};

app.use(mycoon(mysql, dbOptions, 'single'));

const connection = mysql.createConnection(dbOptions);
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err.stack);
        return;
    }
    console.log('Connected to database with ID: ', connection.threadId);
});



app.use(require('./routes/routes'))

app.use(require('./routes/routes2'))

app.use(require('./routes/routes3'))


const PORT = 5000;

app.listen(PORT,()=>{
    console.log("jalo", PORT)
})