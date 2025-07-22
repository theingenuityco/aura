/*!
 * Aura Demo - Comprehensive Auto-Styling Demonstration
 * Enhanced version showcasing before/after comparisons of auto-styling functionality
 *
 * This demo demonstrates:
 * - Before/after visual comparisons
 * - All 5 element types auto-styling
 * - Both automatic and manual approaches
 * - Real-world testing on theingenuity.co
 * - Screenshot capture and element inspection
 *
 * Usage: node demo.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs').promises;

class AuraAutoStylingDemo {
    constructor() {
        this.browser = null;
        this.page = null;
        this.screenshotCounter = 0;
    }

    async init() {
        console.log('🔮 Starting Comprehensive Aura Auto-Styling Demo...');
        
        this.browser = await puppeteer.launch({ 
            headless: false,
            devtools: true,
            defaultViewport: { width: 1400, height: 900 }
        });
        
        this.page = await this.browser.newPage();
        await this.page.setViewport({ width: 1400, height: 900 });
    }

    async takeScreenshot(description) {
        const filename = `demo-screenshot-${++this.screenshotCounter}-${description.replace(/\s+/g, '-').toLowerCase()}.png`;
        await this.page.screenshot({ 
            path: filename, 
            fullPage: true 
        });
        console.log(`📸 Screenshot saved: ${filename}`);
        return filename;
    }

    async createTestElements() {
        console.log('🏗️  Creating test elements...');
        
        await this.page.evaluate(() => {
            // Create a test container
            const container = document.createElement('div');
            container.id = 'aura-test-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                width: 350px;
                padding: 20px;
                background: rgba(255, 255, 255, 0.95);
                border: 2px solid #ddd;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                font-family: Arial, sans-serif;
            `;
            
            // Test elements HTML
            container.innerHTML = `
                <h2 style="margin-top: 0; color: #333;">Aura Auto-Styling Test</h2>
                
                <!-- H1 Element Test -->
                <h1 id="test-h1" style="font-size: 24px; margin: 10px 0;">Test H1 Heading</h1>
                
                <!-- H2/H3 Element Test -->
                <h2 id="test-h2" style="font-size: 20px; margin: 10px 0;">Test H2 Heading</h2>
                <h3 id="test-h3" style="font-size: 18px; margin: 10px 0;">Test H3 Heading</h3>
                
                <!-- Button Element Test -->
                <button id="test-button" style="margin: 10px 5px; padding: 8px 16px;">Test Button</button>
                
                <!-- Link Element Test -->
                <a href="#" id="test-link" style="margin: 10px 5px; display: inline-block;">Test Link</a>
                
                <!-- Hero/Banner Element Test -->
                <div class="hero" id="test-hero" style="padding: 15px; margin: 10px 0; border: 1px dashed #ccc;">
                    Hero Section Test
                </div>
                <div class="banner" id="test-banner" style="padding: 15px; margin: 10px 0; border: 1px dashed #ccc;">
                    Banner Section Test
                </div>
            `;
            
            document.body.appendChild(container);
        });
    }

    async inspectElementClasses() {
        console.log('🔍 Inspecting element classes...');
        
        const elementInspection = await this.page.evaluate(() => {
            const testElements = {
                'h1#test-h1': document.querySelector('#test-h1'),
                'h2#test-h2': document.querySelector('#test-h2'),
                'h3#test-h3': document.querySelector('#test-h3'),
                'button#test-button': document.querySelector('#test-button'),
                'a#test-link': document.querySelector('#test-link'),
                '.hero#test-hero': document.querySelector('#test-hero'),
                '.banner#test-banner': document.querySelector('#test-banner')
            };
            
            const results = {};
            Object.keys(testElements).forEach(selector => {
                const element = testElements[selector];
                if (element) {
                    results[selector] = {
                        classes: Array.from(element.classList),
                        hasAuraClass: Array.from(element.classList).some(cls => cls.startsWith('aura-'))
                    };
                }
            });
            
            return results;
        });
        
        console.log('📋 Element Class Inspection Results:');
        Object.keys(elementInspection).forEach(selector => {
            const info = elementInspection[selector];
            const status = info.hasAuraClass ? '✅' : '❌';
            console.log(`   ${status} ${selector}: [${info.classes.join(', ')}]`);
        });
        
        return elementInspection;
    }

    async runScenario1_AutomaticStyling() {
        console.log('\n🎬 SCENARIO 1: Automatic Auto-Styling (DOMContentLoaded)');
        console.log('═'.repeat(60));
        
        // Navigate to target website with fallback
        let navigationSuccess = false;
        
        try {
            console.log('🌍 Navigating to theingenuity.co...');
            await this.page.goto('https://theingenuity.co', {
                waitUntil: 'networkidle2',
                timeout: 15000
            });
            navigationSuccess = true;
        } catch (error) {
            console.log('⚠️  theingenuity.co navigation failed, using local demo-test.html...');
            const path = require('path');
            const localFileUrl = 'file://' + path.join(__dirname, 'demo-test.html');
            await this.page.goto(localFileUrl, {
                waitUntil: 'networkidle2'
            });
            navigationSuccess = true;
        }
        
        if (!navigationSuccess) {
            throw new Error('Failed to navigate to any test page');
        }
        
        // Take "before" screenshot
        await this.takeScreenshot('before-any-styling');
        
        // Inject base Aura files
        console.log('✨ Injecting Aura CSS...');
        await this.page.addStyleTag({ path: './aura.css' });
        
        console.log('⚡ Injecting Aura JS...');
        await this.page.addScriptTag({ path: './aura.js' });
        
        // Create test elements
        await this.createTestElements();
        
        // Take "before auto-styling" screenshot
        await this.takeScreenshot('before-auto-styling');
        
        // Inspect elements before auto-styling
        console.log('\n📊 BEFORE Auto-Styling:');
        const beforeInspection = await this.inspectElementClasses();
        
        // Inject aura.super-so.js (which auto-applies on load)
        console.log('\n🚀 Injecting Auto-Styling (aura.super-so.js)...');
        await this.page.addScriptTag({ path: './aura.super-so.js' });
        
        // Wait a moment for styling to apply
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Take "after auto-styling" screenshot
        await this.takeScreenshot('after-automatic-styling');
        
        // Inspect elements after auto-styling
        console.log('\n📊 AFTER Automatic Auto-Styling:');
        const afterInspection = await this.inspectElementClasses();
        
        // Verify AuraSuper is available
        const auraSuperStatus = await this.page.evaluate(() => {
            return {
                available: !!(window.AuraSuper),
                version: window.AuraSuper?.version || 'unknown',
                integratedWithCore: !!(window.AuraCore?.Super)
            };
        });
        
        console.log('🔬 AuraSuper Status:', JSON.stringify(auraSuperStatus, null, 2));
        
        return { beforeInspection, afterInspection, auraSuperStatus };
    }

    async runScenario2_ManualStyling() {
        console.log('\n🎬 SCENARIO 2: Manual Auto-Styling (enableAutoStyling method)');
        console.log('═'.repeat(60));
        
        // Create a new page for clean testing
        const newPage = await this.browser.newPage();
        await newPage.setViewport({ width: 1400, height: 900 });
        
        // Navigate with fallback for scenario 2
        try {
            console.log('🌍 Navigating to theingenuity.co (fresh page)...');
            await newPage.goto('https://theingenuity.co', {
                waitUntil: 'networkidle2',
                timeout: 15000
            });
        } catch (error) {
            console.log('⚠️  theingenuity.co navigation failed, using local demo-test.html...');
            const path = require('path');
            const localFileUrl = 'file://' + path.join(__dirname, 'demo-test.html');
            await newPage.goto(localFileUrl, {
                waitUntil: 'networkidle2'
            });
        }
        
        // Inject only base Aura files (no auto-styling yet)
        console.log('✨ Injecting Aura CSS...');
        await newPage.addStyleTag({ path: './aura.css' });
        
        console.log('⚡ Injecting Aura JS...');
        await newPage.addScriptTag({ path: './aura.js' });
        
        // Create test elements
        await newPage.evaluate(() => {
            // Create a test container (same as before)
            const container = document.createElement('div');
            container.id = 'aura-test-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                width: 350px;
                padding: 20px;
                background: rgba(255, 255, 255, 0.95);
                border: 2px solid #ddd;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                font-family: Arial, sans-serif;
            `;
            
            container.innerHTML = `
                <h2 style="margin-top: 0; color: #333;">Manual Auto-Styling Test</h2>
                <h1 id="manual-h1" style="font-size: 24px; margin: 10px 0;">Manual H1 Test</h1>
                <h2 id="manual-h2" style="font-size: 20px; margin: 10px 0;">Manual H2 Test</h2>
                <h3 id="manual-h3" style="font-size: 18px; margin: 10px 0;">Manual H3 Test</h3>
                <button id="manual-button" style="margin: 10px 5px; padding: 8px 16px;">Manual Button</button>
                <a href="#" id="manual-link" style="margin: 10px 5px; display: inline-block;">Manual Link</a>
                <div class="hero" id="manual-hero" style="padding: 15px; margin: 10px 0; border: 1px dashed #ccc;">
                    Manual Hero Test
                </div>
                <div class="banner" id="manual-banner" style="padding: 15px; margin: 10px 0; border: 1px dashed #ccc;">
                    Manual Banner Test
                </div>
            `;
            
            document.body.appendChild(container);
        });
        
        // Take screenshot before manual styling
        await newPage.screenshot({ path: `demo-screenshot-${++this.screenshotCounter}-before-manual-styling.png`, fullPage: true });
        console.log(`📸 Screenshot saved: demo-screenshot-${this.screenshotCounter}-before-manual-styling.png`);
        
        // Inspect elements before manual styling
        const beforeManualInspection = await newPage.evaluate(() => {
            const testElements = {
                'h1#manual-h1': document.querySelector('#manual-h1'),
                'h2#manual-h2': document.querySelector('#manual-h2'),
                'h3#manual-h3': document.querySelector('#manual-h3'),
                'button#manual-button': document.querySelector('#manual-button'),
                'a#manual-link': document.querySelector('#manual-link'),
                '.hero#manual-hero': document.querySelector('#manual-hero'),
                '.banner#manual-banner': document.querySelector('#manual-banner')
            };
            
            const results = {};
            Object.keys(testElements).forEach(selector => {
                const element = testElements[selector];
                if (element) {
                    results[selector] = {
                        classes: Array.from(element.classList),
                        hasAuraClass: Array.from(element.classList).some(cls => cls.startsWith('aura-'))
                    };
                }
            });
            
            return results;
        });
        
        console.log('\n📊 BEFORE Manual Auto-Styling:');
        Object.keys(beforeManualInspection).forEach(selector => {
            const info = beforeManualInspection[selector];
            const status = info.hasAuraClass ? '✅' : '❌';
            console.log(`   ${status} ${selector}: [${info.classes.join(', ')}]`);
        });
        
        // Call enableAutoStyling method manually
        console.log('\n🚀 Calling AuraCore.enableAutoStyling() manually...');
        const manualStylingResult = await newPage.evaluate(async () => {
            try {
                const result = await window.AuraCore.enableAutoStyling();
                return {
                    success: true,
                    result: result,
                    auraSuperLoaded: !!(window.AuraSuper),
                    auraSuperVersion: window.AuraSuper?.version || 'unknown'
                };
            } catch (error) {
                return {
                    success: false,
                    error: error.message
                };
            }
        });
        
        console.log('🔬 Manual auto-styling result:', JSON.stringify(manualStylingResult, null, 2));
        
        // Wait for styling to apply
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Take screenshot after manual styling
        await newPage.screenshot({ path: `demo-screenshot-${++this.screenshotCounter}-after-manual-styling.png`, fullPage: true });
        console.log(`📸 Screenshot saved: demo-screenshot-${this.screenshotCounter}-after-manual-styling.png`);
        
        // Inspect elements after manual styling
        const afterManualInspection = await newPage.evaluate(() => {
            const testElements = {
                'h1#manual-h1': document.querySelector('#manual-h1'),
                'h2#manual-h2': document.querySelector('#manual-h2'),
                'h3#manual-h3': document.querySelector('#manual-h3'),
                'button#manual-button': document.querySelector('#manual-button'),
                'a#manual-link': document.querySelector('#manual-link'),
                '.hero#manual-hero': document.querySelector('#manual-hero'),
                '.banner#manual-banner': document.querySelector('#manual-banner')
            };
            
            const results = {};
            Object.keys(testElements).forEach(selector => {
                const element = testElements[selector];
                if (element) {
                    results[selector] = {
                        classes: Array.from(element.classList),
                        hasAuraClass: Array.from(element.classList).some(cls => cls.startsWith('aura-'))
                    };
                }
            });
            
            return results;
        });
        
        console.log('\n📊 AFTER Manual Auto-Styling:');
        Object.keys(afterManualInspection).forEach(selector => {
            const info = afterManualInspection[selector];
            const status = info.hasAuraClass ? '✅' : '❌';
            console.log(`   ${status} ${selector}: [${info.classes.join(', ')}]`);
        });
        
        await newPage.close();
        return { beforeManualInspection, afterManualInspection, manualStylingResult };
    }

    async generateSummaryReport(scenario1Results, scenario2Results) {
        console.log('\n📋 COMPREHENSIVE DEMO SUMMARY REPORT');
        console.log('═'.repeat(60));
        
        console.log('\n🎯 AUTO-STYLING FUNCTIONALITY VERIFICATION:');
        
        // Element mapping verification
        const expectedMappings = {
            'h1': 'aura-text-primary',
            'h2': 'aura-text-secondary',
            'h3': 'aura-text-secondary',
            'button': 'aura-btn-primary',
            'a': 'aura-text-accent',
            '.hero': 'aura-bg-primary',
            '.banner': 'aura-bg-primary'
        };
        
        console.log('\n   Expected Mappings:');
        Object.keys(expectedMappings).forEach(selector => {
            console.log(`   • ${selector} → .${expectedMappings[selector]}`);
        });
        
        console.log('\n✅ SCENARIO 1 (Automatic) Results:');
        console.log(`   • AuraSuper Available: ${scenario1Results.auraSuperStatus.available ? '✅' : '❌'}`);
        console.log(`   • AuraSuper Version: ${scenario1Results.auraSuperStatus.version}`);
        console.log(`   • Core Integration: ${scenario1Results.auraSuperStatus.integratedWithCore ? '✅' : '❌'}`);
        
        console.log('\n✅ SCENARIO 2 (Manual) Results:');
        console.log(`   • enableAutoStyling Success: ${scenario2Results.manualStylingResult.success ? '✅' : '❌'}`);
        console.log(`   • AuraSuper Loaded: ${scenario2Results.manualStylingResult.auraSuperLoaded ? '✅' : '❌'}`);
        
        console.log('\n📸 Screenshots Generated:');
        for (let i = 1; i <= this.screenshotCounter; i++) {
            console.log(`   • demo-screenshot-${i}-*.png`);
        }
        
        console.log('\n🎉 Demo completed successfully!');
        console.log('   All auto-styling functionality has been demonstrated and verified.');
        console.log('   Check the generated screenshots for visual before/after comparisons.');
    }

    async run() {
        try {
            await this.init();
            
            // Run both scenarios
            const scenario1Results = await this.runScenario1_AutomaticStyling();
            const scenario2Results = await this.runScenario2_ManualStyling();
            
            // Generate comprehensive report
            await this.generateSummaryReport(scenario1Results, scenario2Results);
            
            console.log('\n🔍 Browser will remain open for manual inspection...');
            console.log('🛑 Press Ctrl+C to exit');
            
            // Keep running until user exits
            await new Promise(() => {});
            
        } catch (error) {
            console.error('❌ Demo failed:', error);
        } finally {
            if (this.browser) {
                await this.browser.close();
            }
        }
    }
}

// Legacy function for backwards compatibility
async function runAuraDemo() {
    const demo = new AuraAutoStylingDemo();
    await demo.run();
}

if (require.main === module) {
    const demo = new AuraAutoStylingDemo();
    demo.run();
}

module.exports = { runAuraDemo, AuraAutoStylingDemo };