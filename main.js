const express = require('express');
const app = express();
const Joi = require('joi');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc'); //this worked after downgrading swagger-jsdoc to version 6.0.0
const swaggerUI = require('swagger-ui-express');


const bookRoute = require('./src/routes/route_book');

const db = mongoose.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true }, { useNewUrlParser: true });
db.then(() => {
    console.log('Connected to Database !!!!');
}).catch(err => console.log(err));

app.use(bodyParser.json());
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition : {
        info : {
            title : 'Book Library API',
            version : '1.0.0'
        }
    },
    apis : ['main.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /books:
 *   get: 
 *     description : get all books
 *     responses : 
 *       200 : 
 *         description : Success
 */

/**
 * @swagger
 * /books:
 *   post: 
 *     description : create a book
 *     parameters : 
 *     - name : title
 *       description : title of book
 *       in : formData
 *       type : string
 *     - name : pages
 *       description : pages in book
 *       in : formData
 *       type : number
 *     - name : author
 *       description : name of author of the book
 *       in : formData
 *       type : string
 *     responses : 
 *       201 : 
 *         description : Created
 */

app.use('/books', bookRoute);


app.listen(3000, () => {
    console.log('Listening on port 3000...');
})