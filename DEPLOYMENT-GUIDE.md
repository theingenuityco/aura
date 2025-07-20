# 🚀 Super.so Deployment Guide - Quick Reference

> **5-minute setup guide for The Ingenuity Co enhancement system**

## ⚡ Quick Deployment Checklist

### Phase 1: CDN Setup (2 minutes)

- [ ] **Upload files to CDN** maintaining exact folder structure:
  ```
  your-cdn.com/v1/css/enhancement.css
  your-cdn.com/v1/css/core/brand.css
  your-cdn.com/v1/js/enhancement.js
  your-cdn.com/v1/js/core/ingenuity.js
  ```

- [ ] **Test CDN accessibility**:
  ```bash
  curl -I https://your-cdn.com/v1/css/enhancement.css
  curl -I https://your-cdn.com/v1/js/enhancement.js
  ```

- [ ] **Verify files return HTTP 200 OK**

### Phase 2: Super.so Integration (2 minutes)

**Step 1 - Head Tag Injection:**
```html
<link rel="stylesheet" href="https://your-cdn.com/v1/css/enhancement.css">
<script>
window.IngenuityConfig = {
  cdnBase: 'https://your-cdn.com/v1',
  debug: false
};
</script>
```

**Step 2 - Stylesheet CSS Injection:**
```css
:root {
  --ing-primary: #FF6B35;
  --ing-secondary: #2E86AB;
  --ing-accent: #F7931E;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
}
```

**Step 3 - End of Body Injection:**
```html
<script src="https://your-cdn.com/v1/js/core/ingenuity.js"></script>
<script src="https://your-cdn.com/v1/js/enhancement.js"></script>
```

### Phase 3: Verification (1 minute)

- [ ] **Visit website** - should see visual improvements immediately
- [ ] **Check browser console** - look for: `🚀 INGENUITY ENH Enhancement system initialized successfully`
- [ ] **Test mobile** - verify responsive design works
- [ ] **Verify "Hello World" banner** appears (if enabled)

---

## 🆘 Emergency Rollback

If something goes wrong, immediately clear all 3 Super.so injection areas and save.

---

## 🔧 Common CDN URLs

**Replace `your-cdn.com` with your actual CDN:**

| Provider | URL Format |
|----------|------------|
| Cloudflare | `https://yourdomain.com/cdn/v1/` |
| AWS CloudFront | `https://d123456789.cloudfront.net/v1/` |
| jsDelivr (GitHub) | `https://cdn.jsdelivr.net/gh/username/repo@main/v1/` |
| Custom | `https://cdn.yoursite.com/v1/` |

---

## ✅ Success Indicators

- ✅ Brand colors visible on buttons and headers
- ✅ Improved typography throughout site
- ✅ Console shows branded log messages
- ✅ No JavaScript errors in console
- ✅ Page loads normally without delays

---

*Need help? Check the full [README.md](README.md) or contact support@theingenuity.co*