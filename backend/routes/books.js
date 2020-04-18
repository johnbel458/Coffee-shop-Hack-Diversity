const router = require('express').Router();
let Books = require('../models/books.model')

router.route('/').get((req, res) => {
    Books.find()
        .then(books => res.json(books))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {

    const isbn = req.body.isbn;
    const title = req.body.title;
    const author = req.body.author;
    const publication_year = Number(req.body.publication_year);
    const publisher = req.body.publisher;
    const image_url_s = req.body.image_url_s;
    const image_url_m = req.body.image_url_m;
    const image_url_l = req.body.image_url_l;
    const copies = Number(req.body.copies);
    const available = Number(req.body.available);

    const newBook = new Books({
        isbn,
        title,
        author,
        publication_year,
        publisher,
        image_url_s,
        image_url_m,
        image_url_l,
        copies,
        available,
    });

    newBook.save()
        .then(() => res.json('Book added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').get((req, res) => {
    Books.findById(req.params.id)
        .then(books => res.json(books))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Books.findById(req.params.id)
        .then(book => {
            book.isbn = req.body.isbn;
            book.title = req.body.title;
            book.author = req.body.author;
            book.publication_year = Number(req.body.publication_year);
            book.publisher = req.body.publisher;
            book.image_url_s = req.body.image_url_s;
            book.image_url_m = req.body.image_url_m;
            book.image_url_l = req.body.image_url_l;
            book.copies = Number(req.body.copies);
            book.available = Number(req.body.available);

            book.save()
                .then(() => res.json('Book updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 