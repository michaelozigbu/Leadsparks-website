const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Store emails in a JSON file
const EMAILS_FILE = 'waitlist_emails.json';

// Initialize emails file if it doesn't exist
if (!fs.existsSync(EMAILS_FILE)) {
    fs.writeFileSync(EMAILS_FILE, JSON.stringify([], null, 2));
}

// Load existing emails
function loadEmails() {
    try {
        const data = fs.readFileSync(EMAILS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Save emails
function saveEmails(emails) {
    fs.writeFileSync(EMAILS_FILE, JSON.stringify(emails, null, 2));
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Waitlist submission endpoint
app.post('/api/waitlist', (req, res) => {
    const { email } = req.body;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please enter a valid email address' 
        });
    }
    
    try {
        const emails = loadEmails();
        
        // Check if email already exists
        if (emails.includes(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'This email is already on the waitlist!' 
            });
        }
        
        // Add email to waitlist
        emails.push(email);
        saveEmails(emails);
        
        console.log(`New waitlist signup: ${email}`);
        console.log(`Total waitlist size: ${emails.length}`);
        
        res.json({ 
            success: true, 
            message: 'Welcome to the waitlist! We\'ll notify you when we launch.',
            totalSubscribers: emails.length
        });
        
    } catch (error) {
        console.error('Error saving email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Something went wrong. Please try again.' 
        });
    }
});

// Get waitlist stats (for admin purposes)
app.get('/api/waitlist/stats', (req, res) => {
    try {
        const emails = loadEmails();
        res.json({ 
            totalSubscribers: emails.length,
            emails: emails // Be careful with this in production
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load stats' });
    }
});

// Download waitlist as CSV
app.get('/api/waitlist/download', (req, res) => {
    try {
        const emails = loadEmails();
        const csvContent = 'Email\n' + emails.join('\n');
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=waitlist.csv');
        res.send(csvContent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to download waitlist' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 LeadSparks server running on http://localhost:${PORT}`);
    console.log(`📧 Waitlist endpoint: http://localhost:${PORT}/api/waitlist`);
    console.log(`📊 Stats endpoint: http://localhost:${PORT}/api/waitlist/stats`);
    console.log(`📥 Download endpoint: http://localhost:${PORT}/api/waitlist/download`);
});
