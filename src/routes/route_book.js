const express = require('express');
const router = express.Router();

const booksRoute = require('../controllers/controller_book');

router.get('/', booksRoute.get_all_books);
router.get('/:BookId', booksRoute.get_one_book);
router.post('/', booksRoute.create_book);
router.put('/:BookId', booksRoute.update_book);
router.delete('/:BookId', booksRoute.delete_book);

module.exports = router;