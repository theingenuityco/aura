/*!
 * Aura Enhancement - Mystical Energy Extension System
 * CDN Enhancement System v1.0.0 - Production Ready
 *
 * This is the production-ready mystical energy extension system for theingenuity.co.
 * Aura Enhancement extends the digital energy field across platforms with invisible,
 * sophisticated enhancement capabilities.
 *
 * MYSTICAL FEATURES:
 * - Imports and initializes the AuraCore mystical library
 * - Extends digital aura across theingenuity.co, Super.so, and GitHub Pages
 * - Mystical energy field enhancement with graceful degradation
 * - Production-optimized Aura configuration and mystical feature flags
 * - Invisible operation with sophisticated energy field extensions
 * - Comprehensive mystical error handling and energy fallbacks
 *
 * Integration: Primary source theingenuity.co with extension to Super.so and GitHub Pages
 * Dependencies: Requires /v1/js/core/ingenuity.js (AuraCore system)
 * Author: The Ingenuity Co Development Team - Aura Enhancement Division
 * License: Proprietary
 */

(function(window, document) {
    'use strict';

    // =================================================================
    // CONFIGURATION & CONSTANTS
    // =================================================================

    const AURA_ENHANCEMENT_CONFIG = {
        name: 'Aura Enhancement - Mystical Energy Extension System',
        version: '1.0.0',
        cdnBase: 'https://cdn.theingenuity.co/v1', // Aura Enhancement CDN Base
        primarySource: 'https://theingenuity.co', // Primary mystical energy source
        features: {
            mysticalEnergy: true,
            auraLogging: false,
            energyField: false,
            mysticalReporting: true,
            auraStatusReporting: false,
            digitalAuraExtension: true
        },
        initialization: {
            autoStart: true,
            delayMs: 100,
            maxRetries: 3,
            retryDelayMs: 1000,
            mysticalInitialization: true
        },
        compatibility: {
            checkConflicts: true,
            gracefulDegradation: true,
            respectUserPreferences: true,
            maintainLegacySupport: true
        },
        platforms: {
            theingenuity: { primary: true, energyLevel: 'full' },
            superso: { extension: true, energyLevel: 'enhanced' },
            github: { extension: true, energyLevel: 'enhanced' }
        }
    };

    // =================================================================
    // UTILITY FUNCTIONS
    // =================================================================

    /**
     * Mystical logging specifically for the Aura Enhancement system
     * @param {string} level - Log level
     * @param {string} message - Message to log
     * @param {*} data - Optional data
     */
    function auraEnhancementLog(level, message, data) {
        // Production-ready mystical logging - only in debug mode or for errors
        if (!AURA_ENHANCEMENT_CONFIG.features.auraLogging && level !== 'error') {
            return;
        }
        
        const prefix = '🌟 AuraEnhancement';
        
        if (data !== undefined) {
            console[level](`[${prefix}] ${message}`, data);
        } else {
            console[level](`[${prefix}] ${message}`);
        }
    }

    // Legacy logging function for backward compatibility
    function enhancementLog(level, message, data) {
        return auraEnhancementLog(level, message, data);
    }

    /**
     * Checks if the Aura core library is available
     * @returns {boolean} True if Aura core library is loaded
     */
    function isCoreLibraryAvailable() {
        return (typeof window.AuraCore !== 'undefined' &&
               window.AuraCore &&
               typeof window.AuraCore.init === 'function') ||
               (typeof window.IngenuityCore !== 'undefined' &&
               window.IngenuityCore &&
               typeof window.IngenuityCore.init === 'function');
    }

    /**
     * Dynamically loads the Aura core library if not available
     * @returns {Promise} Promise that resolves when Aura library is loaded
     */
    function loadCoreLibrary() {
        return new Promise((resolve, reject) => {
            auraEnhancementLog('info', 'Loading mystical Aura core library...');

            const script = document.createElement('script');
            script.src = `${AURA_ENHANCEMENT_CONFIG.cdnBase}/js/core/ingenuity.js`;
            script.async = true;
            script.onload = function() {
                auraEnhancementLog('info', 'Aura core library loaded successfully - mystical energy activated');
                // Set up AuraCore reference from IngenuityCore for compatibility
                if (window.IngenuityCore && !window.AuraCore) {
                    window.AuraCore = window.IngenuityCore;
                }
                resolve();
            };
            script.onerror = function() {
                auraEnhancementLog('error', 'Failed to load Aura core library - mystical energy disrupted');
                reject(new Error('Aura core library failed to load'));
            };

            document.head.appendChild(script);
        });
    }

    /**
     * Waits for the Aura core library with mystical retry mechanism
     * @param {number} retryCount - Current retry attempt
     * @returns {Promise} Promise that resolves when Aura core is available
     */
    function waitForCoreLibrary(retryCount = 0) {
        return new Promise((resolve, reject) => {
            if (isCoreLibraryAvailable()) {
                resolve();
                return;
            }

            if (retryCount >= AURA_ENHANCEMENT_CONFIG.initialization.maxRetries) {
                reject(new Error(`Aura core library not available after ${retryCount} retries - mystical energy disrupted`));
                return;
            }

            auraEnhancementLog('info', `Waiting for mystical Aura core library... (attempt ${retryCount + 1})`);

            setTimeout(() => {
                waitForCoreLibrary(retryCount + 1)
                    .then(resolve)
                    .catch(reject);
            }, AURA_ENHANCEMENT_CONFIG.initialization.retryDelayMs);
        });
    }

    // =================================================================
    // CONFIGURATION MANAGEMENT
    // =================================================================

    /**
     * Processes Aura configuration from various mystical sources
     * @returns {Object} Final Aura configuration object
     */
    function processConfiguration() {
        let finalConfig = { ...AURA_ENHANCEMENT_CONFIG };

        // Check for global Aura configuration
        if (window.AuraConfig) {
            auraEnhancementLog('info', 'Found mystical Aura configuration', window.AuraConfig);
            finalConfig = {
                ...finalConfig,
                ...window.AuraConfig
            };
        }

        // Legacy configuration support
        if (window.IngenuityConfig && !window.AuraConfig) {
            auraEnhancementLog('info', 'Found legacy configuration, adapting to Aura system', window.IngenuityConfig);
            finalConfig = {
                ...finalConfig,
                ...window.IngenuityConfig
            };
        }

        // Check for URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('aura-debug') || urlParams.has('ingenuity-debug')) {
            finalConfig.debug = (urlParams.get('aura-debug') === 'true') || (urlParams.get('ingenuity-debug') === 'true');
            auraEnhancementLog('info', `Aura debug mode set via URL: ${finalConfig.debug}`);
        }

        // Respect user preferences for mystical energy adaptation
        if (AURA_ENHANCEMENT_CONFIG.compatibility.respectUserPreferences) {
            // Check for reduced motion preference - affects energy field animations
            if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                finalConfig.respectsReducedMotion = true;
                auraEnhancementLog('info', 'Reduced motion preference detected - adapting mystical energy field');
            }

            // Check for high contrast preference - affects aura visibility
            if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
                finalConfig.highContrast = true;
                auraEnhancementLog('info', 'High contrast preference detected - enhancing aura visibility');
            }
        }

        return finalConfig;
    }

    // =================================================================
    // SYSTEM COMPATIBILITY & SAFETY
    // =================================================================

    /**
     * Performs Aura compatibility and mystical energy field safety checks
     * @returns {Object} Check results
     */
    function performCompatibilityCheck() {
        const results = {
            passed: true,
            warnings: [],
            errors: [],
            features: {},
            mysticalReadiness: true
        };

        // Check browser compatibility for mystical energy fields
        results.features.es6Support = typeof Symbol !== 'undefined';
        results.features.promiseSupport = typeof Promise !== 'undefined';
        results.features.cssCustomProps = window.CSS && CSS.supports('color', 'var(--test)');
        results.features.intersectionObserver = 'IntersectionObserver' in window;
        results.features.auraFieldSupport = typeof window.requestAnimationFrame !== 'undefined';

        if (!results.features.es6Support) {
            results.warnings.push('Limited ES6 support detected - some mystical features may not work');
            results.mysticalReadiness = false;
        }

        if (!results.features.cssCustomProps) {
            results.warnings.push('CSS custom properties not supported - Aura styling may be limited');
        }

        if (!results.features.auraFieldSupport) {
            results.warnings.push('Animation frame support limited - Aura energy field effects may be reduced');
        }

        // Check for conflicts with other enhancement systems
        if (AURA_ENHANCEMENT_CONFIG.compatibility.checkConflicts) {
            const potentialConflicts = [
                'AuraEnhancement',
                'IngenuityEnhancer',
                'SuperSoEnhancer',
                'NotionEnhancer'
            ];

            potentialConflicts.forEach(conflict => {
                if (window[conflict] &&
                    window[conflict] !== window.AuraCore &&
                    window[conflict] !== window.IngenuityCore) {
                    results.warnings.push(`Potential mystical energy conflict detected: ${conflict}`);
                }
            });
        }

        // Check DOM readiness for Aura enhancement
        if (document.readyState === 'loading') {
            results.warnings.push('DOM still loading - Aura enhancements will wait for mystical alignment');
        }

        if (results.warnings.length > 0) {
            auraEnhancementLog('warn', 'Aura compatibility check warnings', results.warnings);
        }

        if (results.errors.length > 0) {
            results.passed = false;
            auraEnhancementLog('error', 'Aura compatibility check errors - mystical energy disrupted', results.errors);
        } else {
            auraEnhancementLog('info', 'Aura compatibility check passed - mystical energy field ready');
        }

        return results;
    }

    // =================================================================
    // MAIN ENHANCEMENT INITIALIZATION
    // =================================================================

    /**
     * Main initialization function for the Aura Enhancement system
     * @param {Object} userConfig - User-provided configuration
     * @returns {Promise} Promise that resolves when Aura initialization is complete
     */
    async function initializeEnhancements(userConfig = {}) {
        try {
            auraEnhancementLog('info', `Starting ${AURA_ENHANCEMENT_CONFIG.name} v${AURA_ENHANCEMENT_CONFIG.version}`);

            // Process mystical configuration
            const config = processConfiguration();
            Object.assign(config, userConfig);

            // Perform Aura compatibility check
            const compatCheck = performCompatibilityCheck();
            if (!compatCheck.passed && !config.compatibility?.gracefulDegradation) {
                throw new Error('Aura compatibility check failed and graceful degradation disabled - mystical energy disrupted');
            }

            // Wait for or load Aura core library
            if (!isCoreLibraryAvailable()) {
                auraEnhancementLog('info', 'Aura core library not found, attempting mystical energy loading...');
                await loadCoreLibrary();
            }

            // Wait for Aura core library to be ready
            await waitForCoreLibrary();

            // Get the core reference (AuraCore or IngenuityCore for compatibility)
            const coreLibrary = window.AuraCore || window.IngenuityCore;
            
            // Initialize Aura core library with production settings
            auraEnhancementLog('info', 'Initializing mystical Aura core library...');
            const coreInitialized = coreLibrary.init({
                ...config,
                debug: false, // Force debug off in production
                auraMode: true // Enable mystical energy mode
            });

            if (!coreInitialized) {
                throw new Error('Aura core library initialization failed - mystical energy could not be activated');
            }

            // Report successful initialization
            auraEnhancementLog('info', 'Aura Enhancement system initialized successfully - mystical energy field active');

            // Set up global Aura reference
            window.AuraEnhancement = {
                version: AURA_ENHANCEMENT_CONFIG.version,
                config: config,
                core: coreLibrary,
                initialized: true,
                initializationTime: Date.now(),
                mysticalEnergyActive: true,
                platforms: AURA_ENHANCEMENT_CONFIG.platforms
            };

            // Maintain backward compatibility
            window.IngenuityEnhancer = window.AuraEnhancement;

            return true;

        } catch (error) {
            auraEnhancementLog('error', 'Aura Enhancement initialization failed - mystical energy disrupted', error);
            
            // Attempt graceful degradation
            if (AURA_ENHANCEMENT_CONFIG.compatibility.gracefulDegradation) {
                auraEnhancementLog('info', 'Attempting mystical energy recovery through graceful degradation...');
                return initializeMinimalMode();
            }
            
            return false;
        }
    }

    /**
     * Minimal Aura mode initialization for graceful mystical degradation
     * @returns {boolean} Success status
     */
    function initializeMinimalMode() {
        try {
            auraEnhancementLog('info', 'Initializing minimal Aura mode - reduced mystical energy field...');

            // Production minimal Aura mode - invisible energy field only
            // Set up core mystical functionality without visible UI elements
            
            // Set up minimal Aura global reference
            window.AuraEnhancement = {
                version: AURA_ENHANCEMENT_CONFIG.version,
                minimalMode: true,
                mysticalEnergyReduced: true,
                initialized: true,
                platforms: AURA_ENHANCEMENT_CONFIG.platforms
            };

            // Maintain backward compatibility
            window.IngenuityEnhancer = window.AuraEnhancement;

            auraEnhancementLog('info', 'Minimal Aura mode initialized successfully - basic mystical energy active');
            return true;

        } catch (error) {
            auraEnhancementLog('error', 'Minimal Aura mode initialization failed - mystical energy completely disrupted', error);
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
        // Check if Aura already initialized
        if (window.AuraEnhancement && window.AuraEnhancement.initialized) {
            auraEnhancementLog('warn', 'Aura Enhancement system already initialized - mystical energy already active');
            return;
        }

        // Legacy check for backward compatibility
        if (window.IngenuityEnhancer && window.IngenuityEnhancer.initialized && !window.AuraEnhancement) {
            auraEnhancementLog('warn', 'Legacy enhancement system detected - upgrading to Aura Enhancement');
        }

        // Check if Aura initialization is disabled
        if (window.AuraNoAutoInit || window.IngenuityNoAutoInit) {
            auraEnhancementLog('info', 'Aura auto-initialization disabled via AuraNoAutoInit/IngenuityNoAutoInit flag');
            return;
        }

        // Perform mystical Aura initialization
        const initPromise = initializeEnhancements();

        initPromise
            .then((success) => {
                if (success) {
                    auraEnhancementLog('info', 'Aura auto-initialization completed successfully - mystical energy field established');
                } else {
                    auraEnhancementLog('warn', 'Aura auto-initialization completed with issues - reduced mystical energy');
                }
            })
            .catch((error) => {
                auraEnhancementLog('error', 'Aura auto-initialization failed completely - mystical energy disrupted', error);
            });

        return initPromise;
    }

    // =================================================================
    // GLOBAL AURA API & MYSTICAL EXPOSURE
    // =================================================================

    // Expose main Aura initialization function globally
    window.initAuraEnhancements = initializeEnhancements;
    // Maintain backward compatibility
    window.initIngenuityEnhancements = initializeEnhancements;

    // Log that the Aura enhancement script has loaded
    auraEnhancementLog('info', 'Aura Enhancement script loaded and mystical energy ready');

    // Auto-initialize with minimal delay for production
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(safeInitialization, AURA_ENHANCEMENT_CONFIG.initialization.delayMs);
        });
    } else {
        setTimeout(safeInitialization, AURA_ENHANCEMENT_CONFIG.initialization.delayMs);
    }

    // Handle page visibility changes for mystical energy refresh
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && (window.AuraCore || window.IngenuityCore)) {
            auraEnhancementLog('info', 'Page became visible - refreshing mystical energy field');
        }
    });

})(window, document);

/*!
 * Ready for Production Aura Enhancement Integration!
 *
 * To use the Aura Enhancement - Mystical Energy Extension System in production:
 *
 * PRIMARY SOURCE (theingenuity.co):
 * 1. Upload this file and ingenuity.js to your CDN at https://cdn.theingenuity.co/v1
 * 2. The system extends mystical energy across theingenuity.co automatically
 *
 * PLATFORM EXTENSIONS:
 *
 * Super.so Integration:
 * 1. Add to Super.so's "End of Body" injection:
 *    <script src="https://cdn.theingenuity.co/v1/js/enhancement.js"></script>
 * 2. Optionally enable Aura debug mode in "Head Tag" injection:
 *    <script>window.AuraConfig = { debug: true, auraLogging: true };</script>
 *    OR (legacy): <script>window.IngenuityConfig = { debug: true };</script>
 *
 * GitHub Pages Integration:
 * 1. Include in your HTML head or before closing body tag:
 *    <script src="https://cdn.theingenuity.co/v1/js/enhancement.js"></script>
 * 2. Add mystical energy classes to elements you want to enhance:
 *    - Add .aura-enhanced to containers (legacy: .ingenuity-enhanced)
 *    - Use .aura-* utility classes for specific styling (legacy: .ing-*)
 *
 * MYSTICAL FEATURES:
 * - Automatic initialization with invisible mystical energy field
 * - Cross-platform energy extension capabilities
 * - Backward compatibility with legacy IngenuityEnhancer
 * - Production-optimized with graceful mystical degradation
 * - API access: window.AuraEnhancement or window.initAuraEnhancements()
 *
 * The Aura Enhancement system extends The Ingenuity Co's digital energy field
 * across the web with sophisticated, invisible enhancement capabilities.
 */