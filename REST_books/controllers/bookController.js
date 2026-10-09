const Book = require("../models/Book");

const createBook = async (req, res) => {
    try {
        const {title, author, price} = req.body;

        // Check missing fields
        if (title === undefined, 
            author === undefined,
            price === undefined
        ) {
            return res.status(400).json({
                error: "Title, author and price are required"
            });
        }

        // Check price 
        if (price <= 0){
            return res.status(400).json({
                error: "Price must be greater than 0"
            });
        }

        const book = await Book.create({
            title: title,
            author: author,
            price: price
        });

        return res.status(201).json(book);

    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

const getBooks = async (req, res) => {
    try {
        const books = await Book.findAll();

        return res.status(200).json(books);

    } catch (error){
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

//export statement 
module.exports = {createBook, getBooks};