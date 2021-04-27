const express = require('express');
const app = express();
const Joi = require('joi');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const bookRoute = require('./src/routes/route_book');

const db = mongoose.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true }, { useNewUrlParser: true });
db.then(() => {
    console.log('Connected to Database !!!!');
}).catch(err => console.log(err));

app.use(bodyParser.json());
app.use(express.json());

app.use('/books', bookRoute);


app.listen(3000, () => {
    console.log('Listening on port 3000...');
})