const express = require('express');
const app = express();
const mainPageRoutes = require('./routes/homepage');
const dataRouter = require('./routes/data')
const PORT = 3000;

require('dotenv').config({path: './config/.env'});

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', mainPageRoutes);
app.use('/data', dataRouter);

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Running on port ${process.env.PORT}`)
})

