require('dotenv').config();

const path = require('path');
const express = require('express');
const formRoutes = require('./routes/formRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parsers (multipart is handled by multer inside the routes)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static assets
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', formRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Central error handler (catches multer + controller errors)
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.message);
    const status = err.status || 500;
    res.status(status).json({
        ok: false,
        error: err.message || 'Internal Server Error'
    });
});

// Warn early if the bot is not configured
if (!process.env.BOT_TOKEN || !process.env.CHAT_ID) {
    console.warn('⚠️  BOT_TOKEN / CHAT_ID are not set in .env — Telegram delivery will fail.');
}

app.listen(PORT, () => {
    console.log(`✅ Student MIS server running at http://localhost:${PORT}`);
});
