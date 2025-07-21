# 🌟 Aura v3.0.0

> **Simple aura.css and aura.js that can be imported to enhance your site**

A lightweight, easy-to-use web enhancement library from The Ingenuity Co. Aura provides brand colors, styling utilities, and interactive elements with a clean, simple architecture that works on any website.

[![Version](https://img.shields.io/badge/version-3.0.0-orange.svg)](#version-history)
[![CDN Ready](https://img.shields.io/badge/CDN-ready-green.svg)](#quick-start)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](#license)

## ✨ What's New in v3.0.0

🎯 **Simplified Architecture** - Clean root-level files replace complex directory structures  
🚀 **Easy Import** - Just two files: [`aura.css`](./aura.css) and [`aura.js`](./aura.js)  
🔧 **Unified Testing** - Single [`test-runner.js`](./test-runner.js) for all testing needs  
🎨 **Enhanced Brand System** - Complete CSS variable system for The Ingenuity Co brand  
🏗️ **Smart Platform Detection** - Automatic Next.js/Super.so detection and optimization  

## 📁 Project Structure

```
aura/
├── aura.css          # Complete brand color system and CSS utilities
├── aura.js           # Core enhancement library with simple API
├── test-runner.js    # Unified test runner for any domain
├── package.json      # npm scripts and dependencies
└── archive/          # Legacy v1/ files (archived)
```

**That's it!** No complex directories, no confusing file paths. Just clean, simple files.

## 🚀 Quick Start

### Option 1: CDN (Recommended)

```html
<!-- Add to <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css">

<!-- Add before closing </body> -->
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"></script>
```

### Option 2: Download and Host

1. Download [`aura.css`](./aura.css) and [`aura.js`](./aura.js)
2. Upload to your website
3. Include in your HTML:

```html
<!-- Add to <head> -->
<link rel="stylesheet" href="./aura.css">

<!-- Add before closing </body> -->
<script src="./aura.js"></script>
```

**Done!** Aura will automatically initialize and enhance your site.

## 🎨 Brand Color System

Aura includes The Ingenuity Co's complete brand palette as CSS variables:

### Primary Colors
```css
:root {
    --aura-primary: #A8D5E5;           /* Soft Sky Blue */
    --aura-secondary: #D4C5E8;         /* Gentle Lavender */
    --aura-accent: #B8E6D3;            /* Mint Green */
    --aura-neutral: #8B9DC3;           /* Muted Blue-Gray */
}
```

### Usage Examples
```css
.my-button {
    background-color: var(--aura-primary);
    color: var(--aura-white);
    border-radius: var(--aura-radius-md);
    transition: var(--aura-transition-fast);
}

.my-container {
    background: var(--aura-gradient-primary);
    padding: var(--aura-spacing-lg);
    box-shadow: var(--aura-shadow-subtle);
}
```

### Utility Classes
```html
<div class="aura-bg-primary aura-text-white">Primary background</div>
<div class="aura-gradient-secondary">Gradient background</div>
<button class="aura-bg-accent">Accent button</button>
```

## 🔧 JavaScript API

Aura provides a simple, powerful JavaScript API:

### Basic Usage
```javascript
// Auto-initializes on page load, or manually:
window.Aura.init();

// Available methods:
window.Aura.reinject();              // Re-inject CSS (useful for SPAs)
window.Aura.injectJS('v1/js/...');   // Inject additional JS files
window.Aura.isNextJS();              // Detect Next.js/Super.so platforms
```

### Platform Detection
```javascript
if (window.Aura.isNextJS()) {
    console.log('Running on Next.js/Super.so platform');
    // Automatic route change detection enabled
}
```

### Advanced Usage
```javascript
// Disable auto-initialization
window.AuraNoAutoInit = true;

// Manual setup with custom configuration
window.Aura.init();
```

## 🏗️ Platform Support

Aura automatically detects and optimizes for:

- **Next.js** - Route change detection, SPA compatibility
- **Super.so** - Automatic domain detection and optimization
- **Static Sites** - Works on any HTML/CSS/JS website
- **WordPress, Squarespace, Webflow** - Copy/paste integration

### Super.so Integration

```html
<!-- In Super.so Custom Code → Header -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css">

<!-- In Super.so Custom Code → Footer -->
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"></script>
```

## 🧪 Testing & Development

Aura includes a unified test runner that can test on any domain:

### NPM Scripts

```bash
npm run demo          # Interactive testing with browser
npm run test          # Automated testing with reports
npm run test:headless # Headless automated testing
```

### Test Runner Features

- **Interactive Mode** - Keep browser open for manual testing
- **Automated Mode** - Run tests and generate reports
- **Screenshot Capture** - Automatic screenshots with timestamps
- **Domain Testing** - Tests on theingenuity.co by default
- **Console Commands** - `status`, `reinject`, `screenshot`, `test`

### Interactive Commands

```bash
🔮 Aura> status        # Show version and platform info
🔮 Aura> reinject      # Manual CSS reinjection
🔮 Aura> screenshot    # Take screenshot
🔮 Aura> test          # Run functionality tests
🔮 Aura> help          # Show all commands
```

### Custom Domain Testing

Edit [`test-runner.js`](./test-runner.js) to test on your domain:

```javascript
const CONFIG = {
    website: 'https://your-domain.com',  // Change this
    // ... rest of config
};
```

## 📝 Implementation Examples

### Basic Website
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Site with Aura</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css">
</head>
<body>
    <div class="aura-bg-light" style="padding: var(--aura-spacing-xl)">
        <h1 class="aura-text-primary">Welcome to My Site</h1>
        <button class="aura-bg-primary" style="padding: var(--aura-spacing-md); border: none; border-radius: var(--aura-radius-md); color: white;">
            Get Started
        </button>
    </div>
    
    <script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"></script>
</body>
</html>
```

### React/Next.js
```jsx
// pages/_document.js or app/layout.js
import Head from 'next/head'

export default function MyApp() {
  return (
    <div>
      <Head>
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css" 
        />
        <script 
          src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"
          async
        />
      </Head>
      <main className="aura-bg-light">
        {/* Your content */}
      </main>
    </div>
  )
}
```

## 🔄 Migration from v1.x

### What Changed in v3.0.0

- **✅ Simplified Structure** - `v1/css/core/aura.css` → `aura.css`
- **✅ Simplified Structure** - `v1/js/core/aura.js` → `aura.js`  
- **✅ Unified Testing** - Multiple runners → single `test-runner.js`
- **✅ Enhanced API** - More methods and better platform detection
- **✅ Legacy Support** - Old files moved to `archive/` directory

### Migration Steps

1. **Update imports:**
   ```html
   <!-- Old v1.x -->
   <link href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/v1/css/core/aura.css">
   <script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/v1/js/core/aura.js"></script>
   
   <!-- New v3.0.0 -->
   <link href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css">
   <script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"></script>
   ```

2. **Update configuration:**
   ```javascript
   // Old v1.x config (remove)
   window.AuraConfig = {
     version: 'v1',
     cdnBase: '...',
     features: {...}
   };
   
   // New v3.0.0 (automatic, no config needed!)
   // Just use: window.Aura.init()
   ```

3. **Test your integration:**
   ```bash
   npm run demo  # Test interactively
   npm run test  # Run automated tests
   ```

### Backward Compatibility

v3.0.0 maintains API compatibility where possible. Legacy files are preserved in the [`archive/`](./archive/) directory for reference.

## 🎯 Use Cases

### Content Creators
- **Super.so Sites** - Add to Custom Code for instant brand styling
- **Blog Posts** - Use color classes for highlights and callouts
- **Landing Pages** - Apply brand gradients and spacing

### Developers  
- **Rapid Prototyping** - Instant brand-consistent styling
- **Client Projects** - Professional color palette out-of-the-box
- **Design Systems** - Foundation for larger design systems

### Designers
- **Brand Consistency** - Ensure proper color usage across domains
- **Accessibility** - Built-in high contrast and reduced motion support
- **Responsive Design** - Mobile-first utilities and spacing

## 🔍 Troubleshooting

### Files Not Loading
```bash
# Test CDN availability
curl -I https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css
curl -I https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js
```

### Styles Not Applying
```javascript
// Check if Aura loaded
console.log('Aura loaded:', !!window.Aura);
console.log('Aura version:', window.Aura?.version);

// Check CSS injection
console.log('CSS injected:', !!document.getElementById('aura-core-css'));

// Manual reinject if needed
window.Aura.reinject();
```

### Platform Issues
```javascript
// Check platform detection
console.log('Platform detected:', window.Aura.isNextJS() ? 'Next.js' : 'Standard');

// Force reinitialization
window.Aura.init();
```

## 📊 Browser Support

- **Modern Browsers** - Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **CSS Features** - Custom Properties (CSS Variables), Flexbox, Grid
- **JavaScript** - ES6+ with graceful degradation
- **Accessibility** - WCAG 2.1 AA compliant color contrast

## 🔗 Resources

- **Website** - [theingenuity.co](https://theingenuity.co)
- **Source Code** - [GitHub Repository](https://github.com/theingenuityco/aura)
- **Issues & Support** - [GitHub Issues](https://github.com/theingenuityco/aura/issues)
- **License** - [MIT License](./LICENSE)

## 📋 Version History

### v3.0.0 (Current)
- ✅ **Simplified Architecture** - Root-level files replace complex directories
- ✅ **Enhanced API** - Improved JavaScript methods and platform detection
- ✅ **Unified Testing** - Single test runner with interactive and automated modes
- ✅ **Brand System** - Complete CSS variable system for all colors and utilities
- ✅ **Legacy Archive** - All v1.x files preserved in archive directory

### v1.x (Archived)
- Legacy version with v1/ directory structure
- Files available in [`archive/v1/`](./archive/v1/) for reference

## 👥 Contributing

Aura is developed and maintained by The Ingenuity Co Development Team. 

For issues, feature requests, or contributions:
1. Visit [theingenuity.co](https://theingenuity.co) 
2. Open issues on [GitHub](https://github.com/theingenuityco/aura/issues)
3. Follow contribution guidelines in repository

## 📄 License

MIT License - see [`LICENSE`](./LICENSE) file for details.

---

<div align="center">
  
**🌟 Made with digital energy by [The Ingenuity Co](https://theingenuity.co) 🌟**

*Simple. Clean. Ready to use.*

</div>
