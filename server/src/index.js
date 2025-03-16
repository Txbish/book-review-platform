import express from 'express';
import { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';


const app = express();

const PORT = process.env.PORT || 3000;

// 
app.use(cors());                     
app.use(json());                      
app.use(urlencoded({ extended: true })); 
app.use(morgan('dev'));              

let Books = [
    { 
        title: "The Alchemist", 
        author: "Paulo Coelho", 
        description: "A philosophical book about following your dreams.",
        reviews: [
            { rating: 4.5, comment: "Inspirational and thought-provoking." },
            { rating: 4.0, comment: "A great read with deep insights." }
        ]
    },
    { 
        title: "The Monk Who Sold His Ferrari", 
        author: "Robin Sharma", 
        description: "A fable about achieving your dreams and fulfilling your destiny.",
        reviews: [
            { rating: 4.7, comment: "Life-changing and motivational." },
            { rating: 4.5, comment: "A must-read for personal growth." }
        ]
    },
    { 
        title: "The Power of Now", 
        author: "Eckhart Tolle", 
        description: "A guide to spiritual enlightenment and living in the present moment.",
        reviews: [
            { rating: 4.6, comment: "Profound and transformative." },
            { rating: 4.8, comment: "A book that changes your perspective on life." }
        ]
    }
];

app.get('/', (req, res) => {
        res.status(200).json({Books});
});
app.post('/book/:id/review', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const { rating, comment } = req.body;

    if (isNaN(rating) || rating < 1 || rating > 5 || !comment || typeof comment !== 'string') {
        return res.status(400).json({ error: 'Invalid review data' });
    }

    if (bookId >= 0 && bookId < Books.length) {
        const newReview = { rating, comment };
        Books[bookId].reviews.push(newReview);
        res.status(201).json(Books[bookId]); // Respond with the updated book
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

app.get('/book/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    if (bookId >= 0 && bookId < Books.length) {
        res.status(200).json(Books[bookId]);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
