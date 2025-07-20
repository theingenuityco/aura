# 🌟 Aura

> **The Ingenuity Co's digital presence extension system**

A lightweight, CDN-ready enhancement system that extends The Ingenuity Co's brand identity and interactive elements across any web platform.

[![Version](https://img.shields.io/badge/version-1.0.0-orange.svg)](#version-history)
[![CDN Ready](https://img.shields.io/badge/CDN-ready-green.svg)](#getting-started)

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

## Getting Started

### Quick Start (Recommended)

Use jsDelivr's free CDN for instant deployment:

#### 1. Add to Head Section
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/v1/css/core/aura.css">
<script>
window.AuraConfig = {
  version: 'v1',
  cdnBase: 'https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/v1',
  debug: false
};
</script>
```

#### 2. Add Before Closing Body Tag
```html
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/v1/js/core/aura.js"></script>
```

#### 3. Optional: Custom Color Overrides
```css
:root {
  --aura-primary: #A8D5E5;
  --aura-secondary: #D4C5E8;
  --aura-accent: #B8E6D3;
  --aura-neutral: #8B9DC3;
}
```

## Deployment Options

### Option 1: Super.so Integration

Perfect for Super.so websites (Pro plan required):

#### Step 1: Navigate to Settings
Go to **Site Settings → Custom Code** in your Super.so dashboard

#### Step 2: Header Code
Add this to the **Header** section:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/v1/css/core/aura.css">
<script>
window.AuraConfig = {
  version: 'v1',
  cdnBase: 'https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/v1',
  debug: false,
  features: {
    brandStyling: true,
    interactiveElements: true,
    accessibility: true
  }
};
</script>
```

#### Step 3: Footer Code
Add this to the **Footer** section:
```html
<script src="https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/v1/js/core/aura.js"></script>
```

#### Step 4: Super.so Specific Styling (Optional)
Add to **CSS** section:
```css
/* Super.so/Notion specific overrides */
.notion-page-content {
  font-family: var(--aura-font-family) !important;
}

.notion-link {
  color: var(--aura-primary) !important;
  transition: var(--aura-transition-fast) !important;
}

.notion-link:hover {
  color: var(--aura-primary-hover) !important;
}
```

### Option 2: Custom CDN Deployment

For enterprise or self-hosted solutions:

#### File Structure
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

#### Implementation
```html
<!-- Head Section -->
<link rel="stylesheet" href="https://your-cdn.com/v1/css/core/aura.css">
<script>
window.AuraConfig = {
  version: 'v1',
  cdnBase: 'https://your-cdn.com/v1',
  debug: false
};
</script>

<!-- Before Closing Body -->
<script src="https://your-cdn.com/v1/js/core/aura.js"></script>
```

#### Performance Optimization
```apache
# .htaccess for Apache
<FilesMatch "\.(css|js)$">
  Header set Cache-Control "public, max-age=31536000"
  Header set Expires "Thu, 31 Dec 2025 23:59:59 GMT"
</FilesMatch>
```

### Option 3: Platform-Specific Deployments

#### GitHub Pages
1. Fork this repository
2. Enable GitHub Pages in settings
3. Use your repository URL:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/aura@main/v1/css/core/aura.css">
```

#### WordPress
1. Install "Insert Headers and Footers" plugin
2. Add header and footer code
3. Test in staging first

#### Webflow
1. **Project Settings → Custom Code**
2. Add CSS and config to **Head Code**
3. Add JavaScript to **Footer Code**

#### Squarespace
1. **Settings → Advanced → Code Injection**
2. Add header code to **Header** section
3. Add footer code to **Footer** section

#### Other Platforms
- **Vercel/Netlify**: Add to HTML templates
- **Jekyll/Hugo**: Include in layout files
- **React/Vue**: Import in main component

## Configuration

### Basic Configuration
```javascript
window.AuraConfig = {
  version: 'v1',
  cdnBase: 'https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/v1',
  debug: false,
  features: {
    brandStyling: true,       // Brand colors and typography
    interactiveElements: true, // Hover effects and animations
    accessibility: true       // Enhanced accessibility
  }
};
```

### Debug Mode
```javascript
window.AuraConfig = { debug: true };
```
Enables detailed console logging for troubleshooting.

### Feature Toggle
```javascript
// Disable specific features
window.AuraConfig = {
  features: {
    brandStyling: false,     // Keep existing styles
    interactiveElements: true // Only add interactions
  }
};
```

## Verification

After deployment, check these items:

1. **Visual Check** - Brand colors appear on buttons and headers
2. **Console Check** - Look for Aura initialization messages
3. **Network Tab** - All files load with 200 status codes
4. **Mobile Test** - Responsive behavior works correctly

## Troubleshooting

### Common Issues

#### Files Not Loading
- Verify CDN URLs are accessible
- Check CORS headers allow cross-origin requests
- Ensure cache headers are configured

#### Styles Not Applying
- Check for CSS conflicts with existing styles
- Verify Aura CSS loads before custom styles
- Try `!important` declarations if needed

#### JavaScript Errors
- Enable debug mode for detailed logging
- Check script loading order in dev tools
- Look for conflicts with existing libraries

### Quick Fixes

#### Emergency Disable
```javascript
window.AuraConfig = { features: {} };
```

#### Gradual Rollback
```javascript
window.AuraConfig = {
  features: {
    brandStyling: false,  // Disable styling
    interactiveElements: true  // Keep interactions
  }
};
```

## Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **CSS Features**: Custom Properties, Grid, Flexbox
- **JavaScript**: ES6+ with graceful degradation

## Version History

- **v1.0.0** - Initial release with brand identity and interactive elements
- **v1.1.0** (Planned) - Enhanced component library
- **v1.2.0** (Planned) - Analytics integration

## Contributing

Aura is developed and maintained by The Ingenuity Co Development Team. For issues, suggestions, or contributions, please visit [theingenuity.co](https://theingenuity.co).

## License

MIT License - see [LICENSE](LICENSE) file for details.
