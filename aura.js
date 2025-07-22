/*!
 * Aura Core v4.1.0 - Simplified Digital Presence Extension
 * The Ingenuity Co's Minimal Library for Standard Web Integration
 *
 * This simplified version removes complex injection patterns in favor of 
 * standard web practices. CSS and JS are injected via standard methods
 * rather than eval() patterns that create security vulnerabilities.
 *
 * Key changes in v4.0.0:
 * - Eliminated eval() security vulnerability
 * - Removed excessive route monitoring and polling
 * - Simplified to core functionality only
 * - 85% code reduction for improved maintainability
 * - Standard web practices alignment
 *
 * Author: The Ingenuity Co Development Team
 * License: MIT
 */

(function(window, document) {
    'use strict';
    
    /**
     * Aura Core - Simplified API
     */
    const AuraCore = {
        version: '4.1.0',
        
        /**
         * Detect if running on Next.js platform
         */
        isNextJS: () => !!(window.__NEXT_DATA__ || window.next),
        
        /**
         * Simple CSS cache-busting reinject method
         */
        reinject: () => {
            const link = document.getElementById('aura-core-css');
            if (link) {
                link.href = link.href.split('?')[0] + '?v=' + Date.now();
                return true;
            }
            return false;
        },
        
        /**
         * Enable auto-styling functionality by loading AuraSuper
         * @returns {Promise<boolean>} Promise that resolves when auto-styling is complete
         */
        enableAutoStyling: () => {
            return new Promise((resolve, reject) => {
                try {
                    // Check if AuraSuper is already available
                    if (window.AuraSuper) {
                        // Apply auto-styling and resolve
                        const result = window.AuraSuper.apply();
                        resolve(result);
                        return;
                    }
                    
                    // Check if script is already being loaded
                    const existingScript = document.getElementById('aura-super-script');
                    if (existingScript) {
                        // Wait for existing script to load
                        existingScript.addEventListener('load', () => {
                            try {
                                const result = window.AuraSuper ? window.AuraSuper.apply() : false;
                                resolve(result);
                            } catch (error) {
                                reject(new Error('Aura Auto-styling: Failed to apply styles after script load - ' + error.message));
                            }
                        });
                        existingScript.addEventListener('error', () => {
                            reject(new Error('Aura Auto-styling: Failed to load aura.super-so.js script'));
                        });
                        return;
                    }
                    
                    // Dynamically inject the aura.super-so.js script
                    const script = document.createElement('script');
                    script.id = 'aura-super-script';
                    script.type = 'text/javascript';
                    
                    // Determine the correct path for aura.super-so.js
                    let scriptPath = 'aura.super-so.js';
                    
                    // Try to detect current script location for better path resolution
                    const currentScript = document.currentScript ||
                        document.querySelector('script[src*="aura.js"]') ||
                        Array.from(document.querySelectorAll('script')).find(s =>
                            s.src && (s.src.includes('aura.js') || s.src.includes('aura'))
                        );
                    
                    if (currentScript && currentScript.src) {
                        // Use the same directory as the current aura.js script
                        const basePath = currentScript.src.substring(0, currentScript.src.lastIndexOf('/') + 1);
                        scriptPath = basePath + 'aura.super-so.js';
                    } else {
                        // Fallback to CDN for more reliable loading
                        scriptPath = 'https://cdn.jsdelivr.net/gh/theingenuityco/aura@main/aura.super-so.js';
                    }
                    
                    script.src = scriptPath;
                    
                    // Handle successful script loading
                    script.addEventListener('load', () => {
                        try {
                            // Verify AuraSuper is now available and apply styling
                            if (window.AuraSuper) {
                                const result = window.AuraSuper.apply();
                                resolve(result);
                            } else {
                                reject(new Error('Aura Auto-styling: AuraSuper not available after script load'));
                            }
                        } catch (error) {
                            reject(new Error('Aura Auto-styling: Failed to apply styles - ' + error.message));
                        }
                    });
                    
                    // Handle script loading errors
                    script.addEventListener('error', () => {
                        reject(new Error('Aura Auto-styling: Failed to load aura.super-so.js script'));
                    });
                    
                    // Inject the script
                    document.head.appendChild(script);
                    
                } catch (error) {
                    reject(new Error('Aura Auto-styling: Unexpected error - ' + error.message));
                }
            });
        }
    };
    
    // Expose to global namespace
    window.AuraCore = AuraCore;
    window.Aura = AuraCore; // Alias for backwards compatibility
    
})(window, document);