/*!
 * The Ingenuity Co - Core JavaScript Library
 * CDN Enhancement System v1.0.0
 * 
 * This is the core JavaScript library for The Ingenuity Co website enhancements.
 * Provides initialization, utilities, and branded demonstration functionality.
 * 
 * Features:
 * - Branded Hello World demonstration
 * - Console logging with company branding
 * - Interactive elements with brand styling
 * - Error handling and initialization checks
 * - Version tracking and status reporting
 * 
 * Usage: Designed to be loaded via Super.so's end-of-body injection
 * Author: The Ingenuity Co Development Team
 * License: Proprietary
 */

(function(window, document) {
    'use strict';

    // =================================================================
    // CONSTANTS & CONFIGURATION
    // =================================================================

    const INGENUITY_CONFIG = {
        name: 'The Ingenuity Co Enhancement System',
        version: '1.0.0',
        namespace: 'IngenuityCore',
        debug: true,
        brandColors: {
            primary: '#FF6B35',
            secondary: '#2E86AB', 
            accent: '#F7931E',
            neutral: '#4A4A4A',
            white: '#FFFFFF',
            light: '#F8F9FA'
        },
        animation: {
            duration: 300,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }
    };

    // =================================================================
    // UTILITY FUNCTIONS
    // =================================================================

    /**
     * Enhanced console logging with Ingenuity branding
     * @param {string} level - Log level (log, info, warn, error)
     * @param {string} message - Message to log
     * @param {*} data - Optional data to log
     */
    function brandedLog(level, message, data) {
        if (!INGENUITY_CONFIG.debug) return;
        
        const styles = {
            brand: `
                background: linear-gradient(135deg, ${INGENUITY_CONFIG.brandColors.primary}, ${INGENUITY_CONFIG.brandColors.accent});
                color: white;
                padding: 2px 8px;
                border-radius: 4px;
                font-weight: 600;
                font-size: 11px;
            `,
            message: `
                color: ${INGENUITY_CONFIG.brandColors.neutral};
                font-weight: 500;
            `
        };

        const brandLabel = '🚀 INGENUITY';
        
        if (data !== undefined) {
            console[level](`%c${brandLabel}%c ${message}`, styles.brand, styles.message, data);
        } else {
            console[level](`%c${brandLabel}%c ${message}`, styles.brand, styles.message);
        }
    }

    /**
     * Safely query DOM elements with error handling
     * @param {string} selector - CSS selector
     * @param {Element} context - Optional context element
     * @returns {Element|null}
     */
    function safeQuery(selector, context = document) {
        try {
            return context.querySelector(selector);
        } catch (error) {
            brandedLog('warn', `Invalid selector: ${selector}`, error);
            return null;
        }
    }

    /**
     * Create element with attributes and styles
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
            brandedLog('error', 'Failed to create element', { tag, options, error });
            return document.createElement('div'); // Fallback
        }
    }

    /**
     * Add event listener with error handling
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
            brandedLog('warn', `Failed to add event listener: ${event}`, error);
            return false;
        }
    }

    // =================================================================
    // BRANDED HELLO WORLD FUNCTIONALITY
    // =================================================================

    /**
     * Creates and displays the branded Hello World banner
     * @returns {Element|null} Created banner element
     */
    function createHelloWorldBanner() {
        try {
            brandedLog('info', 'Creating Hello World banner...');

            // Create banner container
            const banner = createElement('div', {
                attributes: {
                    'id': 'ingenuity-hello-banner',
                    'role': 'alert',
                    'aria-live': 'polite'
                },
                styles: {
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: '9999',
                    background: `linear-gradient(135deg, ${INGENUITY_CONFIG.brandColors.primary}, ${INGENUITY_CONFIG.brandColors.accent})`,
                    color: INGENUITY_CONFIG.brandColors.white,
                    padding: '20px 24px',
                    borderRadius: '12px',
                    boxShadow: `0 8px 25px rgba(255, 107, 53, 0.3)`,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '16px',
                    fontWeight: '600',
                    lineHeight: '1.5',
                    maxWidth: '350px',
                    cursor: 'pointer',
                    transform: 'translateX(120%)',
                    transition: `all ${INGENUITY_CONFIG.animation.duration}ms ${INGENUITY_CONFIG.animation.easing}`,
                    userSelect: 'none'
                }
            });

            // Create banner content
            const content = createElement('div', {
                html: `
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <div style="font-size: 24px; margin-right: 8px;">🎉</div>
                        <div style="font-size: 18px; font-weight: 700;">Hello from The Ingenuity Co!</div>
                    </div>
                    <div style="font-size: 14px; opacity: 0.9; margin-bottom: 12px;">
                        CDN-hosted enhancements are working perfectly!
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <small style="opacity: 0.8;">v${INGENUITY_CONFIG.version} • Click to interact</small>
                        <div style="width: 20px; height: 20px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px;">×</div>
                    </div>
                `
            });

            banner.appendChild(content);

            // Add interaction behaviors
            setupBannerInteractions(banner);

            // Add to DOM
            document.body.appendChild(banner);

            // Animate in after a short delay
            setTimeout(() => {
                banner.style.transform = 'translateX(0)';
                brandedLog('info', 'Hello World banner displayed successfully');
            }, 100);

            return banner;

        } catch (error) {
            brandedLog('error', 'Failed to create Hello World banner', error);
            return null;
        }
    }

    /**
     * Sets up interactive behaviors for the banner
     * @param {Element} banner - Banner element
     */
    function setupBannerInteractions(banner) {
        if (!banner) return;

        let interactionCount = 0;

        // Hover effects
        safeAddEventListener(banner, 'mouseenter', function() {
            this.style.transform = 'translateX(0) scale(1.02)';
            this.style.boxShadow = '0 12px 30px rgba(255, 107, 53, 0.4)';
        });

        safeAddEventListener(banner, 'mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.3)';
        });

        // Click interactions
        safeAddEventListener(banner, 'click', function(e) {
            e.preventDefault();
            interactionCount++;

            brandedLog('info', `Banner interaction #${interactionCount}`, { timestamp: new Date().toLocaleTimeString() });

            if (interactionCount === 1) {
                // First click: Transform banner
                transformBanner(this);
            } else if (interactionCount === 2) {
                // Second click: Change content
                updateBannerContent(this);
            } else {
                // Third click: Dismiss with animation
                dismissBanner(this);
            }
        });

        // Keyboard accessibility
        banner.setAttribute('tabindex', '0');
        safeAddEventListener(banner, 'keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            } else if (e.key === 'Escape') {
                dismissBanner(this);
            }
        });
    }

    /**
     * Transforms the banner appearance
     * @param {Element} banner - Banner element
     */
    function transformBanner(banner) {
        brandedLog('info', 'Transforming banner...');
        
        banner.style.background = `linear-gradient(135deg, ${INGENUITY_CONFIG.brandColors.secondary}, ${INGENUITY_CONFIG.brandColors.primary})`;
        banner.style.borderRadius = '20px';
        banner.style.transform = 'translateX(0) rotate(2deg)';
        
        // Update content to indicate transformation
        const firstDiv = banner.querySelector('div > div:first-child');
        if (firstDiv) {
            firstDiv.innerHTML = `
                <div style="font-size: 24px; margin-right: 8px;">✨</div>
                <div style="font-size: 18px; font-weight: 700;">Banner Transformed!</div>
            `;
        }
    }

    /**
     * Updates banner content
     * @param {Element} banner - Banner element
     */
    function updateBannerContent(banner) {
        brandedLog('info', 'Updating banner content...');
        
        banner.style.background = `linear-gradient(135deg, ${INGENUITY_CONFIG.brandColors.accent}, ${INGENUITY_CONFIG.brandColors.secondary})`;
        banner.style.transform = 'translateX(0) rotate(-1deg) scale(1.05)';
        
        const content = banner.querySelector('div');
        if (content) {
            content.innerHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <div style="font-size: 24px; margin-right: 8px;">🚀</div>
                    <div style="font-size: 18px; font-weight: 700;">Ready for Launch!</div>
                </div>
                <div style="font-size: 14px; opacity: 0.9; margin-bottom: 12px;">
                    Your Ingenuity Co enhancements are fully loaded and operational.
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <small style="opacity: 0.8;">Click once more to dismiss</small>
                    <div style="width: 20px; height: 20px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px;">👋</div>
                </div>
            `;
        }
    }

    /**
     * Dismisses the banner with animation
     * @param {Element} banner - Banner element
     */
    function dismissBanner(banner) {
        brandedLog('info', 'Dismissing banner...');
        
        banner.style.transform = 'translateX(120%) scale(0.8)';
        banner.style.opacity = '0';
        
        setTimeout(() => {
            if (banner && banner.parentNode) {
                banner.parentNode.removeChild(banner);
                brandedLog('info', 'Banner dismissed successfully');
            }
        }, INGENUITY_CONFIG.animation.duration);
    }

    // =================================================================
    // SYSTEM STATUS & REPORTING
    // =================================================================

    /**
     * Reports system status to console
     */
    function reportSystemStatus() {
        const status = {
            name: INGENUITY_CONFIG.name,
            version: INGENUITY_CONFIG.version,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            features: {
                cssSupported: !!window.CSS,
                localStorageAvailable: !!window.localStorage,
                touchSupported: 'ontouchstart' in window
            }
        };

        brandedLog('info', 'System Status Report', status);
        
        // Store status in global namespace for external access
        window.IngenuityStatus = status;
        
        return status;
    }

    /**
     * Checks for potential conflicts or issues
     */
    function performSystemCheck() {
        const issues = [];
        
        // Check for jQuery conflicts
        if (window.$ && window.$.fn && !window.$.fn.jquery) {
            issues.push('Potential jQuery conflict detected');
        }
        
        // Check for CSS custom properties support
        if (!window.CSS || !window.CSS.supports('color', 'var(--test)')) {
            issues.push('CSS custom properties not supported');
        }
        
        // Check if existing Ingenuity instance
        if (window.IngenuityCore && window.IngenuityCore.version !== INGENUITY_CONFIG.version) {
            issues.push(`Version conflict: existing v${window.IngenuityCore.version}, loading v${INGENUITY_CONFIG.version}`);
        }
        
        if (issues.length > 0) {
            brandedLog('warn', 'System check found potential issues', issues);
        } else {
            brandedLog('info', 'System check passed - no issues detected');
        }
        
        return issues;
    }

    // =================================================================
    // INITIALIZATION & PUBLIC API
    // =================================================================

    /**
     * Main initialization function
     * @param {Object} options - Configuration options
     */
    function initialize(options = {}) {
        try {
            brandedLog('info', `Initializing ${INGENUITY_CONFIG.name} v${INGENUITY_CONFIG.version}...`);
            
            // Merge custom options
            Object.assign(INGENUITY_CONFIG, options);
            
            // Perform system checks
            const issues = performSystemCheck();
            
            // Report system status
            reportSystemStatus();
            
            // Check DOM readiness
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    startEnhancements();
                });
            } else {
                startEnhancements();
            }
            
            brandedLog('info', 'Initialization completed successfully');
            return true;
            
        } catch (error) {
            brandedLog('error', 'Initialization failed', error);
            return false;
        }
    }

    /**
     * Starts the enhancement features
     */
    function startEnhancements() {
        try {
            brandedLog('info', 'Starting enhancements...');
            
            // Small delay to ensure page is fully rendered
            setTimeout(() => {
                // Create and display Hello World banner
                const banner = createHelloWorldBanner();
                
                if (banner) {
                    brandedLog('info', 'All enhancements started successfully');
                } else {
                    brandedLog('warn', 'Some enhancements failed to start');
                }
            }, 500);
            
        } catch (error) {
            brandedLog('error', 'Failed to start enhancements', error);
        }
    }

    // =================================================================
    // PUBLIC API DEFINITION
    // =================================================================

    /**
     * Public API object
     */
    const IngenuityCore = {
        // Core information
        name: INGENUITY_CONFIG.name,
        version: INGENUITY_CONFIG.version,
        
        // Main methods
        init: initialize,
        log: brandedLog,
        
        // Utility methods
        createElement: createElement,
        safeQuery: safeQuery,
        
        // Feature methods
        createHelloWorld: createHelloWorldBanner,
        reportStatus: reportSystemStatus,
        systemCheck: performSystemCheck,
        
        // Configuration
        config: INGENUITY_CONFIG
    };

    // =================================================================
    // GLOBAL NAMESPACE SETUP
    // =================================================================

    // Expose to global namespace
    window.IngenuityCore = IngenuityCore;
    
    // Auto-initialize if not disabled
    if (!window.IngenuityNoAutoInit) {
        // Small delay to ensure everything is ready
        setTimeout(() => {
            initialize();
        }, 100);
    }

    brandedLog('info', 'Core library loaded and ready');

})(window, document);