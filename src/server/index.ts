import express from 'express';
import { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Import required packages

// Create Express app instance
const app = express();

// Define port - use environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());                      // Enable CORS for all routes
app.use(json());                      // Parse JSON request bodies
app.use(urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(morgan('dev'));              // HTTP request logger

// Basic route
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


// Example API route
app.get('/api/status', (req, res) => {
    res.status(200).json({ 
        status: 'online',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Handle 404 routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;