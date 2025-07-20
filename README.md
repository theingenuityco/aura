# Aura

> **The Ingenuity Co's digital presence extension system**

A lightweight, CDN-ready enhancement system that extends The Ingenuity Co's brand identity and interactive elements across any web platform.

[![Version](https://img.shields.io/badge/version-1.0.0-orange.svg)](#version-history)
[![CDN Ready](https://img.shields.io/badge/CDN-ready-green.svg)](#installation)

## What is Aura?

Aura is a modular enhancement system designed to seamlessly integrate The Ingenuity Co's brand identity into any web platform. Whether you're using Super.so, GitHub Pages, or custom static sites, Aura provides consistent styling and interactive elements with minimal setup.

## Features

### 🎨 **Brand Identity**
- **Cohesive Color Palette**: Calming pastels with high-contrast accessibility support
- **Typography System**: Modern, readable font stack with proper scaling
- **Component Styling**: Automatic enhancement of buttons, headers, and interactive elements

### ✨ **Interactive Elements**
- **Smooth Animations**: Subtle hover effects and transitions that respect user preferences
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility First**: Proper focus states and reduced motion support

### 🚀 **Developer Experience**
- **Platform Agnostic**: Works with any platform that supports custom HTML/CSS
- **Modular Architecture**: Enable or disable features as needed
- **Debug Support**: Built-in logging and troubleshooting tools

## Installation

### 1. CDN Setup

Upload the following files to your CDN maintaining the directory structure:

```
your-cdn.com/
└── v1/
    ├── css/
    │   └── core/
    │       └── aura.css
    └── js/
        └── core/
            └── aura.js
```

### 2. Integration

Add these three code blocks to your platform:

#### Head Section
```html
<link rel="stylesheet" href="https://your-cdn.com/v1/css/core/aura.css">
<script>
window.AuraConfig = {
  version: 'v1',
  cdnBase: 'https://your-cdn.com/v1',
  debug: false
};
</script>
```

#### Before Closing Body Tag
```html
<script src="https://your-cdn.com/v1/js/core/aura.js"></script>
```

#### Custom Styles (Optional)
```css
/* Override default colors if needed */
:root {
  --aura-primary: #A8D5E5;
  --aura-secondary: #D4C5E8;
  --aura-accent: #B8E6D3;
  --aura-neutral: #8B9DC3;
}
```

## Configuration

### Basic Configuration
```javascript
window.AuraConfig = {
  version: 'v1',
  cdnBase: 'https://your-cdn.com/v1',
  debug: false,
  features: {
    brandStyling: true,       // Apply brand colors and typography
    interactiveElements: true, // Enable hover effects and animations
    accessibility: true       // Enhanced accessibility features
  }
};
```

### Production Configuration
```javascript
window.AuraConfig = {
  version: 'v1',
  cdnBase: 'https://your-cdn.com/v1',
  debug: false,
  features: {
    brandStyling: true,
    interactiveElements: true,
    accessibility: true
  }
};
```

### Debug Mode
```javascript
window.AuraConfig = { debug: true };
```

Enable detailed console logging for development and troubleshooting.

## Supported Platforms

- **Super.so** (Pro plan required for custom code injection)
- **GitHub Pages** with custom HTML support
- **Static Site Generators** (Jekyll, Hugo, Gatsby, etc.)
- **WordPress** with custom code plugins
- **Vercel, Netlify** and other modern hosting platforms

## Recommended CDN Providers

- **Cloudflare** (Recommended for global performance)
- **AWS CloudFront** (Enterprise-grade reliability)  
- **Azure CDN** (Microsoft ecosystem integration)
- **jsDelivr** (Free tier available)

## Verification

After deployment, verify your installation:

1. **Visual Check** - Brand colors should appear on buttons and headers
2. **Console Check** - Look for Aura initialization messages
3. **Network Tab** - Verify all files load with 200 status codes
4. **Mobile Test** - Check responsive behavior on various devices

## Troubleshooting

### Common Issues

**Files Not Loading**
- Verify CDN URLs are publicly accessible
- Check CORS headers allow cross-origin requests
- Ensure cache headers are properly configured

**Styles Not Applying**
- Check for CSS conflicts with existing stylesheets
- Verify load order (Aura CSS should load before custom styles)
- Try adding `!important` declarations if needed

**JavaScript Errors**
- Enable debug mode for detailed error logging
- Verify script loading order in browser dev tools
- Check for conflicts with existing JavaScript libraries

### Quick Fixes

**Emergency Rollback**
```javascript
// Disable all features immediately
window.AuraConfig = { features: {} };
```

**Gradual Disable**
```javascript
// Disable specific features
window.AuraConfig = {
  features: {
    brandStyling: false,
    interactiveElements: true
  }
};
```

## Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **CSS Features**: CSS Custom Properties, CSS Grid, Flexbox
- **JavaScript**: ES6+ with graceful degradation

## Version History

- **v1.0.0** - Initial release with brand identity and interactive elements
- **v1.1.0** (Planned) - Enhanced component library
- **v1.2.0** (Planned) - Analytics integration and performance metrics

## Contributing

Aura is developed and maintained by The Ingenuity Co Development Team. For issues, suggestions, or contributions, please visit [theingenuity.co](https://theingenuity.co).

## License

MIT License - see [LICENSE](LICENSE) file for details.
