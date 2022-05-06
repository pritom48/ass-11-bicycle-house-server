const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

//MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server in runing like cycle!!')
})

app.listen(port, () => {
    console.log('curd in runing')
})