const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const Books = require('../models/books');

function get_all_books(req,res){
    Books.find({}, (err,docs) =>{
        if(err) return res.json({error : err});
        const result = {
            count : docs.length,
            books : docs.map(doc => {
                return{
                    _id : doc._id,
                    title : doc.title,
                    pages : doc.pages,
                    author : doc.author
                }
            })
        }
        if(!err){
            res.status(200).json(result);
        }
        else{
            res.json({message : "no books found"});
            return
        }
    }) 
}

function get_one_book(req,res){
    const bookId = req.params.BookId;
    Books.findById(bookId, (err,doc) => {
        if(err) return res.json({error : err});
        try{
            const result = {
                title : doc.title,
                pages : doc.pages,
                author : doc.author
            }
            // console.log(doc)
            res.json({book : result});
        }
        catch(err){
            res.json({message: 'book not found'})
        }
    })
}

function create_book(req,res){
    const book = new Books({
        title : req.body.title,
        pages : req.body.pages,
        author : req.body.author
    })

    book.save()
    console.log(req.body);
    res.json({book : book});
}

function update_book(req,res){
    const bookId = req.params.BookId;
    Books.findById(bookId, (err,doc) => {
        if(err) return res.json({error : err});
        if(doc){
            doc.title = req.body.title
            doc.pages = req.body.pages
            doc.author = req.body.author
        }
        console.log(doc)
        doc.save()
        res.json({book : doc});
        })
    // res.json({message : 'Books are updated'});
}

function delete_book(req,res){
    const bookId = req.params.BookId;
    Books.findById(bookId, (err,doc) => {
        if(err) return res.json({error : err});
        if(doc){
            doc.remove()
            console.log(doc)
            res.json({message : 'deleted'})
        }
        else{
            res.json({message: 'book not found'})
        }
    })
}


module.exports.get_all_books = get_all_books;
module.exports.get_one_book = get_one_book;
module.exports.create_book = create_book;
module.exports.update_book = update_book;
module.exports.delete_book = delete_book;