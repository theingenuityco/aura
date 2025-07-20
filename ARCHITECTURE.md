# Aura - Technical Architecture
## The Ingenuity Co Digital Presence Extension

### Overview
Aura is a simple CDN-hosted enhancement system that extends The Ingenuity Co's digital presence from theingenuity.co. It focuses on delivering exactly 3 core features through basic CSS and JavaScript files.

## Core Features

### 1. Brand Styling
- CSS variables for consistent brand colors
- Basic typography and spacing improvements
- Simple responsive design enhancements

### 2. Interactive Elements  
- JavaScript hover effects
- Simple animations and transitions
- Basic UI interactions

### 3. Hello World Banner
- DOM manipulation for dynamic content insertion
- Simple messaging system
- Basic content enhancement

## CDN File Structure

```
cdn-root/
├── v1/
│   ├── css/
│   │   ├── brand.css           # Brand colors and variables
│   │   └── enhancement.css     # Core styling enhancements
│   └── js/
│       ├── core/
│       │   └── ingenuity.js    # Core functionality
│       └── enhancement.js      # Interactive features
└── README.md
```

## Platform Injection Strategy

### Head Tag Injection
Load critical CSS and initialize configuration:

```html
<!-- Brand styling -->
<link rel="stylesheet" href="https://cdn.theingenuity.co/v1/css/brand.css">
<link rel="stylesheet" href="https://cdn.theingenuity.co/v1/css/enhancement.css">

<!-- Configuration -->
<script>
window.AuraConfig = {
  version: 'v1',
  features: ['brand-styling', 'interactive-elements', 'hello-world']
};
</script>
```

### Stylesheet CSS Injection  
Critical brand variables for immediate application:

```css
:root {
  --aura-primary: #A8D5E5;
  --aura-secondary: #D4C5E8;
  --aura-accent: #B8E6D3;
  --aura-neutral: #8B9DC3;
}

/* Apply to existing elements */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--aura-neutral);
}
```

### End of Body Injection
Load interactive features:

```html
<!-- Core functionality -->
<script src="https://cdn.theingenuity.co/v1/js/core/ingenuity.js"></script>
<script src="https://cdn.theingenuity.co/v1/js/enhancement.js"></script>

<!-- Initialize -->
<script>
if (window.Aura) {
  window.Aura.init(window.AuraConfig);
}
</script>
```

## File Specifications

### CSS Files
- **brand.css**: CSS custom properties and brand color definitions
- **enhancement.css**: Basic styling improvements and responsive utilities

### JavaScript Files  
- **core/ingenuity.js**: Core initialization and utility functions
- **enhancement.js**: Interactive features and DOM manipulation

## Implementation Details

### Brand Styling Implementation
```css
/* brand.css */
:root {
  --aura-primary: #A8D5E5;
  --aura-secondary: #D4C5E8;
  --aura-accent: #B8E6D3;
  --aura-neutral: #8B9DC3;
  --aura-light: #F7F9FC;
}

/* enhancement.css */  
.aura-enhanced {
  transition: all 0.3s ease;
}

.aura-button {
  background: var(--aura-primary);
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
```

### Interactive Elements Implementation
```javascript
// enhancement.js
(function() {
  'use strict';
  
  function addHoverEffects() {
    const elements = document.querySelectorAll('.aura-interactive');
    elements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'translateY(-2px)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translateY(0)';
      });
    });
  }
  
  window.Aura = window.Aura || {};
  window.Aura.addHoverEffects = addHoverEffects;
})();
```

### Hello World Banner Implementation
```javascript
// core/ingenuity.js  
(function() {
  'use strict';
  
  function createHelloWorldBanner() {
    const banner = document.createElement('div');
    banner.innerHTML = `
      <div style="background: linear-gradient(135deg, var(--aura-primary), var(--aura-accent));
                  color: white; 
                  padding: 1rem; 
                  text-align: center;
                  position: relative;">
        🎉 Enhanced by The Ingenuity Co
      </div>
    `;
    document.body.insertBefore(banner, document.body.firstChild);
  }
  
  window.Aura = {
    init: function(config) {
      if (config.features.includes('hello-world')) {
        createHelloWorldBanner();
      }
      if (config.features.includes('interactive-elements')) {
        window.Aura.addHoverEffects();
      }
    }
  };
})();
```

## Deployment Process

### Simple Deployment Steps
1. **Prepare Files**: Test CSS and JavaScript files locally
2. **Upload to CDN**: Upload v1 directory to CDN provider  
3. **Update URLs**: Configure injection code with CDN URLs
4. **Test Integration**: Verify functionality on target platform
5. **Monitor**: Check for loading issues or conflicts

### File Checklist
- [ ] brand.css - Brand variables and colors
- [ ] enhancement.css - Core styling improvements  
- [ ] core/ingenuity.js - Initialization and core features
- [ ] enhancement.js - Interactive elements

## Testing Strategy

### Local Testing
```bash
# Simple HTTP server for testing
python -m http.server 8080
# Test at: http://localhost:8080/v1/
```

### Integration Testing
1. Test each injection point separately
2. Verify CSS variables apply correctly
3. Confirm JavaScript functions execute
4. Check mobile responsiveness
5. Validate cross-browser compatibility

## Technical Requirements

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Android Chrome)
- Progressive enhancement approach

### Performance Targets
- CSS files < 50KB combined
- JavaScript files < 100KB combined  
- Load time impact < 500ms
- No layout shift from enhancements

### Dependencies
- No external dependencies
- Pure CSS and vanilla JavaScript
- Compatible with existing site styles

## Success Criteria

### Technical Validation
- [ ] Brand colors apply consistently
- [ ] Interactive elements respond to hover
- [ ] Hello World banner displays correctly
- [ ] No JavaScript console errors
- [ ] Mobile compatibility maintained

### User Experience
- [ ] Visual improvements are noticeable
- [ ] Interactions feel responsive
- [ ] No negative impact on site performance
- [ ] Enhancements complement existing design

---

## Quick Start

1. **Upload files** to CDN provider
2. **Configure platform** injection points with CDN URLs
3. **Test implementation** using provided code examples
4. **Verify functionality** across devices and browsers
5. **Monitor performance** and user experience

This architecture provides a straightforward foundation for extending The Ingenuity Co's digital presence with exactly 3 core features, delivered through simple, maintainable code.