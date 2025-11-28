import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware configuration to utilize cookie-parser
app.use(cookieParser());

// Route /visit that handles GET requests
app.get('/visit', (req, res) => {
    // Check if the visitCount cookie exists
    let visitCount = req.cookies.visitCount;
    
    if (visitCount) {
        // If cookie exists, increment its value
        visitCount = parseInt(visitCount) + 1;
    } else {
        // If cookie doesn't exist, initialize it to 1
        visitCount = 1;
    }
    
    // Update the response to include the updated cookie
    res.cookie('visitCount', visitCount, {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true // Security: prevent client-side access
    });
    
    // Return message showing the visit count
    res.send(`This is your visit number ${visitCount}`);
});

// Root route for testing
app.get('/', (req, res) => {
    res.send('Visit Counter App - Go to /visit to track your visits!');
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Visit counter app running on port ${PORT}`);
    console.log('Visit http://localhost:3000/visit to test the counter');
});