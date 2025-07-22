/*!
 * Aura Super - Auto-Styling Extension v1.0.0
 * The Ingenuity Co's Automatic Element Styling Extension
 *
 * Automatically applies Aura CSS classes to common HTML elements
 * for instant styling without manual class assignment.
 *
 * Author: The Ingenuity Co Development Team
 * License: MIT
 */

(function(window, document) {
    'use strict';
    
    /**
     * Aura Super - Auto-styling functionality
     */
    const AuraSuper = {
        version: '1.0.0',
        
        /**
         * Element to class mappings
         */
        mappings: {
            'h1': 'aura-text-primary',
            'h2, h3': 'aura-text-secondary',
            'button': 'aura-btn-primary',
            'a': 'aura-text-accent',
            '.hero, .banner': 'aura-bg-primary'
        },
        
        /**
         * Apply auto-styling to all mapped elements
         */
        apply: function() {
            try {
                Object.keys(this.mappings).forEach(selector => {
                    const elements = document.querySelectorAll(selector);
                    const className = this.mappings[selector];
                    
                    elements.forEach(element => {
                        if (element && !element.classList.contains(className)) {
                            element.classList.add(className);
                        }
                    });
                });
                
                return true;
            } catch (error) {
                console.warn('Aura Super: Error applying styles', error);
                return false;
            }
        }
    };
    
    // Auto-apply on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            AuraSuper.apply();
        });
    } else {
        AuraSuper.apply();
    }
    
    // Expose to global namespace
    window.AuraSuper = AuraSuper;
    
    // Integrate with AuraCore namespace if available
    if (window.AuraCore) {
        window.AuraCore.Super = AuraSuper;
    }
    
})(window, document);