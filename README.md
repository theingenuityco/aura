# Aura

The Ingenuity Co's digital presence extension from theingenuity.co

[![Version](https://img.shields.io/badge/version-1.0.0-orange.svg)](./ARCHITECTURE.md)
[![CDN Ready](https://img.shields.io/badge/CDN-ready-green.svg)](#deployment)

## Core Features

**Aura** provides exactly 3 core features for extending The Ingenuity Co's digital presence:

### 1. Brand Styling
- Applies The Ingenuity Co brand colors and typography
- Automatic styling for buttons, headers, and text elements
- Responsive design optimizations

### 2. Interactive Elements  
- Simple hover effects on buttons and links
- Smooth transitions and basic animations
- Enhanced user interaction feedback

### 3. Hello World Banner
- Simple demonstration banner feature
- Shows system integration status
- Can be disabled for production use

## Quick Start

Deploy to your CDN and add 3 code snippets to your platform:

### 1. Head Tag
```html
<link rel="stylesheet" href="https://your-cdn.com/v1/css/enhancement.css">
<script>
window.AuraConfig = {
  version: 'v1',
  cdnBase: 'https://your-cdn.com/v1',
  debug: false
};
</script>
```

### 2. Stylesheet CSS
```css
:root {
  --aura-primary: #A8D5E5;
  --aura-secondary: #D4C5E8;
  --aura-accent: #B8E6D3;
  --aura-neutral: #8B9DC3;
  --aura-light: #F7F9FC;
  --aura-white: #FFFFFF;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  color: var(--aura-neutral) !important;
}

button, .button, .btn {
  background: linear-gradient(135deg, var(--aura-primary), var(--aura-accent)) !important;
  color: var(--aura-white) !important;
  border: none !important;
  border-radius: 25px !important;
  padding: 12px 24px !important;
  transition: all 0.3s ease !important;
}

button:hover, .button:hover, .btn:hover {
  transform: translateY(-2px) !important;
}
```

### 3. End of Body
```html
<script src="https://your-cdn.com/v1/js/core/ingenuity.js"></script>
<script src="https://your-cdn.com/v1/js/enhancement.js"></script>
```

## Deployment

### CDN Setup

Upload these files to your CDN maintaining the directory structure:

```
your-cdn.com/
└── v1/
    ├── css/
    │   ├── core/
    │   │   └── brand.css
    │   └── enhancement.css
    └── js/
        ├── core/
        │   └── ingenuity.js
        └── enhancement.js
```

### Supported Platforms

- Super.so (Pro required for custom code)
- Any platform with custom HTML/CSS injection
- Static site generators
- WordPress with code injection plugins

### CDN Providers

- Cloudflare (recommended)
- AWS CloudFront  
- Azure CDN
- jsDelivr
- Custom CDN solutions

## Configuration

### Basic Setup
```javascript
window.AuraConfig = {
  version: 'v1',
  cdnBase: 'https://your-cdn.com/v1',
  debug: false,
  features: {
    helloBanner: true,        // Show hello world banner
    brandStyling: true,       // Apply brand colors
    interactiveElements: true // Enable hover effects
  }
};
```

### Production Setup
```javascript
window.AuraConfig = {
  version: 'v1',
  cdnBase: 'https://your-cdn.com/v1',
  debug: false,
  features: {
    helloBanner: false,       // Disable demo banner
    brandStyling: true,
    interactiveElements: true
  }
};
```

## Verification

After deployment:

1. **Visual Check**: Brand colors should be applied to buttons and headers
2. **Console Check**: Open browser console and look for initialization messages
3. **Network Check**: Verify CSS and JS files load successfully (200 status)
4. **Mobile Check**: Test responsive behavior on mobile devices

### Debug Mode
```javascript
window.AuraConfig = { debug: true };
```

This enables detailed console logging for troubleshooting.

## Performance

- **Total Size**: ~35KB (~27KB minified)
- **Load Impact**: <100ms typical
- **Core Web Vitals**: Minimal impact on FCP/LCP
- **Caching**: Set 1-year cache headers for optimal performance

## Troubleshooting

### Files Not Loading
- Verify CDN URLs are accessible
- Check CORS headers allow cross-origin requests
- Ensure proper cache headers are set

### Styles Not Applying  
- Check for CSS conflicts with existing styles
- Verify CSS file loads without 404 errors
- Test with `!important` declarations if needed

### Features Not Working
- Enable debug mode to see detailed logs
- Check browser console for JavaScript errors
- Verify script loading order (core before enhancement)

## Rollback

To quickly disable Aura:

1. **Emergency**: Clear all 3 code injection areas in your platform
2. **Gradual**: Set `window.AuraConfig = { features: {} };` in head tag
3. **Selective**: Disable individual features in configuration

## Files

- [`ARCHITECTURE.md`](ARCHITECTURE.md) - Technical architecture details
- [`replica.html`](replica.html) - Local testing file
- [`v1/css/enhancement.css`](v1/css/enhancement.css) - Main stylesheet
- [`v1/js/enhancement.js`](v1/js/enhancement.js) - Main JavaScript

## Version History

- **v1.0.0** - Initial release with 3 core features
- **v1.1.0** (Planned) - Additional interactive components
- **v1.2.0** (Planned) - Analytics integration

---

*The Ingenuity Co Development Team*  
*Source: theingenuity.co*