/*!
 * Aura Core - The Ingenuity Co's Digital Energy Field & Dependency Delivery System
 * Mystical Dependency Management & Digital Emanation System v1.0.0
 *
 * Aura represents the invisible emanation and energy field extending The Ingenuity Co's
 * digital presence across the web. This mystical system channels dependencies, styles,
 * and interactive energies to static sites, breathing life into digital experiences.
 *
 * AURA CAPABILITIES:
 * - Multi-platform energy delivery (Super.so, GitHub Pages, Vercel, Netlify)
 * - Mystical injection points for CSS, JS, and digital assets
 * - Invisible presence with graceful degradation
 * - Clean API for programmatic energy management
 * - Modern animation system with graceful degradation
 * - Configurable energy emanation mechanisms
 *
 * Primary Target: theingenuity.co - The source of digital aura
 * Energy Channels: Super.so, GitHub Pages, static site generators
 * Author: The Ingenuity Co Development Team
 * License: MIT
 */

(function(window, document) {
    'use strict';

    // =================================================================
    // AURA CORE CONFIGURATION & MYSTICAL CONSTANTS
    // =================================================================

    const AURA_CONFIG = {
        name: 'Aura Core - The Ingenuity Co Digital Energy Field',
        version: '1.0.0',
        namespace: 'Aura',
        debug: false,
        philosophy: 'Invisible emanation extending digital presence',
        delivery: {
            platforms: {
                'super.so': {
                    headInjection: true,
                    bodyInjection: true,
                    stylesheetInjection: true,
                    energyLevel: 'high'
                },
                'github-pages': {
                    headInjection: true,
                    bodyInjection: true,
                    stylesheetInjection: false,
                    energyLevel: 'medium'
                },
                'vercel': {
                    headInjection: true,
                    bodyInjection: true,
                    stylesheetInjection: true,
                    energyLevel: 'high'
                },
                'netlify': {
                    headInjection: true,
                    bodyInjection: true,
                    stylesheetInjection: true,
                    energyLevel: 'high'
                }
            },
            injectionPoints: {
                head: 'document.head',
                bodyStart: 'document.body.prepend',
                bodyEnd: 'document.body.append'
            },
            cdnBase: 'https://cdn.theingenuity.co/v1',
            auraSource: 'theingenuity.co'
        },
        branding: {
            primary: '#FF6B35',
            secondary: '#2E86AB',
            accent: '#F7931E',
            neutral: '#4A4A4A',
            white: '#FFFFFF',
            light: '#F8F9FA',
            aura: '#7C4DFF' // Mystical aura color
        },
        // Modern animation system
        animation: {
            duration: 300,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            enabled: true // Can be disabled to focus purely on delivery
        }
    };

    // =================================================================
    // AURA UTILITY FUNCTIONS
    // =================================================================

    /**
     * Aura-enhanced console logging with mystical branding
     * @param {string} level - Log level (log, info, warn, error)
     * @param {string} message - Message to log
     * @param {*} data - Optional data to log
     */
    function auraLog(level, message, data) {
        if (!AURA_CONFIG.debug && level !== 'error') return;
        
        // Aura mystical logging with energy field branding
        const prefix = '🔮 Aura';
        
        if (data !== undefined) {
            console[level](`[${prefix}] ${message}`, data);
        } else {
            console[level](`[${prefix}] ${message}`);
        }
    }

    /**
     * Safely query DOM elements with aura protection
     * @param {string} selector - CSS selector
     * @param {Element} context - Optional context element
     * @returns {Element|null}
     */
    function safeQuery(selector, context = document) {
        try {
            return context.querySelector(selector);
        } catch (error) {
            auraLog('warn', `Aura protection: Invalid selector ${selector}`, error);
            return null;
        }
    }

    /**
     * Create element with aura-infused attributes and styles
     * @param {string} tag - HTML tag name
     * @param {Object} options - Element options
     * @returns {Element}
     */
    function createElement(tag, options = {}) {
        try {
            const element = document.createElement(tag);
            
            // Set attributes
            if (options.attributes) {
                Object.entries(options.attributes).forEach(([key, value]) => {
                    element.setAttribute(key, value);
                });
            }
            
            // Set styles
            if (options.styles) {
                Object.entries(options.styles).forEach(([key, value]) => {
                    element.style[key] = value;
                });
            }
            
            // Set text content
            if (options.text) {
                element.textContent = options.text;
            }
            
            // Set HTML content
            if (options.html) {
                element.innerHTML = options.html;
            }
            
            // Set classes
            if (options.className) {
                element.className = options.className;
            }
            
            return element;
        } catch (error) {
            auraLog('error', 'Aura failed to create element', { tag, options, error });
            return document.createElement('div'); // Fallback
        }
    }

    /**
     * Add event listener with aura protection
     * @param {Element} element - Target element
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     */
    function safeAddEventListener(element, event, handler) {
        try {
            if (element && typeof handler === 'function') {
                element.addEventListener(event, handler);
                return true;
            }
            return false;
        } catch (error) {
            auraLog('warn', `Aura protection: Failed to add event listener ${event}`, error);
            return false;
        }
    }

    // =================================================================
    // AURA ENERGY INJECTION & DELIVERY SYSTEM
    // =================================================================

    /**
     * Intersection Observer for revealing content animations (legacy support)
     */
    let revealObserver = null;

    /**
     * Initialize aura dependency delivery system with optional animation support
     * @param {Object} options - Configuration options
     */
    function initializeAuraDependencyDelivery(options = {}) {
        try {
            auraLog('info', 'Channeling aura energy for dependency delivery...');

            // Initialize core dependency injection
            const injectionSuccess = initializeAuraInjectionPoints();
            if (!injectionSuccess) {
                auraLog('warn', 'Aura injection points initialization failed - using fallback energy');
            }

            // Initialize optional animation system if enabled
            if (AURA_CONFIG.animation.enabled) {
                initializeContentReveal(options);
            } else {
                auraLog('info', 'Aura animation system disabled - focusing on pure delivery energy');
            }

            return true;

        } catch (error) {
            auraLog('error', 'Aura dependency delivery initialization failed', error);
            return false;
        }
    }

    /**
     * Initialize content reveal animations using Intersection Observer (legacy support)
     * @param {Object} options - Configuration options
     */
    function initializeContentReveal(options = {}) {
        try {
            // Check for Intersection Observer support
            if (!('IntersectionObserver' in window)) {
                auraLog('warn', 'Intersection Observer not supported by aura - falling back to immediate reveal');
                fallbackRevealAll();
                return false;
            }

            // Check for reduced motion preference
            if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                auraLog('info', 'Reduced motion detected by aura - respecting accessibility');
                fallbackRevealAll();
                return false;
            }

            const config = {
                threshold: 0.1,
                rootMargin: '20px 0px -50px 0px',
                triggerOnce: true,
                ...options
            };

            // Create intersection observer with aura energy
            revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        revealElement(element);
                        
                        if (config.triggerOnce) {
                            revealObserver.unobserve(element);
                        }
                    }
                });
            }, {
                threshold: config.threshold,
                rootMargin: config.rootMargin
            });

            // Find and observe all reveal-ready elements
            const revealElements = document.querySelectorAll('.reveal-ready');
            revealElements.forEach(element => {
                revealObserver.observe(element);
            });

            // Also observe elements with reveal classes that aren't marked as ready
            const revealSelectors = [
                '.reveal:not(.revealed)',
                '.reveal-fade:not(.revealed)',
                '.reveal-left:not(.revealed)',
                '.reveal-right:not(.revealed)',
                '.reveal-scale:not(.revealed)',
                '.reveal-rotate:not(.revealed)',
                // Aura-specific classes
                '.aura-reveal:not(.aura-revealed)',
                '.aura-fade:not(.aura-revealed)',
                '.aura-flow:not(.aura-revealed)'
            ];

            revealSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    // Add initial hidden state for smoother animation
                    element.style.opacity = '0';
                    element.style.transform = getInitialTransform(element);
                    revealObserver.observe(element);
                });
            });

            auraLog('info', `Aura content reveal initialized with ${revealElements.length} elements under mystical observation`);
            return true;

        } catch (error) {
            auraLog('error', 'Failed to initialize aura content reveal', error);
            fallbackRevealAll();
            return false;
        }
    }

    /**
     * Reveals an element with appropriate aura animation
     * @param {Element} element - Element to reveal
     */
    function revealElement(element) {
        try {
            // Handle new reveal-ready class
            if (element.classList.contains('reveal-ready')) {
                element.classList.add('revealed');
            } else if (element.classList.contains('aura-reveal-ready')) {
                element.classList.add('aura-revealed');
            } else {
                // For elements with direct animation classes
                element.style.opacity = '1';
                element.style.transform = 'none';
                element.classList.add('revealed');
                element.classList.add('aura-revealed');
            }

            // Handle staggered children
            if (element.classList.contains('stagger-children') ||
                element.classList.contains('stagger-fast') ||
                element.classList.contains('aura-stagger-children') ||
                element.classList.contains('aura-stagger-fast')) {
                const children = element.children;
                Array.from(children).forEach((child, index) => {
                    const delay = (element.classList.contains('stagger-fast') ||
                                   element.classList.contains('aura-stagger-fast')) ?
                        (index + 1) * 50 : (index + 1) * 100;
                    
                    setTimeout(() => {
                        if (child.classList.contains('reveal-ready')) {
                            child.classList.add('revealed');
                        } else if (child.classList.contains('aura-reveal-ready')) {
                            child.classList.add('aura-revealed');
                        }
                    }, delay);
                });
            }

            auraLog('info', 'Element revealed by aura energy', { element: element.className });

        } catch (error) {
            auraLog('error', 'Aura failed to reveal element', error);
        }
    }

    /**
     * Gets the initial transform for an animation class
     * @param {Element} element - Element to check
     * @returns {string} Transform value
     */
    function getInitialTransform(element) {
        // Check new class names first
        if (element.classList.contains('reveal') ||
            element.classList.contains('reveal-fade')) {
            return 'translateY(30px)';
        } else if (element.classList.contains('reveal-left')) {
            return 'translateX(-30px)';
        } else if (element.classList.contains('reveal-right')) {
            return 'translateX(30px)';
        } else if (element.classList.contains('reveal-scale')) {
            return 'scale(0.95)';
        } else if (element.classList.contains('reveal-rotate')) {
            return 'rotate(-5deg) scale(0.95)';
        }
        // Aura-specific classes
        else if (element.classList.contains('aura-reveal') ||
            element.classList.contains('aura-fade')) {
            return 'translateY(30px)';
        } else if (element.classList.contains('aura-flow')) {
            return 'translateY(20px) scale(0.98)';
        }
        return 'translateY(20px)'; // Default
    }

    /**
     * Fallback function to reveal all elements immediately
     */
    function fallbackRevealAll() {
        try {
            const allRevealElements = document.querySelectorAll(`
                .reveal-ready,
                .reveal:not(.revealed),
                .reveal-fade:not(.revealed),
                .reveal-left:not(.revealed),
                .reveal-right:not(.revealed),
                .reveal-scale:not(.revealed),
                .reveal-rotate:not(.revealed),
                .aura-reveal-ready,
                .aura-reveal:not(.aura-revealed),
                .aura-fade:not(.aura-revealed),
                .aura-flow:not(.aura-revealed)
            `);

            allRevealElements.forEach(element => {
                element.style.opacity = '1';
                element.style.transform = 'none';
                element.classList.add('revealed');
                element.classList.add('aura-revealed');
                
                if (element.classList.contains('reveal-ready')) {
                    element.classList.add('revealed');
                } else if (element.classList.contains('aura-reveal-ready')) {
                    element.classList.add('aura-revealed');
                }
            });

            auraLog('info', `Aura fallback reveal applied to ${allRevealElements.length} elements`);

        } catch (error) {
            auraLog('error', 'Aura fallback reveal failed', error);
        }
    }

    /**
     * Manually reveal elements (useful for dynamic content)
     * @param {string|Element|NodeList} selector - Elements to reveal
     */
    function manualReveal(selector) {
        try {
            let elements;
            
            if (typeof selector === 'string') {
                elements = document.querySelectorAll(selector);
            } else if (selector.nodeType) {
                elements = [selector];
            } else if (selector.length !== undefined) {
                elements = selector;
            } else {
                auraLog('warn', 'Invalid selector for manual aura reveal', selector);
                return false;
            }

            Array.from(elements).forEach(element => {
                if (revealObserver) {
                    revealObserver.observe(element);
                } else {
                    revealElement(element);
                }
            });

            auraLog('info', `Manual aura reveal applied to ${elements.length} elements`);
            return true;

        } catch (error) {
            auraLog('error', 'Manual aura reveal failed', error);
            return false;
        }
    }

    /**
     * Refresh the reveal observer (useful after DOM changes)
     */
    function refreshRevealObserver() {
        try {
            if (revealObserver) {
                revealObserver.disconnect();
                initializeContentReveal();
                return true;
            }
            return false;
        } catch (error) {
            auraLog('error', 'Failed to refresh aura reveal observer', error);
            return false;
        }
    }

    // =================================================================
    // AURA DEPENDENCY INJECTION SYSTEM
    // =================================================================

    /**
     * Initialize aura injection points for different platforms
     * @returns {boolean} Success status
     */
    function initializeAuraInjectionPoints() {
        try {
            // Detect platform and configure injection points
            const platform = detectPlatform();
            auraLog('info', `Aura energy detected platform: ${platform}`);

            // Set up injection capabilities based on platform
            const platformConfig = AURA_CONFIG.delivery.platforms[platform] ||
                                 AURA_CONFIG.delivery.platforms['github-pages']; // Default fallback

            // Store platform info globally for access
            window.AuraPlatform = {
                name: platform,
                config: platformConfig,
                injectionPoints: AURA_CONFIG.delivery.injectionPoints,
                energyLevel: platformConfig.energyLevel
            };

            auraLog('info', 'Aura injection points initialized', platformConfig);
            return true;

        } catch (error) {
            auraLog('error', 'Failed to initialize aura injection points', error);
            return false;
        }
    }

    /**
     * Detect the current platform for aura energy optimization
     * @returns {string} Platform name
     */
    function detectPlatform() {
        // Check for Super.so
        if (window.location.hostname.includes('.super.site') ||
            window.location.hostname.includes('.super.so') ||
            document.querySelector('meta[name="generator"][content*="Super"]')) {
            return 'super.so';
        }
        
        // Check for GitHub Pages
        if (window.location.hostname.includes('.github.io')) {
            return 'github-pages';
        }
        
        // Check for Vercel
        if (window.location.hostname.includes('.vercel.app') ||
            document.querySelector('meta[name="generator"][content*="Vercel"]')) {
            return 'vercel';
        }
        
        // Check for Netlify
        if (window.location.hostname.includes('.netlify.app') ||
            window.location.hostname.includes('.netlify.com') ||
            document.querySelector('meta[name="generator"][content*="Netlify"]')) {
            return 'netlify';
        }

        // Default fallback
        return 'static';
    }

    /**
     * Inject CSS dependencies with aura energy
     * @param {string|Array} cssUrls - CSS URLs to inject
     * @param {string} injectionPoint - Where to inject (head, bodyStart, bodyEnd)
     */
    function injectCSS(cssUrls, injectionPoint = 'head') {
        try {
            const urls = Array.isArray(cssUrls) ? cssUrls : [cssUrls];
            
            urls.forEach(url => {
                const link = createElement('link', {
                    attributes: {
                        rel: 'stylesheet',
                        href: url,
                        'data-aura-injection': 'true'
                    }
                });

                if (injectionPoint === 'head' && document.head) {
                    document.head.appendChild(link);
                } else if (injectionPoint === 'bodyStart' && document.body) {
                    document.body.prepend(link);
                } else if (injectionPoint === 'bodyEnd' && document.body) {
                    document.body.appendChild(link);
                }

                auraLog('info', `CSS channeled via aura: ${url} at ${injectionPoint}`);
            });

            return true;

        } catch (error) {
            auraLog('error', 'Failed to inject CSS via aura', error);
            return false;
        }
    }

    /**
     * Inject JavaScript dependencies with aura energy
     * @param {string|Array} jsUrls - JavaScript URLs to inject
     * @param {string} injectionPoint - Where to inject
     * @param {Object} options - Additional options
     */
    function injectJS(jsUrls, injectionPoint = 'bodyEnd', options = {}) {
        try {
            const urls = Array.isArray(jsUrls) ? jsUrls : [jsUrls];
            
            urls.forEach(url => {
                const script = createElement('script', {
                    attributes: {
                        src: url,
                        'data-aura-injection': 'true',
                        ...(options.async && { async: true }),
                        ...(options.defer && { defer: true })
                    }
                });

                if (injectionPoint === 'head' && document.head) {
                    document.head.appendChild(script);
                } else if (injectionPoint === 'bodyStart' && document.body) {
                    document.body.prepend(script);
                } else if (injectionPoint === 'bodyEnd' && document.body) {
                    document.body.appendChild(script);
                }

                auraLog('info', `JavaScript channeled via aura: ${url} at ${injectionPoint}`);
            });

            return true;

        } catch (error) {
            auraLog('error', 'Failed to inject JavaScript via aura', error);
            return false;
        }
    }

    // =================================================================
    // AURA SYSTEM STATUS & MYSTICAL REPORTING
    // =================================================================

    /**
     * Reports aura system status to console
     */
    function reportAuraSystemStatus() {
        // Only report status in debug mode
        if (!AURA_CONFIG.debug) {
            return null;
        }
        
        const status = {
            name: AURA_CONFIG.name,
            version: AURA_CONFIG.version,
            philosophy: AURA_CONFIG.philosophy,
            timestamp: new Date().toISOString(),
            platform: window.AuraPlatform?.name || 'unknown',
            energyLevel: window.AuraPlatform?.energyLevel || 'unknown',
            features: {
                cssSupported: !!window.CSS,
                localStorageAvailable: !!window.localStorage,
                touchSupported: 'ontouchstart' in window,
                intersectionObserver: 'IntersectionObserver' in window,
                animationSupported: 'animate' in document.createElement('div'),
                dependencyInjection: true,
                auraEnergy: true
            },
            delivery: {
                cdnBase: AURA_CONFIG.delivery.cdnBase,
                auraSource: AURA_CONFIG.delivery.auraSource,
                platformSupported: !!window.AuraPlatform,
                injectionPointsReady: !!document.head && !!document.body
            }
        };

        auraLog('info', 'Aura System Status Report', status);
        
        // Store status in global namespace for external access
        window.AuraStatus = status;
        
        return status;
    }

    /**
     * Checks for potential conflicts or aura disruptions
     */
    function performAuraSystemCheck() {
        const issues = [];
        
        // Check for jQuery conflicts
        if (window.$ && window.$.fn && !window.$.fn.jquery) {
            issues.push('Potential jQuery conflict detected in aura field');
        }
        
        // Check for CSS custom properties support
        if (!window.CSS || !window.CSS.supports('color', 'var(--test)')) {
            issues.push('CSS custom properties not supported - aura styling limited');
        }
        
        // Check if existing Aura instance
        if (window.AuraCore && window.AuraCore.version !== AURA_CONFIG.version) {
            issues.push(`Aura version conflict: existing v${window.AuraCore.version}, loading v${AURA_CONFIG.version}`);
        }
        
        if (issues.length > 0) {
            auraLog('warn', 'Aura system check found potential energy disruptions', issues);
        } else {
            auraLog('info', 'Aura system check passed - energy field clear');
        }
        
        return issues;
    }

    // =================================================================
    // AURA INITIALIZATION & PUBLIC API
    // =================================================================

    /**
     * Main aura initialization function
     * @param {Object} options - Configuration options
     */
    function initialize(options = {}) {
        try {
            auraLog('info', `Channeling ${AURA_CONFIG.name} v${AURA_CONFIG.version}...`);
            
            // Merge custom options
            Object.assign(AURA_CONFIG, options);
            
            // Perform aura system checks
            const issues = performAuraSystemCheck();
            
            // Report aura system status
            reportAuraSystemStatus();
            
            // Check DOM readiness
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    startAuraDeliverySystem();
                });
            } else {
                startAuraDeliverySystem();
            }
            
            auraLog('info', 'Aura initialization completed successfully - energy field active');
            return true;
            
        } catch (error) {
            auraLog('error', 'Aura initialization failed', error);
            return false;
        }
    }

    /**
     * Starts the aura dependency delivery system
     */
    function startAuraDeliverySystem() {
        try {
            auraLog('info', 'Starting aura dependency delivery system...');
            
            // Initialize aura dependency delivery system
            initializeAuraDependencyDelivery();
            
            // Production mode: Delivery functionality available via API calls
            auraLog('info', 'Aura dependency delivery system loaded successfully - digital energy flowing');
            
        } catch (error) {
            auraLog('error', 'Failed to start aura delivery system', error);
        }
    }

    // =================================================================
    // AURA CORE PUBLIC API DEFINITION
    // =================================================================

    /**
     * Aura Core Public API object
     */
    const AuraCore = {
        // Core information
        name: AURA_CONFIG.name,
        version: AURA_CONFIG.version,
        philosophy: AURA_CONFIG.philosophy,
        
        // Main methods
        init: initialize,
        log: auraLog,
        
        // Utility methods
        createElement: createElement,
        safeQuery: safeQuery,
        
        // Animation methods
        initReveal: initializeContentReveal,
        manualReveal: manualReveal,
        refreshReveal: refreshRevealObserver,
        
        // Aura-specific methods
        injectCSS: injectCSS,
        injectJS: injectJS,
        
        // Feature methods
        reportStatus: reportAuraSystemStatus,
        systemCheck: performAuraSystemCheck,
        
        // Configuration
        config: AURA_CONFIG,
        
        // Aura theme system
        setTheme: function(themeName) {
            if (AURA_CONFIG.branding[themeName]) {
                const color = AURA_CONFIG.branding[themeName];
                const root = document.documentElement;
                root.style.setProperty('--aura-primary', color);
                root.style.setProperty('--aura-theme', color);
                auraLog('info', `Aura theme applied: ${themeName}`);
                return true;
            }
            auraLog('warn', `Aura theme not found: ${themeName}`);
            return false;
        },
        
        // Energy level control
        setEnergyLevel: function(level) {
            if (window.AuraPlatform) {
                window.AuraPlatform.energyLevel = level;
                auraLog('info', `Aura energy level set to: ${level}`);
                return true;
            }
            return false;
        }
    };

    // =================================================================
    // AURA GLOBAL NAMESPACE SETUP
    // =================================================================

    // Expose to global namespace
    window.AuraCore = AuraCore;
    window.Aura = AuraCore; // Short alias
    
    // Auto-initialize if not disabled
    if (!window.AuraNoAutoInit) {
        // Small delay to ensure everything is ready
        setTimeout(() => {
            initialize();
        }, 100);
    }

    auraLog('info', 'Aura Core library loaded and ready - The Ingenuity Co digital energy field active');

})(window, document);