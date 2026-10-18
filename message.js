const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory counter (use a database like MongoDB or PostgreSQL for persistence in production)
let messageCount = 0;

/**
 * POST /api/messages
 * Simulates sending a message and increments the count
 */
app.post('/api/messages', (req, res) => {
    const { message } = req.body;
    
    // Optional validation
    if (!message) {
        return res.status(400).json({ error: 'Message content is required.' });
    }

    messageCount++;
    
    res.status(201).json({
        success: true,
        message: 'Message sent successfully!',
        totalSent: messageCount
    });
});

/**
 * GET /api/messages/count
 * Returns the current count of messages sent
 */
app.get('/api/messages/count', (req, res) => {
    res.json({
        totalSent: messageCount
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});