/*!
 * Aura Core v3.0.0 - Minimal CSS & JS Injection System
 * The Ingenuity Co's Lightweight Digital Presence Extension
 *
 * Simple system for injecting CSS and JS files from v1/ directory on Super.so/Next.js sites
 * with route change detection and automatic reinjection.
 *
 * Author: The Ingenuity Co Development Team
 * License: MIT
 */

(function(window, document) {
    'use strict';

    // =================================================================
    // CORE CONFIGURATION
    // =================================================================

    const CONFIG = {
        version: '3.0.0',
        cssPath: './aura.css',
        jsBasePath: './v1/js/',
        debug: false,
        cssId: 'aura-core-css',
        jsIdPrefix: 'aura-js-'
    };

    // Track injected JS files
    const injectedJS = new Map();

    // =================================================================
    // UTILITY FUNCTIONS
    // =================================================================

    /**
     * Simple debug logging
     */
    function log(message, data) {
        if (CONFIG.debug) {
            console.log(`[Aura] ${message}`, data || '');
        }
    }

    /**
     * Check if we're on a Next.js platform (Super.so uses Next.js)
     */
    function isNextJS() {
        return !!(
            window.__NEXT_DATA__ ||
            window.next ||
            document.querySelector('script[src*="_next"]') ||
            document.querySelector('#__next') ||
            window.location.hostname.includes('.super.site') ||
            window.location.hostname.includes('.super.so')
        );
    }

    /**
     * Check if CSS is already injected
     */
    function isCSSInjected() {
        return !!document.getElementById(CONFIG.cssId);
    }

    /**
     * Inject the core CSS file
     */
    function injectCSS() {
        if (isCSSInjected()) {
            log('CSS already injected, skipping');
            return true;
        }

        try {
            const link = document.createElement('link');
            link.id = CONFIG.cssId;
            link.rel = 'stylesheet';
            link.href = CONFIG.cssPath;
            link.setAttribute('data-aura-injection', 'true');

            // Inject into head
            if (document.head) {
                document.head.appendChild(link);
                log(`CSS injected: ${CONFIG.cssPath}`);
                return true;
            } else {
                log('Document head not available');
                return false;
            }
        } catch (error) {
            log('Failed to inject CSS', error);
            return false;
        }
    }

    /**
     * Remove injected CSS
     */
    function removeCSS() {
        const existing = document.getElementById(CONFIG.cssId);
        if (existing) {
            existing.remove();
            log('CSS removed');
            return true;
        }
        return false;
    }

    /**
     * Reinject CSS (useful after route changes)
     */
    function reinjectCSS() {
        removeCSS();
        return injectCSS();
    }

    // =================================================================
    // JAVASCRIPT INJECTION FUNCTIONS
    // =================================================================

    /**
     * Validate JS file path for security
     */
    function validateJSPath(filePath) {
        if (!filePath || typeof filePath !== 'string') {
            return false;
        }

        // Normalize path separators and remove leading slashes
        const normalizedPath = filePath.replace(/\\/g, '/').replace(/^\/+/, '');
        
        // Must start with v1/js/ or js/
        if (!normalizedPath.startsWith('v1/js/') && !normalizedPath.startsWith('js/')) {
            log(`Invalid JS path: ${filePath} - must start with v1/js/ or js/`);
            return false;
        }

        // Prevent directory traversal
        if (normalizedPath.includes('../') || normalizedPath.includes('..\\')) {
            log(`Invalid JS path: ${filePath} - directory traversal not allowed`);
            return false;
        }

        // Must end with .js
        if (!normalizedPath.endsWith('.js')) {
            log(`Invalid JS path: ${filePath} - must be a .js file`);
            return false;
        }

        return true;
    }

    /**
     * Inject a JavaScript file
     */
    function injectJS(filePath) {
        if (!validateJSPath(filePath)) {
            log(`JS injection failed: invalid path ${filePath}`);
            return false;
        }

        // Normalize path for consistency
        const normalizedPath = filePath.replace(/\\/g, '/').replace(/^\/+/, '');
        
        // Check if already injected
        if (injectedJS.has(normalizedPath)) {
            log(`JS already injected: ${normalizedPath}`);
            return true;
        }

        try {
            const script = document.createElement('script');
            const scriptId = CONFIG.jsIdPrefix + normalizedPath.replace(/[^a-zA-Z0-9]/g, '-');
            
            script.id = scriptId;
            script.src = './' + normalizedPath;
            script.setAttribute('data-aura-injection', 'true');
            script.type = 'text/javascript';

            // Add load and error handlers
            script.onload = function() {
                log(`JS loaded successfully: ${normalizedPath}`);
                injectedJS.set(normalizedPath, {
                    element: script,
                    loaded: true,
                    injectedAt: Date.now()
                });
            };

            script.onerror = function() {
                log(`JS failed to load: ${normalizedPath}`);
                injectedJS.delete(normalizedPath);
            };

            // Inject into head
            if (document.head) {
                document.head.appendChild(script);
                log(`JS injection started: ${normalizedPath}`);
                
                // Mark as injecting immediately to prevent duplicates
                injectedJS.set(normalizedPath, {
                    element: script,
                    loaded: false,
                    injectedAt: Date.now()
                });
                
                return true;
            } else {
                log('Document head not available for JS injection');
                return false;
            }
        } catch (error) {
            log(`Failed to inject JS: ${filePath}`, error);
            return false;
        }
    }

    // =================================================================
    // ROUTE CHANGE MONITORING
    // =================================================================

    /**
     * Set up route change monitoring for Next.js/SPA apps
     */
    function setupRouteMonitoring() {
        if (!isNextJS()) {
            log('Not a Next.js app, skipping route monitoring');
            return;
        }

        log('Setting up Next.js route change monitoring');

        // Monitor popstate events (back/forward navigation)
        window.addEventListener('popstate', () => {
            setTimeout(() => {
                log('Route change detected (popstate)');
                if (!isCSSInjected()) {
                    injectCSS();
                }
            }, 100);
        });

        // Override pushState and replaceState to detect programmatic navigation
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        history.pushState = function() {
            originalPushState.apply(history, arguments);
            setTimeout(() => {
                log('Route change detected (pushState)');
                if (!isCSSInjected()) {
                    injectCSS();
                }
            }, 100);
        };

        history.replaceState = function() {
            originalReplaceState.apply(history, arguments);
            setTimeout(() => {
                log('Route change detected (replaceState)');
                if (!isCSSInjected()) {
                    injectCSS();
                }
            }, 100);
        };

        // Also monitor for Next.js router events if available
        if (window.next?.router) {
            const router = window.next.router;
            if (router.events?.on) {
                router.events.on('routeChangeComplete', () => {
                    setTimeout(() => {
                        log('Next.js route change complete');
                        if (!isCSSInjected()) {
                            injectCSS();
                        }
                    }, 100);
                });
            }
        }
    }

    /**
     * Check for CSS periodically (fallback)
     */
    function setupPeriodicCheck() {
        setInterval(() => {
            if (!isCSSInjected()) {
                log('CSS missing, reinjecting');
                injectCSS();
            }
        }, 5000); // Check every 5 seconds
    }

    // =================================================================
    // INITIALIZATION
    // =================================================================

    /**
     * Initialize Aura system
     */
    function init() {
        log('Initializing Aura Core v' + CONFIG.version);

        // Inject CSS immediately
        const success = injectCSS();
        
        if (success) {
            // Set up route monitoring for dynamic apps
            setupRouteMonitoring();
            
            // Set up periodic check as fallback
            setupPeriodicCheck();
            
            log('Aura Core initialized successfully');
            return true;
        } else {
            log('Aura Core initialization failed');
            return false;
        }
    }

    // =================================================================
    // PUBLIC API
    // =================================================================

    const AuraCore = {
        version: CONFIG.version,
        
        init: function() {
            return init();
        },
        
        reinject: function() {
            log('Manual CSS reinjection requested');
            return reinjectCSS();
        },
        
        isNextJS: function() {
            return isNextJS();
        },
        
        injectJS: function(filePath) {
            return injectJS(filePath);
        }
    };

    // =================================================================
    // GLOBAL SETUP
    // =================================================================

    // Expose to global namespace
    window.AuraCore = AuraCore;
    window.Aura = AuraCore; // Alias

    // Auto-initialize when DOM is ready
    function autoInit() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            // DOM already ready, initialize immediately
            setTimeout(init, 10);
        }
    }

    // Start auto-initialization unless disabled
    if (!window.AuraNoAutoInit) {
        autoInit();
    }

    log('Aura Core library loaded');

})(window, document);