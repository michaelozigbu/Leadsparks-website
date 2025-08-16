# LeadSparks Landing Page

A bold, minimal landing page for LeadSparks - a SaaS product that helps discover active leads from Reddit and niche communities.

## Features

- **Bold, Minimal Design**: Dark background with light blue accent color
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth animations, hover effects, and form validation
- **Waitlist Collection**: Clean email capture form with validation
- **Modern Typography**: Uses Inter font for clean, professional appearance
- **Performance Optimized**: Lightweight and fast loading

## Sections

1. **Hero Section**: Large headline with gradient text effect
2. **Email Waitlist Form**: Clean input with call-to-action button
3. **Value Proposition**: Three-column layout with icons
4. **Social Proof**: Placeholder logos with hover effects
5. **Footer**: Privacy, contact, and social links

## Files Structure

```
├── index.html              # Main HTML structure
├── styles.css              # All styling and responsive design
├── script.js               # JavaScript functionality
├── server.js               # Node.js backend server
├── package.json            # Node.js dependencies
├── admin.html              # Admin dashboard
├── waitlist_emails.json    # Stored email addresses (auto-generated)
└── README.md               # This file
```

## Getting Started

### Option 1: Simple Static Site (No Backend)
1. **Open the landing page**: Simply open `index.html` in your web browser
2. **Local development**: Use a local server for best experience:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

### Option 2: Full Waitlist System (Recommended)
1. **Install Node.js** (if not already installed)
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the server**:
   ```bash
   npm start
   ```
4. **Access your sites**:
   - **Landing Page**: http://localhost:3000
   - **Admin Dashboard**: http://localhost:3000/admin.html
   - **API Endpoints**:
     - Submit email: POST http://localhost:3000/api/waitlist
     - View stats: GET http://localhost:3000/api/waitlist/stats
     - Download CSV: GET http://localhost:3000/api/waitlist/download

## Customization

### Colors
The main accent color is light blue (`#87ceeb`). To change it:

1. Open `styles.css`
2. Search for `#87ceeb` and replace with your desired color
3. Also update `#5f9ea0` (darker shade) accordingly

### Content
- **Hero Title**: Edit the `<h1>` tag in the hero section
- **Subtitle**: Modify the `<p>` tag with class `hero-subtitle`
- **Value Propositions**: Update the three `.value-card` elements
- **Social Proof**: Change the number and text in the social proof section

### Form Integration
The waitlist form is now fully functional with a Node.js backend:

1. **Emails are stored** in `waitlist_emails.json`
2. **Real-time validation** prevents duplicate emails
3. **Admin dashboard** at `/admin.html` shows stats and email list
4. **CSV export** available for email marketing tools
5. **Auto-updating social proof** numbers

### Admin Access
- **Dashboard**: http://localhost:3000/admin.html
- **View all emails** in real-time
- **Download CSV** for email marketing
- **Copy all emails** to clipboard
- **Auto-refresh** every 30 seconds

### Icons
The page uses Font Awesome icons. To change icons:
1. Visit [Font Awesome](https://fontawesome.com/icons)
2. Find your desired icon
3. Replace the `<i>` class names in the HTML

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- **File Size**: ~15KB total (minimal and fast)
- **Loading Time**: Optimized for quick loading
- **SEO Ready**: Proper meta tags and semantic HTML

## Deployment

### Static Hosting
Deploy to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

### Custom Domain
1. Purchase a domain
2. Configure DNS settings
3. Update hosting provider settings

## Analytics Integration

To track conversions, add your analytics code to the `submitWaitlist()` function:

```javascript
// Google Analytics
gtag('event', 'sign_up', {
  method: 'waitlist'
});

// Facebook Pixel
fbq('track', 'Lead');

// Custom tracking
console.log('New signup:', email);
```

## Support

For questions or customization help:
- Email: hello@leadsparks.com
- Twitter: @leadsparks
- Reddit: r/leadsparks

## License

This landing page is created for LeadSparks. Feel free to modify for your own use.

---

**LeadSparks** - Find hidden leads, faster. 🚀
