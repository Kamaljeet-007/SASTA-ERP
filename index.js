

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve the index.html file when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Supabase configuration
const SUPABASE_URL = 'https://wrrwcfcicjckpcgqyqau.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndycndjZmNpY2pja3BjZ3F5cWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4MzE2MDYsImV4cCI6MjA0MjQwNzYwNn0.2U3ysbRwSIJOHE5DjagUkb0QFmCF3-0fIlgyckBrZio';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Endpoint for fetching all rows
app.post('/query', async (req, res) => {
    const { table } = req.body;
    try {
        const { data, error } = await supabase
            .from(table)
            .select('*'); // Fetch all rows

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while executing the query' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
