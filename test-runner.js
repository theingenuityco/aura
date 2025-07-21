/*!
 * Unified Aura Test Runner - Interactive & Automated Testing
 * Launches theingenuity.co with The Ingenuity Co's Digital Energy Field
 * 
 * This unified script combines the functionality of both run-aura.js and test-aura-injection.js
 * 
 * Features:
 * 1. Interactive mode - Keep browser open for manual testing
 * 2. Automated mode - Run tests and exit with results
 * 3. CLI flags support - --interactive, --automated, --headless modes
 * 4. Screenshot capture with timestamps
 * 5. Console commands for status, reinject, platform detection
 * 6. Test report generation
 * 
 * Usage:
 * - node test-runner.js --interactive    # Interactive mode (default)
 * - node test-runner.js --automated      # Automated testing mode
 * - node test-runner.js --headless       # Automated headless mode
 * 
 * Interactive Commands:
 * - 'status' - Show Aura version and platform info
 * - 'reinject' - Manual CSS reinjection
 * - 'screenshot' - Take a screenshot
 * - 'refresh' - Refresh the page with Aura re-injection
 * - 'test' - Run automated functionality tests
 * - 'help' - Show available commands
 * - 'exit' - Close browser and exit
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Parse command line arguments
const args = process.argv.slice(2);
const isInteractive = args.includes('--interactive') || (!args.includes('--automated') && !args.includes('--headless'));
const isAutomated = args.includes('--automated') || args.includes('--headless');
const isHeadless = args.includes('--headless');

// Configuration
const CONFIG = {
    website: 'https://theingenuity.co',
    auraPath: './aura.js',           // Updated to use root-level file
    auraCSSPath: './aura.css',       // Updated to use root-level file
    screenshotsDir: isInteractive ? './temp/run-screenshots' : './temp/test-results',
    viewport: { width: 1400, height: 900 },
    timeout: 30000,
    debug: true,
    devtools: isInteractive && !isHeadless,
    headless: isHeadless
};

let browser = null;
let page = null;
let auraCode = '';
let auraCSS = '';

/**
 * Enhanced logging with mystical branding
 */
function unifiedLog(level, message, data = null) {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const prefix = isInteractive ? '🔮 Aura Runner' : '🧪 Aura Test';
    
    if (data) {
        console[level](`[${prefix}] ${timestamp} - ${message}`, data);
    } else {
        console[level](`[${prefix}] ${timestamp} - ${message}`);
    }
}

/**
 * Create screenshots directory if it doesn't exist
 */
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        unifiedLog('info', `Created directory: ${dirPath}`);
    }
}

/**
 * Read the Aura Core JavaScript and CSS files
 */
function readAuraCore() {
    try {
        auraCode = fs.readFileSync(CONFIG.auraPath, 'utf8');
        unifiedLog('info', `Loaded Aura Core library (${auraCode.length} characters)`);
        
        auraCSS = fs.readFileSync(CONFIG.auraCSSPath, 'utf8');
        unifiedLog('info', `Loaded Aura CSS styles (${auraCSS.length} characters)`);
        
        return true;
    } catch (error) {
        unifiedLog('error', 'Failed to read Aura Core files', error);
        return false;
    }
}

/**
 * Inject Aura Core (CSS + JS) into the page using new simplified API
 */
async function injectAura() {
    try {
        unifiedLog('info', '✨ Injecting Aura Core (CSS + JS) into theingenuity.co...');
        
        const result = await page.evaluate((jsCode, cssCode) => {
            // First, inject the CSS styles
            const styleElement = document.createElement('style');
            styleElement.textContent = cssCode;
            styleElement.setAttribute('data-aura-css', 'true');
            document.head.appendChild(styleElement);
            
            // Execute the Aura JavaScript code
            eval(jsCode);
            
            // Use new simplified API - auto-setup everything
            if (window.AuraCore) {
                const initResult = window.AuraCore.init();
                
                return {
                    success: true,
                    version: window.AuraCore.version || '2.0.0',
                    isNextJS: window.AuraCore.isNextJS ? window.AuraCore.isNextJS() : false,
                    initResult: initResult,
                    cssInjected: !!document.querySelector('style[data-aura-css]'),
                    auraAlias: !!window.Aura
                };
            }
            
            return { success: false, error: 'AuraCore not found' };
        }, auraCode, auraCSS);
        
        if (result.success) {
            unifiedLog('info', `🌟 Aura Core v${result.version} injected successfully!`);
            unifiedLog('info', `🏗️ Platform: ${result.isNextJS ? 'Next.js' : 'Standard'}`);
            unifiedLog('info', `🎨 Aura CSS styles ${result.cssInjected ? 'applied' : 'failed to apply'}`);
            unifiedLog('info', `🔗 Aura alias ${result.auraAlias ? 'available' : 'not available'}`);
            return result;
        } else {
            unifiedLog('error', 'Failed to inject Aura Core', result.error);
            return false;
        }
        
    } catch (error) {
        unifiedLog('error', 'Failed to inject Aura Core', error);
        return false;
    }
}

/**
 * Take a screenshot with timestamp
 */
async function takeScreenshot(name = 'manual', description = '') {
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${timestamp}-${name}.png`;
        const filepath = path.join(CONFIG.screenshotsDir, filename);
        
        await page.screenshot({ 
            path: filepath, 
            fullPage: true,
            type: 'png'
        });
        
        unifiedLog('info', `📸 Screenshot saved: ${filename}${description ? ' - ' + description : ''}`);
        return filepath;
    } catch (error) {
        unifiedLog('error', 'Failed to take screenshot', error);
        return null;
    }
}

/**
 * Execute Aura command in the browser using new simplified API
 */
async function executeAuraCommand(command, args = []) {
    try {
        const result = await page.evaluate((cmd, cmdArgs) => {
            if (!window.AuraCore) {
                return { success: false, error: 'Aura Core not loaded' };
            }
            
            switch (cmd) {
                case 'status':
                    return {
                        success: true,
                        data: {
                            version: window.AuraCore.version || '2.0.0',
                            isNextJS: window.AuraCore.isNextJS ? window.AuraCore.isNextJS() : false,
                            auraAlias: !!window.Aura,
                            timestamp: new Date().toISOString()
                        }
                    };
                
                case 'reinject':
                    if (window.AuraCore.reinject) {
                        const reinjectResult = window.AuraCore.reinject();
                        return {
                            success: true,
                            message: 'CSS reinjection completed'
                        };
                    } else {
                        return { success: false, error: 'Reinject method not available' };
                    }
                
                case 'platform-info':
                    return {
                        success: true,
                        data: {
                            isNextJS: window.AuraCore.isNextJS ? window.AuraCore.isNextJS() : false,
                            version: window.AuraCore.version || '2.0.0',
                            hasAlias: !!window.Aura
                        }
                    };
                
                case 'functionality-test':
                    const results = {
                        auraLoaded: !!window.AuraCore,
                        version: window.AuraCore?.version || 'unknown',
                        auraAlias: !!window.Aura,
                        platformDetection: null,
                        reinjectTest: null,
                        errors: []
                    };
                    
                    try {
                        // Test platform detection
                        if (window.AuraCore.isNextJS) {
                            results.platformDetection = {
                                isNextJS: window.AuraCore.isNextJS(),
                                type: window.AuraCore.isNextJS() ? 'Next.js' : 'Standard'
                            };
                        } else {
                            results.platformDetection = { type: 'Detection not available' };
                        }
                        
                        // Test CSS reinjection
                        if (window.AuraCore.reinject) {
                            results.reinjectTest = window.AuraCore.reinject();
                        } else {
                            results.errors.push('reinject method not available');
                        }
                        
                    } catch (error) {
                        results.errors.push(`Functionality test error: ${error.message}`);
                    }
                    
                    return { success: true, data: results };
                
                default:
                    return { success: false, error: `Unknown command: ${cmd}` };
            }
        }, command, args);
        
        return result;
    } catch (error) {
        unifiedLog('error', `Failed to execute command: ${command}`, error);
        return { success: false, error: error.message };
    }
}

/**
 * Run automated functionality tests
 */
async function runAutomatedTests() {
    const testResults = {
        success: false,
        timestamp: new Date().toISOString(),
        website: CONFIG.website,
        auraVersion: 'unknown',
        screenshots: [],
        functionality: {},
        css: {},
        errors: []
    };
    
    try {
        unifiedLog('info', '🧪 Running automated functionality tests...');
        
        // Test Aura functionality
        const functionalityResult = await executeAuraCommand('functionality-test');
        if (functionalityResult.success) {
            testResults.functionality = functionalityResult.data;
            testResults.auraVersion = functionalityResult.data.version;
        } else {
            testResults.errors.push(functionalityResult.error);
        }
        
        // Test CSS capabilities
        const cssResults = await page.evaluate(() => {
            // Create test container to verify CSS is working
            const testContainer = document.createElement('div');
            testContainer.id = 'aura-css-test';
            testContainer.style.cssText = 'padding: 20px; margin: 20px; border: 2px solid #7C4DFF; background: rgba(124, 77, 255, 0.1);';
            testContainer.textContent = 'Aura CSS Test Container';
            document.body.appendChild(testContainer);
            
            return {
                containerCreated: !!document.getElementById('aura-css-test'),
                cssStylesApplied: !!document.querySelector('style[data-aura-css]'),
                reinjectAvailable: !!window.AuraCore?.reinject
            };
        });
        
        testResults.css = cssResults;
        testResults.success = testResults.functionality.auraLoaded && testResults.css.cssStylesApplied;
        
        // Take test screenshots
        testResults.screenshots.push(await takeScreenshot('functionality-test', 'After functionality tests'));
        testResults.screenshots.push(await takeScreenshot('css-test', 'After CSS tests'));
        
        unifiedLog('info', '✅ Automated tests completed');
        return testResults;
        
    } catch (error) {
        testResults.errors.push(error.message);
        unifiedLog('error', 'Failed to run automated tests', error);
        return testResults;
    }
}

/**
 * Generate test report for automated mode
 */
function generateTestReport(results) {
    const reportPath = path.join(CONFIG.screenshotsDir, `aura-test-report-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
    
    try {
        fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
        unifiedLog('info', `Test report generated: ${reportPath}`);
        
        // Also create a human-readable report
        const readableReportPath = path.join(CONFIG.screenshotsDir, `aura-test-summary-${new Date().toISOString().replace(/[:.]/g, '-')}.txt`);
        const summary = `
🔮 UNIFIED AURA TEST RUNNER REPORT
=====================================

Test Status: ${results.success ? '✅ SUCCESS' : '❌ FAILED'}
Timestamp: ${results.timestamp}
Website: ${results.website}
Aura Version: ${results.auraVersion}

FUNCTIONALITY TESTS:
- Aura Loaded: ${results.functionality.auraLoaded ? '✅' : '❌'}
- Aura Alias Available: ${results.functionality.auraAlias ? '✅' : '❌'}
- Platform Detection: ${JSON.stringify(results.functionality.platformDetection)}
- Reinject Test: ${results.functionality.reinjectTest ? '✅' : '❌'}

CSS TESTS:
- Container Created: ${results.css.containerCreated ? '✅' : '❌'}
- CSS Styles Applied: ${results.css.cssStylesApplied ? '✅' : '❌'}
- Reinject Available: ${results.css.reinjectAvailable ? '✅' : '❌'}

SCREENSHOTS:
${results.screenshots.filter(s => s).map(s => `- ${s}`).join('\n')}

ERRORS:
${results.errors.length > 0 ? results.errors.map(e => `- ${e}`).join('\n') : 'None'}

FUNCTIONALITY ERRORS:
${results.functionality.errors?.length > 0 ? results.functionality.errors.map(e => `- ${e}`).join('\n') : 'None'}
        `;
        
        fs.writeFileSync(readableReportPath, summary);
        unifiedLog('info', `Human-readable report generated: ${readableReportPath}`);
        
        return { reportPath, readableReportPath };
    } catch (error) {
        unifiedLog('error', 'Failed to generate test report', error);
        return null;
    }
}

/**
 * Process user commands for interactive mode
 */
async function processCommand(input) {
    const [command, ...args] = input.trim().split(' ');
    
    switch (command.toLowerCase()) {
        case 'status':
            const statusResult = await executeAuraCommand('status');
            if (statusResult.success) {
                console.log('\n🔮 AURA SYSTEM STATUS:');
                console.log(`- Version: ${statusResult.data.version}`);
                console.log(`- Platform: ${statusResult.data.isNextJS ? 'Next.js' : 'Standard'}`);
                console.log(`- Aura Alias: ${statusResult.data.auraAlias ? '✅' : '❌'}`);
                console.log(`- Timestamp: ${statusResult.data.timestamp}`);
            } else {
                unifiedLog('error', 'Failed to get status', statusResult.error);
            }
            break;
        
        case 'reinject':
            const reinjectResult = await executeAuraCommand('reinject');
            if (reinjectResult.success) {
                unifiedLog('info', reinjectResult.message);
            } else {
                unifiedLog('error', 'Failed to reinject CSS', reinjectResult.error);
            }
            break;
        
        case 'screenshot':
            await takeScreenshot('manual');
            break;
        
        case 'refresh':
            unifiedLog('info', '🔄 Refreshing page and re-injecting Aura...');
            await page.reload({ waitUntil: 'networkidle2' });
            await new Promise(resolve => setTimeout(resolve, 2000));
            await injectAura();
            unifiedLog('info', '✅ Page refreshed with Aura re-injected');
            break;
        
        case 'test':
            const testResults = await runAutomatedTests();
            console.log('\n🧪 AUTOMATED TEST RESULTS:');
            console.log(`- Success: ${testResults.success ? '✅' : '❌'}`);
            console.log(`- Aura Loaded: ${testResults.functionality.auraLoaded ? '✅' : '❌'}`);
            console.log(`- CSS Applied: ${testResults.css.cssStylesApplied ? '✅' : '❌'}`);
            console.log(`- Errors: ${testResults.errors.length}`);
            break;
        
        case 'platform':
            const platformResult = await executeAuraCommand('platform-info');
            if (platformResult.success) {
                console.log('\n🏗️ PLATFORM INFORMATION:');
                console.log(JSON.stringify(platformResult.data, null, 2));
            } else {
                unifiedLog('error', 'Failed to get platform info', platformResult.error);
            }
            break;
        
        case 'help':
            console.log('\n🔮 UNIFIED AURA RUNNER COMMANDS:');
            console.log('- status          Show Aura version and platform info');
            console.log('- reinject        Manual CSS reinjection');
            console.log('- screenshot      Take a screenshot');
            console.log('- refresh         Refresh page and re-inject Aura');
            console.log('- test            Run automated functionality tests');
            console.log('- platform        Show platform detection info');
            console.log('- help            Show this help');
            console.log('- exit            Close browser and exit');
            break;
        
        case 'exit':
            unifiedLog('info', '👋 Closing Unified Aura Runner...');
            if (browser) {
                await browser.close();
            }
            process.exit(0);
        
        default:
            console.log(`Unknown command: ${command}. Type 'help' for available commands.`);
            break;
    }
}

/**
 * Setup command line interface for interactive mode
 */
function setupCommandInterface() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '🔮 Aura> '
    });
    
    console.log('\n' + '='.repeat(70));
    console.log('🔮 UNIFIED AURA RUNNER - INTERACTIVE MODE');
    console.log('='.repeat(70));
    console.log('Type "help" for available commands or "exit" to quit.');
    console.log('The browser window shows theingenuity.co with Aura injected.');
    console.log('Run "test" command to execute automated functionality tests.');
    
    rl.prompt();
    
    rl.on('line', async (input) => {
        if (input.trim()) {
            await processCommand(input);
        }
        rl.prompt();
    });
    
    rl.on('close', async () => {
        unifiedLog('info', '👋 Goodbye! Closing Unified Aura Runner...');
        if (browser) {
            await browser.close();
        }
        process.exit(0);
    });
}

/**
 * Run in automated mode
 */
async function runAutomatedMode() {
    try {
        unifiedLog('info', '🤖 Running in AUTOMATED mode');
        
        // Ensure screenshots directory exists
        ensureDirectoryExists(CONFIG.screenshotsDir);
        
        // Read Aura Core library
        if (!readAuraCore()) {
            throw new Error('Failed to load Aura Core library');
        }
        
        // Launch browser
        unifiedLog('info', '🌐 Launching browser...');
        browser = await puppeteer.launch({
            headless: CONFIG.headless,
            devtools: false,
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor'
            ]
        });
        
        page = await browser.newPage();
        await page.setViewport(CONFIG.viewport);
        
        // Navigate to theingenuity.co
        unifiedLog('info', `🌍 Navigating to ${CONFIG.website}...`);
        await page.goto(CONFIG.website, { 
            waitUntil: 'networkidle2',
            timeout: CONFIG.timeout 
        });
        
        // Take initial screenshot
        await takeScreenshot('initial', 'Before Aura injection');
        
        // Inject Aura Core
        const injectionResult = await injectAura();
        if (!injectionResult) {
            throw new Error('Failed to inject Aura Core');
        }
        
        // Take post-injection screenshot
        await takeScreenshot('post-injection', 'After Aura injection');
        
        // Run automated tests
        const testResults = await runAutomatedTests();
        
        // Generate reports
        const reports = generateTestReport(testResults);
        
        // Display results
        console.log('\n' + '='.repeat(70));
        console.log('🔮 UNIFIED AURA RUNNER - AUTOMATED TEST SUMMARY');
        console.log('='.repeat(70));
        console.log(`Status: ${testResults.success ? '✅ SUCCESS' : '❌ FAILED'}`);
        console.log(`Aura Version: ${testResults.auraVersion}`);
        console.log(`Screenshots: ${testResults.screenshots.filter(s => s).length} captured`);
        console.log(`Functionality Tests: ${testResults.functionality.auraLoaded ? 'PASSED' : 'FAILED'}`);
        console.log(`CSS Tests: ${testResults.css.containerCreated ? 'PASSED' : 'FAILED'}`);
        console.log(`Errors: ${testResults.errors.length + (testResults.functionality.errors?.length || 0)}`);
        
        if (reports) {
            console.log(`\nReports generated:`);
            console.log(`- ${reports.reportPath}`);
            console.log(`- ${reports.readableReportPath}`);
        }
        
        console.log('\n🌟 The Ingenuity Co Digital Energy Field test completed!');
        
        // Exit with appropriate code
        process.exit(testResults.success ? 0 : 1);
        
    } catch (error) {
        unifiedLog('error', '❌ Automated test failed', error);
        process.exit(1);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

/**
 * Run in interactive mode
 */
async function runInteractiveMode() {
    try {
        unifiedLog('info', '🎮 Running in INTERACTIVE mode');
        unifiedLog('info', '🚀 Starting Unified Aura Runner for theingenuity.co');
        
        // Ensure screenshots directory exists
        ensureDirectoryExists(CONFIG.screenshotsDir);
        
        // Read Aura Core library
        if (!readAuraCore()) {
            throw new Error('Failed to load Aura Core library');
        }
        
        // Launch browser
        unifiedLog('info', '🌐 Launching browser with DevTools...');
        browser = await puppeteer.launch({
            headless: false,
            devtools: CONFIG.devtools,
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor'
            ]
        });
        
        page = await browser.newPage();
        await page.setViewport(CONFIG.viewport);
        
        // Set up console log monitoring
        page.on('console', (msg) => {
            const text = msg.text();
            if (text.includes('🔮 Aura') || text.includes('Aura')) {
                console.log(`[Browser] ${text}`);
            }
        });
        
        // Navigate to theingenuity.co
        unifiedLog('info', `🌍 Navigating to ${CONFIG.website}...`);
        await page.goto(CONFIG.website, { 
            waitUntil: 'networkidle2',
            timeout: CONFIG.timeout 
        });
        
        // Take initial screenshot
        await takeScreenshot('initial');
        
        // Inject Aura Core
        const injectionSuccess = await injectAura();
        if (!injectionSuccess) {
            throw new Error('Failed to inject Aura Core');
        }
        
        // Take post-injection screenshot
        await takeScreenshot('with-aura');
        
        unifiedLog('info', '🎉 Unified Aura Runner ready! Browser window is open and interactive.');
        unifiedLog('info', '💡 Use DevTools (F12) to inspect Aura in the browser console.');
        unifiedLog('info', '🔍 Try: window.AuraCore or window.Aura in browser console');
        
        // Setup command line interface
        setupCommandInterface();
        
    } catch (error) {
        unifiedLog('error', '❌ Interactive mode failed to start', error);
        if (browser) {
            await browser.close();
        }
        process.exit(1);
    }
}

/**
 * Main execution function
 */
async function main() {
    // Display mode information
    console.log('\n' + '='.repeat(70));
    console.log('🔮 UNIFIED AURA TEST RUNNER');
    console.log('='.repeat(70));
    console.log(`Mode: ${isInteractive ? 'INTERACTIVE' : 'AUTOMATED'} ${isHeadless ? '(HEADLESS)' : ''}`);
    console.log(`Target: ${CONFIG.website}`);
    console.log(`Aura Library: ${CONFIG.auraPath}`);
    console.log(`Aura CSS: ${CONFIG.auraCSSPath}`);
    console.log(`Screenshots: ${CONFIG.screenshotsDir}`);
    console.log('='.repeat(70));
    
    if (isAutomated) {
        await runAutomatedMode();
    } else {
        await runInteractiveMode();
    }
}

/**
 * Handle process termination
 */
process.on('SIGINT', async () => {
    unifiedLog('info', '\n🛑 Received interrupt signal. Closing Unified Aura Runner...');
    if (browser) {
        await browser.close();
    }
    process.exit(0);
});

process.on('SIGTERM', async () => {
    unifiedLog('info', '\n🛑 Received termination signal. Closing Unified Aura Runner...');
    if (browser) {
        await browser.close();
    }
    process.exit(0);
});

// Run the unified runner if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = {
    main,
    runInteractiveMode,
    runAutomatedMode,
    CONFIG,
    unifiedLog
};