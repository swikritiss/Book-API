const mongoose = require('mongoose');
const express = require('express');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title : String,
    pages : Number,
    author : String
})

const Book = mongoose.model('books', bookSchema);
module.exports = Book;