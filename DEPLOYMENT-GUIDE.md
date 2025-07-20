# 🚀 Aura Deployment Guide

> **Simple 3-step deployment guide for Aura's core features**

## What You're Deploying

**3 Core Features:**
1. **Brand Styling** - CSS files with brand colors
2. **Interactive Elements** - JavaScript for hover effects  
3. **Hello World Banner** - Basic demonstration

---

## Step 1: Upload Files

Upload these 4 files to your server/CDN while keeping the folder structure:

```
your-domain.com/v1/css/enhancement.css
your-domain.com/v1/css/core/brand.css
your-domain.com/v1/js/enhancement.js
your-domain.com/v1/js/core/ingenuity.js
```

**Test the files work:** Visit `https://your-domain.com/v1/css/enhancement.css` in your browser - you should see CSS code.

---

## Step 2: Add Code to Your Site

### Add to `<head>` section:
```html
<link rel="stylesheet" href="https://your-domain.com/v1/css/enhancement.css">
<script>
window.AuraConfig = {
  cdnBase: 'https://your-domain.com/v1'
};
</script>
```

### Add before `</body>`:
```html
<script src="https://your-domain.com/v1/js/core/ingenuity.js"></script>
<script src="https://your-domain.com/v1/js/enhancement.js"></script>
```

---

## Step 3: Verify It Works

Visit your website and check:

- [ ] **Brand colors** appear on buttons and headers
- [ ] **Hover effects** work when you mouse over elements
- [ ] **"Hello World" banner** shows up (if enabled)
- [ ] **Browser console** shows: `🚀 INGENUITY ENH Enhancement system initialized successfully`

---

## Platform Integration Example (Super.so)

**Super.so users:** Add the code in these sections:
- Head injection: Add the `<head>` code
- CSS injection: Leave blank 
- Body injection: Add the `</body>` code

---

## Emergency Rollback

If something breaks:
1. Remove the code you added in Step 2
2. Save/publish your changes
3. Your site returns to normal

---

---

## Need Help?

- Files not loading? Check your file URLs in a browser
- Nothing happening? Check browser console for error messages
- Still stuck? Remove all code and try again

*Replace `your-domain.com` with your actual domain/CDN URL*