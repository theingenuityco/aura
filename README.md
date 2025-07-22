# 🌟 Aura v4.1.0

> **Simple aura.css and aura.js with auto-styling that can be imported to enhance your site**

A lightweight, easy-to-use web enhancement library from The Ingenuity Co. Aura provides brand colors, styling utilities, interactive elements, and automatic element styling with a clean, simple architecture that works on any website.

[![Version](https://img.shields.io/badge/version-4.1.0-orange.svg)](#version-history)
[![CDN Ready](https://img.shields.io/badge/CDN-ready-green.svg)](#quick-start)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](#license)

## ✨ What's New in v4.1.0

🎯 **Auto-Styling Feature** - Enhanced automatic CSS class application with [`aura.super-so.js`](./aura.super-so.js)
🔧 **Package Optimization** - Added auto-styling file to npm package distribution
📦 **Enhanced Keywords** - Better discoverability with auto-styling, plug-and-play terms
🚀 **Seamless Integration** - Zero-configuration auto-styling for any existing website

### Previous in v4.0.0

🎯 **Auto-Styling Feature** - Automatic CSS class application with [`aura.super-so.js`](./aura.super-so.js)
🔒 **Enhanced Security** - Eliminated eval() vulnerabilities and improved code practices
⚡ **Performance Optimized** - 85% code reduction for faster load times
🎨 **Plug-and-Play** - Zero configuration auto-styling for existing websites
🏗️ **Smart Element Detection** - Automatic mapping of HTML elements to Aura classes

### Previous in v3.0.0
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
├── aura.super-so.js  # Auto-styling extension for automatic class application
├── test-runner.js    # Unified test runner for any domain
├── package.json      # npm scripts and dependencies
└── archive/          # Legacy v1/ files (archived)
```

**That's it!** No complex directories, no confusing file paths. Just clean, simple files with optional auto-styling.

## 🎯 Auto-Styling Feature

Transform any website instantly with Aura's **zero-configuration auto-styling**! The new [`aura.super-so.js`](./aura.super-so.js) extension automatically applies Aura CSS classes to common HTML elements, giving you beautiful, brand-consistent styling without manual class assignment.

### ✨ What It Does

- **🔄 Automatic Class Application** - Applies Aura classes to HTML elements automatically
- **🎨 Instant Styling** - Transform plain HTML into styled content with zero code changes
- **🚀 Plug-and-Play** - Works on any existing website without modification
- **⚡ Performance Optimized** - Lightweight and fast with intelligent element detection
- **🔧 Manual Override** - Automatic styling respects existing classes and manual styling

### 🎯 Element Mappings

Aura automatically maps these HTML elements to beautiful styling:

| Element | Auto-Applied Class | Result |
|---------|-------------------|--------|
| [`h1`](./aura.css) | `.aura-text-primary` | Primary brand color headings |
| [`h2, h3`](./aura.css) | `.aura-text-secondary` | Secondary brand color subheadings |
| [`button`](./aura.css) | `.aura-btn-primary` | Styled primary buttons |
| [`a`](./aura.css) | `.aura-text-accent` | Accent color links |
| [`.hero, .banner`](./aura.css) | `.aura-bg-primary` | Primary background containers |

### 📋 Before & After Examples

**Before Auto-Styling:**
```html
<div class="hero">
  <h1>Welcome to My Site</h1>
  <h2>Simple and Clean Design</h2>
  <button onclick="getStarted()">Get Started</button>
  <a href="/learn-more">Learn More</a>
</div>
```

**After Auto-Styling Applied:**
```html
<div class="hero aura-bg-primary">
  <h1 class="aura-text-primary">Welcome to My Site</h1>
  <h2 class="aura-text-secondary">Simple and Clean Design</h2>
  <button class="aura-btn-primary" onclick="getStarted()">Get Started</button>
  <a class="aura-text-accent" href="/learn-more">Learn More</a>
</div>
```

### 🚀 Quick Auto-Styling Setup

**Option 1: Automatic (Recommended)**
```html
<!-- Include both core files - auto-styling activates automatically -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css">
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"></script>
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.super-so.js"></script>
```

**Option 2: Manual Control**
```html
<!-- Include core files first -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css">
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"></script>

<script>
// Enable auto-styling when you want it
AuraCore.enableAutoStyling().then(success => {
  console.log('Auto-styling applied:', success);
}).catch(error => {
  console.error('Auto-styling failed:', error);
});
</script>
```

**Option 3: Direct Integration**
```html
<!-- Include all files if you want auto-styling always active -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css">
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"></script>
<script>
// Load and apply auto-styling
fetch('https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.super-so.js')
  .then(response => response.text())
  .then(scriptContent => {
    eval(scriptContent);
    AuraSuper.apply();
  });
</script>
```

### 🎛️ API Reference

**[`AuraCore.enableAutoStyling()`](./aura.js)**
```javascript
// Async method that loads and applies auto-styling
AuraCore.enableAutoStyling()
  .then(success => {
    // Returns true if styling was applied successfully
    console.log('Auto-styling result:', success);
  })
  .catch(error => {
    // Handle any loading or application errors
    console.error('Auto-styling error:', error.message);
  });
```

**[`AuraSuper.apply()`](./aura.super-so.js)**
```javascript
// Direct application if aura.super-so.js is already loaded
const success = AuraSuper.apply();
console.log('Manual application result:', success);
```

**[`AuraSuper.mappings`](./aura.super-so.js)**
```javascript
// View current element-to-class mappings
console.log('Auto-styling mappings:', AuraSuper.mappings);
// Output: { 'h1': 'aura-text-primary', 'h2, h3': 'aura-text-secondary', ... }
```

## 🚀 Quick Start

### Option 1: CDN with Auto-Styling (Recommended)

```html
<!-- Add to <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css">

<!-- Add before closing </body> -->
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"></script>
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.super-so.js"></script>
```

### Option 2: CDN Basic (Manual Styling)

```html
<!-- Add to <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css">

<!-- Add before closing </body> -->
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"></script>

<script>
// Enable auto-styling when needed
AuraCore.enableAutoStyling().then(success => {
  console.log('Auto-styling applied:', success);
});
</script>
```

### Option 3: Download and Host

1. Download [`aura.css`](./aura.css), [`aura.js`](./aura.js), and optionally [`aura.super-so.js`](./aura.super-so.js)
2. Upload to your website
3. Include in your HTML:

**With Auto-Styling:**
```html
<!-- Add to <head> -->
<link rel="stylesheet" href="./aura.css">

<!-- Add before closing </body> -->
<script src="./aura.js"></script>
<script src="./aura.super-so.js"></script>
```

**Manual Control:**
```html
<!-- Add to <head> -->
<link rel="stylesheet" href="./aura.css">

<!-- Add before closing </body> -->
<script src="./aura.js"></script>
<script>
// Apply auto-styling manually
AuraCore.enableAutoStyling();
</script>
```

**Done!** Aura will automatically initialize and enhance your site. With auto-styling enabled, common HTML elements will receive beautiful styling automatically.

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

Aura provides a simple, powerful JavaScript API with v4.0.0's enhanced functionality:

### Basic Usage
```javascript
// Available core methods:
window.AuraCore.reinject();          // Re-inject CSS with cache busting
window.AuraCore.isNextJS();          // Detect Next.js/Super.so platforms
window.AuraCore.enableAutoStyling(); // Load and apply auto-styling

// Backwards compatibility:
window.Aura === window.AuraCore;     // true
```

### Auto-Styling Methods
```javascript
// Enable auto-styling (async with Promise)
AuraCore.enableAutoStyling()
  .then(success => {
    console.log('Auto-styling applied successfully:', success);
  })
  .catch(error => {
    console.error('Auto-styling failed:', error.message);
  });

// Direct application (if aura.super-so.js already loaded)
if (window.AuraSuper) {
  const result = AuraSuper.apply();
  console.log('Direct styling applied:', result);
}

// Check current mappings
console.log('Element mappings:', AuraSuper.mappings);
```

### Platform Detection
```javascript
if (AuraCore.isNextJS()) {
    console.log('Running on Next.js/Super.so platform');
    // Automatic SPA compatibility enabled
}
```

### Advanced Usage
```javascript
// Manual CSS cache busting
const reinjected = AuraCore.reinject();
console.log('CSS reinjected:', reinjected);

// Auto-styling with error handling
async function setupAutoStyling() {
  try {
    const success = await AuraCore.enableAutoStyling();
    if (success) {
      console.log('✅ Auto-styling ready');
    } else {
      console.warn('⚠️ Auto-styling partially applied');
    }
  } catch (error) {
    console.error('❌ Auto-styling setup failed:', error);
  }
}

setupAutoStyling();
```

## 🏗️ Platform Support

Aura automatically detects and optimizes for:

- **Next.js** - Route change detection, SPA compatibility
- **Super.so** - Automatic domain detection and optimization
- **Static Sites** - Works on any HTML/CSS/JS website
- **WordPress, Squarespace, Webflow** - Copy/paste integration

### Super.so Integration

**With Auto-Styling (Recommended):**
```html
<!-- In Super.so Custom Code → Header -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css">

<!-- In Super.so Custom Code → Footer -->
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"></script>
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.super-so.js"></script>
```

**Manual Control:**
```html
<!-- In Super.so Custom Code → Header -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css">

<!-- In Super.so Custom Code → Footer -->
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"></script>
<script>
// Enable auto-styling for Super.so sites
document.addEventListener('DOMContentLoaded', function() {
  AuraCore.enableAutoStyling().then(success => {
    console.log('Super.so auto-styling applied:', success);
  });
});
</script>
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

### Basic Website with Auto-Styling
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Site with Aura Auto-Styling</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css">
</head>
<body>
    <!-- No manual classes needed - auto-styling handles everything! -->
    <div class="hero">
        <h1>Welcome to My Site</h1>
        <h2>Beautiful styling applied automatically</h2>
        <button onclick="getStarted()">Get Started</button>
        <a href="/learn-more">Learn More</a>
    </div>
    
    <script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.super-so.js"></script>
</body>
</html>
```

### Basic Website (Manual Classes)
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

### React/Next.js with Auto-Styling
```jsx
// pages/_document.js or app/layout.js
import Head from 'next/head'
import { useEffect } from 'react'

export default function MyApp() {
  useEffect(() => {
    // Enable auto-styling after component mount
    if (window.AuraCore) {
      window.AuraCore.enableAutoStyling()
        .then(success => console.log('Auto-styling applied:', success))
        .catch(error => console.error('Auto-styling failed:', error));
    }
  }, []);

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
      <main>
        {/* Auto-styling will apply classes automatically */}
        <div className="hero">
          <h1>Welcome to Our React App</h1>
          <h2>Built with Next.js and Aura</h2>
          <button onClick={handleGetStarted}>Get Started</button>
        </div>
      </main>
    </div>
  )
}
```

### WordPress Integration
```html
<!-- Add to your theme's functions.php or in Appearance > Theme Editor -->
<?php
function add_aura_scripts() {
    // Enqueue Aura CSS
    wp_enqueue_style('aura-css', 'https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css');
    
    // Enqueue Aura JS
    wp_enqueue_script('aura-js', 'https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js', array(), null, true);
    
    // Enqueue Auto-Styling (optional)
    wp_enqueue_script('aura-super', 'https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.super-so.js', array('aura-js'), null, true);
}
add_action('wp_enqueue_scripts', 'add_aura_scripts');
?>

<!-- Or add directly to theme header.php -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css">
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"></script>
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.super-so.js"></script>
```

### Squarespace Integration
```html
<!-- In Settings > Developer Tools > Code Injection > Header -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css">

<!-- In Settings > Developer Tools > Code Injection > Footer -->
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"></script>
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.super-so.js"></script>

<!-- Optional: Manual control -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  if (window.AuraCore) {
    window.AuraCore.enableAutoStyling()
      .then(success => console.log('Squarespace + Aura auto-styling:', success));
  }
});
</script>
```

### Webflow Integration
```html
<!-- In Project Settings > Custom Code > Head Code -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css">

<!-- In Project Settings > Custom Code > Footer Code -->
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"></script>
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.super-so.js"></script>

<!-- For selective auto-styling on specific pages -->
<script>
// Only apply auto-styling to elements with 'aura-enable' class
if (window.AuraSuper && document.querySelector('.aura-enable')) {
  window.AuraSuper.apply();
}
</script>
```

## 🔄 Migration & Updates

### What's New in v4.0.0

- **🎯 Auto-Styling Feature** - Optional [`aura.super-so.js`](./aura.super-so.js) for automatic CSS class application
- **🔒 Enhanced Security** - Eliminated eval() patterns and improved code practices
- **⚡ Performance Improvements** - 85% code reduction for faster execution
- **🚀 Promise-Based API** - New [`AuraCore.enableAutoStyling()`](./aura.js) method with async support
- **🔧 Full Backwards Compatibility** - All v3.x code continues to work unchanged

### Migration from v3.x to v4.0.0

**No changes required!** v4.0.0 is fully backwards compatible. To add auto-styling:

```html
<!-- Existing v3.x setup (still works) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css">
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"></script>

<!-- Add auto-styling (optional) -->
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.super-so.js"></script>
```

### What Changed in v3.0.0 (from v1.x)

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
   
   <!-- New v4.0.0 -->
   <link href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.css">
   <script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.js"></script>
   <!-- Optional: Add auto-styling -->
   <script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.super-so.js"></script>
   ```

2. **Update configuration:**
   ```javascript
   // Old v1.x config (remove)
   window.AuraConfig = {
     version: 'v1',
     cdnBase: '...',
     features: {...}
   };
   
   // New v4.0.0 (automatic, no config needed!)
   // Just use: AuraCore methods or enable auto-styling
   AuraCore.enableAutoStyling();
   ```

3. **Test your integration:**
   ```bash
   npm run demo  # Test interactively
   npm run test  # Run automated tests
   ```

### Backward Compatibility

v4.0.0 maintains full API compatibility with v3.x. Legacy files are preserved in the [`archive/`](./archive/) directory for reference.

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

### v4.1.0 (Current)
- 🎯 **Auto-Styling Feature** - Enhanced automatic CSS class application with [`aura.super-so.js`](./aura.super-so.js)
- 🔧 **Package Optimization** - Added auto-styling file to npm package distribution
- 📦 **Enhanced Keywords** - Better discoverability with auto-styling, plug-and-play terms
- 🚀 **Seamless Integration** - Zero-configuration auto-styling for any existing website
- 🔧 **Full Compatibility** - Maintains all v4.0.0 features and backwards compatibility

### v4.0.0 (Previous)
- 🎯 **Auto-Styling Foundation** - Initial [`aura.super-so.js`](./aura.super-so.js) for automatic CSS class application
- 🔒 **Enhanced Security** - Eliminated eval() vulnerabilities and improved code practices
- ⚡ **Performance Optimized** - 85% code reduction for faster load times
- 🎨 **Element Mapping System** - Automatic mapping of HTML elements to Aura classes
- 🚀 **Promise-Based API** - [`AuraCore.enableAutoStyling()`](./aura.js) with async/await support
- 🔧 **Backwards Compatibility** - Full compatibility with v3.x implementations

### v3.0.0 (Previous)
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
