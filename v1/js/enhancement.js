/*!
 * The Ingenuity Co - Main Enhancement Entry Point
 * CDN Enhancement System v1.0.0
 * 
 * This is the main JavaScript file for The Ingenuity Co website enhancements.
 * It serves as the primary entry point for Super.so integration and imports
 * the core functionality from ingenuity.js.
 * 
 * Features:
 * - Imports and initializes the core Ingenuity library
 * - Provides branded Hello World demonstration
 * - Handles Super.so integration points
 * - Manages configuration and feature flags
 * - Ensures non-intrusive operation
 * - Comprehensive error handling
 * 
 * Integration: Load this file via Super.so's "End of Body" injection point
 * Dependencies: Requires /v1/js/core/ingenuity.js
 * Author: The Ingenuity Co Development Team
 * License: Proprietary
 */

(function(window, document) {
    'use strict';

    // =================================================================
    // CONFIGURATION & CONSTANTS
    // =================================================================

    const ENHANCEMENT_CONFIG = {
        name: 'The Ingenuity Co Enhancement System',
        version: '1.0.0',
        cdnBase: 'https://cdn.theingenuity.co/v1', // Update with actual CDN URL
        features: {
            helloWorld: true,
            brandedLogging: true,
            interactiveBanner: true,
            errorReporting: true,
            statusReporting: true
        },
        initialization: {
            autoStart: true,
            delayMs: 250,
            maxRetries: 3,
            retryDelayMs: 1000
        },
        compatibility: {
            checkConflicts: true,
            gracefulDegradation: true,
            respectUserPreferences: true
        }
    };

    // =================================================================
    // UTILITY FUNCTIONS
    // =================================================================

    /**
     * Enhanced logging specifically for the enhancement system
     * @param {string} level - Log level
     * @param {string} message - Message to log
     * @param {*} data - Optional data
     */
    function enhancementLog(level, message, data) {
        const styles = {
            brand: `
                background: linear-gradient(135deg, #FF6B35, #F7931E);
                color: white;
                padding: 2px 8px;
                border-radius: 4px;
                font-weight: 600;
                font-size: 11px;
            `,
            system: `
                background: #2E86AB;
                color: white;
                padding: 2px 6px;
                border-radius: 3px;
                font-size: 10px;
                margin-left: 4px;
            `,
            message: `color: #4A4A4A; font-weight: 500;`
        };

        const timestamp = new Date().toLocaleTimeString();
        const enhancementLabel = '🚀 INGENUITY';
        const systemLabel = 'ENH';
        
        if (data !== undefined) {
            console[level](`%c${enhancementLabel}%c${systemLabel}%c ${message} [${timestamp}]`, 
                          styles.brand, styles.system, styles.message, data);
        } else {
            console[level](`%c${enhancementLabel}%c${systemLabel}%c ${message} [${timestamp}]`, 
                          styles.brand, styles.system, styles.message);
        }
    }

    /**
     * Checks if the core library is available
     * @returns {boolean} True if core library is loaded
     */
    function isCoreLibraryAvailable() {
        return typeof window.IngenuityCore !== 'undefined' && 
               window.IngenuityCore && 
               typeof window.IngenuityCore.init === 'function';
    }

    /**
     * Dynamically loads the core library if not available
     * @returns {Promise} Promise that resolves when library is loaded
     */
    function loadCoreLibrary() {
        return new Promise((resolve, reject) => {
            enhancementLog('info', 'Loading core library...');

            const script = document.createElement('script');
            script.src = `${ENHANCEMENT_CONFIG.cdnBase}/js/core/ingenuity.js`;
            script.async = true;
            script.onload = function() {
                enhancementLog('info', 'Core library loaded successfully');
                resolve();
            };
            script.onerror = function() {
                enhancementLog('error', 'Failed to load core library');
                reject(new Error('Core library failed to load'));
            };

            document.head.appendChild(script);
        });
    }

    /**
     * Waits for the core library with retry mechanism
     * @param {number} retryCount - Current retry attempt
     * @returns {Promise} Promise that resolves when core is available
     */
    function waitForCoreLibrary(retryCount = 0) {
        return new Promise((resolve, reject) => {
            if (isCoreLibraryAvailable()) {
                resolve();
                return;
            }

            if (retryCount >= ENHANCEMENT_CONFIG.initialization.maxRetries) {
                reject(new Error(`Core library not available after ${retryCount} retries`));
                return;
            }

            enhancementLog('info', `Waiting for core library... (attempt ${retryCount + 1})`);

            setTimeout(() => {
                waitForCoreLibrary(retryCount + 1)
                    .then(resolve)
                    .catch(reject);
            }, ENHANCEMENT_CONFIG.initialization.retryDelayMs);
        });
    }

    // =================================================================
    // CONFIGURATION MANAGEMENT
    // =================================================================

    /**
     * Processes configuration from various sources
     * @returns {Object} Final configuration object
     */
    function processConfiguration() {
        let finalConfig = { ...ENHANCEMENT_CONFIG };

        // Check for global configuration
        if (window.IngenuityConfig) {
            enhancementLog('info', 'Found global configuration', window.IngenuityConfig);
            finalConfig = {
                ...finalConfig,
                ...window.IngenuityConfig
            };
        }

        // Check for URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('ingenuity-debug')) {
            finalConfig.debug = urlParams.get('ingenuity-debug') === 'true';
            enhancementLog('info', `Debug mode set via URL: ${finalConfig.debug}`);
        }

        // Respect user preferences
        if (ENHANCEMENT_CONFIG.compatibility.respectUserPreferences) {
            // Check for reduced motion preference
            if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                finalConfig.respectsReducedMotion = true;
                enhancementLog('info', 'Reduced motion preference detected');
            }

            // Check for high contrast preference
            if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
                finalConfig.highContrast = true;
                enhancementLog('info', 'High contrast preference detected');
            }
        }

        return finalConfig;
    }

    // =================================================================
    // SYSTEM COMPATIBILITY & SAFETY
    // =================================================================

    /**
     * Performs compatibility and safety checks
     * @returns {Object} Check results
     */
    function performCompatibilityCheck() {
        const results = {
            passed: true,
            warnings: [],
            errors: [],
            features: {}
        };

        // Check browser compatibility
        results.features.es6Support = typeof Symbol !== 'undefined';
        results.features.promiseSupport = typeof Promise !== 'undefined';
        results.features.cssCustomProps = window.CSS && CSS.supports('color', 'var(--test)');
        results.features.intersectionObserver = 'IntersectionObserver' in window;

        if (!results.features.es6Support) {
            results.warnings.push('Limited ES6 support detected - some features may not work');
        }

        if (!results.features.cssCustomProps) {
            results.warnings.push('CSS custom properties not supported - styling may be limited');
        }

        // Check for conflicts
        if (ENHANCEMENT_CONFIG.compatibility.checkConflicts) {
            // Check for other enhancement systems
            const potentialConflicts = [
                'IngenuityEnhancer', 
                'SuperSoEnhancer', 
                'NotionEnhancer'
            ];

            potentialConflicts.forEach(conflict => {
                if (window[conflict] && window[conflict] !== window.IngenuityCore) {
                    results.warnings.push(`Potential conflict detected: ${conflict}`);
                }
            });
        }

        // Check DOM readiness
        if (document.readyState === 'loading') {
            results.warnings.push('DOM still loading - enhancements will wait');
        }

        if (results.warnings.length > 0) {
            enhancementLog('warn', 'Compatibility check warnings', results.warnings);
        }

        if (results.errors.length > 0) {
            results.passed = false;
            enhancementLog('error', 'Compatibility check errors', results.errors);
        } else {
            enhancementLog('info', 'Compatibility check passed');
        }

        return results;
    }

    // =================================================================
    // MAIN ENHANCEMENT INITIALIZATION
    // =================================================================

    /**
     * Main initialization function for the enhancement system
     * @param {Object} userConfig - User-provided configuration
     * @returns {Promise} Promise that resolves when initialization is complete
     */
    async function initializeEnhancements(userConfig = {}) {
        try {
            enhancementLog('info', `Starting ${ENHANCEMENT_CONFIG.name} v${ENHANCEMENT_CONFIG.version}`);

            // Process configuration
            const config = processConfiguration();
            Object.assign(config, userConfig);

            // Perform compatibility check
            const compatCheck = performCompatibilityCheck();
            if (!compatCheck.passed && !config.compatibility?.gracefulDegradation) {
                throw new Error('Compatibility check failed and graceful degradation disabled');
            }

            // Wait for or load core library
            if (!isCoreLibraryAvailable()) {
                enhancementLog('info', 'Core library not found, attempting to load...');
                await loadCoreLibrary();
            }

            // Wait for core library to be ready
            await waitForCoreLibrary();

            // Initialize core library
            enhancementLog('info', 'Initializing core library...');
            const coreInitialized = window.IngenuityCore.init({
                ...config,
                debug: config.debug || false
            });

            if (!coreInitialized) {
                throw new Error('Core library initialization failed');
            }

            // Report successful initialization
            enhancementLog('info', 'Enhancement system initialized successfully');

            // Set up global reference
            window.IngenuityEnhancer = {
                version: ENHANCEMENT_CONFIG.version,
                config: config,
                core: window.IngenuityCore,
                initialized: true,
                initializationTime: Date.now()
            };

            return true;

        } catch (error) {
            enhancementLog('error', 'Enhancement initialization failed', error);
            
            // Attempt graceful degradation
            if (ENHANCEMENT_CONFIG.compatibility.gracefulDegradation) {
                enhancementLog('info', 'Attempting graceful degradation...');
                return initializeMinimalMode();
            }
            
            return false;
        }
    }

    /**
     * Minimal mode initialization for graceful degradation
     * @returns {boolean} Success status
     */
    function initializeMinimalMode() {
        try {
            enhancementLog('info', 'Initializing minimal mode...');

            // Create basic Hello World without advanced features
            const simpleHelloWorld = () => {
                const notice = document.createElement('div');
                notice.style.cssText = `
                    position: fixed; top: 20px; right: 20px; z-index: 9999;
                    background: #FF6B35; color: white; padding: 15px 20px;
                    border-radius: 8px; font-family: sans-serif;
                    font-size: 14px; font-weight: 600; cursor: pointer;
                `;
                notice.textContent = '🎉 Hello from The Ingenuity Co!';
                notice.onclick = () => notice.remove();
                document.body.appendChild(notice);

                setTimeout(() => notice.remove(), 5000);
                enhancementLog('info', 'Minimal Hello World displayed');
            };

            // Wait for DOM then show minimal hello world
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', simpleHelloWorld);
            } else {
                setTimeout(simpleHelloWorld, 100);
            }

            // Set up minimal global reference
            window.IngenuityEnhancer = {
                version: ENHANCEMENT_CONFIG.version,
                minimalMode: true,
                initialized: true
            };

            enhancementLog('info', 'Minimal mode initialized successfully');
            return true;

        } catch (error) {
            enhancementLog('error', 'Even minimal mode failed', error);
            return false;
        }
    }

    // =================================================================
    // AUTO-INITIALIZATION & ERROR HANDLING
    // =================================================================

    /**
     * Safe initialization wrapper with comprehensive error handling
     */
    function safeInitialization() {
        // Check if already initialized
        if (window.IngenuityEnhancer && window.IngenuityEnhancer.initialized) {
            enhancementLog('warn', 'Enhancement system already initialized');
            return;
        }

        // Check if initialization is disabled
        if (window.IngenuityNoAutoInit) {
            enhancementLog('info', 'Auto-initialization disabled via IngenuityNoAutoInit flag');
            return;
        }

        // Perform initialization
        const initPromise = initializeEnhancements();

        initPromise
            .then((success) => {
                if (success) {
                    enhancementLog('info', 'Auto-initialization completed successfully');
                } else {
                    enhancementLog('warn', 'Auto-initialization completed with issues');
                }
            })
            .catch((error) => {
                enhancementLog('error', 'Auto-initialization failed completely', error);
            });

        return initPromise;
    }

    // =================================================================
    // GLOBAL API & EXPOSURE
    // =================================================================

    // Expose main initialization function globally
    window.initIngenuityEnhancements = initializeEnhancements;

    // Log that the enhancement script has loaded
    enhancementLog('info', 'Enhancement script loaded and ready');

    // Auto-initialize with proper timing
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(safeInitialization, ENHANCEMENT_CONFIG.initialization.delayMs);
        });
    } else {
        setTimeout(safeInitialization, ENHANCEMENT_CONFIG.initialization.delayMs);
    }

    // Handle page visibility changes for cleanup
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && window.IngenuityCore) {
            enhancementLog('info', 'Page became visible - refreshing enhancements');
        }
    });

})(window, document);

/*!
 * Ready for Super.so Integration!
 * 
 * To use this enhancement system:
 * 1. Upload this file and ingenuity.js to your CDN
 * 2. Add to Super.so's "End of Body" injection:
 *    <script src="https://your-cdn.com/v1/js/enhancement.js"></script>
 * 3. Optionally configure in "Head Tag" injection:
 *    <script>window.IngenuityConfig = { debug: true };</script>
 * 
 * The system will automatically initialize and display branded
 * Hello World functionality that's immediately visible and interactive.
 */