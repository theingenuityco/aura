/*!
 * Aura Runner - Interactive Puppeteer Session with Aura Injected
 * Launches theingenuity.co with The Ingenuity Co's Digital Energy Field
 * 
 * This script:
 * 1. Opens theingenuity.co in a Puppeteer-controlled browser
 * 2. Injects the Aura Core library with debug mode enabled
 * 3. Keeps the browser running for interactive exploration
 * 4. Provides console commands for Aura interaction
 * 
 * Usage: node run-aura.js
 * 
 * Interactive Commands:
 * - 'status' - Show Aura version and platform info
 * - 'reinject' - Manual CSS reinjection
 * - 'screenshot' - Take a screenshot
 * - 'refresh' - Refresh the page with Aura re-injection
 * - 'help' - Show available commands
 * - 'exit' - Close browser and exit
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const CONFIG = {
    website: 'https://theingenuity.co',
    auraPath: './v1/js/core/aura.js',
    auraCSSPath: './v1/css/core/aura.css',
    screenshotsDir: './temp/run-screenshots',
    viewport: { width: 1400, height: 900 },
    timeout: 30000,
    debug: true,
    devtools: true
};

let browser = null;
let page = null;
let auraCode = '';
let auraCSS = '';

/**
 * Enhanced logging with mystical branding
 */
function runLog(level, message, data = null) {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const prefix = '🔮 Aura Runner';
    
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
        runLog('info', `Created directory: ${dirPath}`);
    }
}

/**
 * Read the Aura Core JavaScript and CSS files
 */
function readAuraCore() {
    try {
        auraCode = fs.readFileSync(CONFIG.auraPath, 'utf8');
        runLog('info', `Loaded Aura Core library (${auraCode.length} characters)`);
        
        auraCSS = fs.readFileSync(CONFIG.auraCSSPath, 'utf8');
        runLog('info', `Loaded Aura CSS styles (${auraCSS.length} characters)`);
        
        return true;
    } catch (error) {
        runLog('error', 'Failed to read Aura Core files', error);
        return false;
    }
}

/**
 * Inject Aura Core (CSS + JS) into the page using new simplified API
 */
async function injectAura() {
    try {
        runLog('info', '✨ Injecting Aura Core (CSS + JS) into theingenuity.co...');
        
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
            runLog('info', `🌟 Aura Core v${result.version} injected successfully!`);
            runLog('info', `🏗️ Platform: ${result.isNextJS ? 'Next.js' : 'Standard'}`);
            runLog('info', `🎨 Aura CSS styles ${result.cssInjected ? 'applied' : 'failed to apply'}`);
            runLog('info', `🔗 Aura alias ${result.auraAlias ? 'available' : 'not available'}`);
            return true;
        } else {
            runLog('error', 'Failed to inject Aura Core', result.error);
            return false;
        }
        
    } catch (error) {
        runLog('error', 'Failed to inject Aura Core', error);
        return false;
    }
}

/**
 * Take a screenshot with timestamp
 */
async function takeScreenshot(name = 'manual') {
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${timestamp}-${name}.png`;
        const filepath = path.join(CONFIG.screenshotsDir, filename);
        
        await page.screenshot({ 
            path: filepath, 
            fullPage: true,
            type: 'png'
        });
        
        runLog('info', `📸 Screenshot saved: ${filename}`);
        return filepath;
    } catch (error) {
        runLog('error', 'Failed to take screenshot', error);
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
                
                default:
                    return { success: false, error: `Unknown command: ${cmd}. Available: status, reinject, platform-info` };
            }
        }, command, args);
        
        return result;
    } catch (error) {
        runLog('error', `Failed to execute command: ${command}`, error);
        return { success: false, error: error.message };
    }
}

/**
 * Process user commands using new simplified API
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
                runLog('error', 'Failed to get status', statusResult.error);
            }
            break;
        
        case 'reinject':
            const reinjectResult = await executeAuraCommand('reinject');
            if (reinjectResult.success) {
                runLog('info', reinjectResult.message);
            } else {
                runLog('error', 'Failed to reinject CSS', reinjectResult.error);
            }
            break;
        
        case 'screenshot':
            await takeScreenshot('manual');
            break;
        
        case 'refresh':
            runLog('info', '🔄 Refreshing page and re-injecting Aura...');
            await page.reload({ waitUntil: 'networkidle2' });
            await new Promise(resolve => setTimeout(resolve, 2000));
            await injectAura();
            runLog('info', '✅ Page refreshed with Aura re-injected');
            break;
        
        case 'platform':
            const platformResult = await executeAuraCommand('platform-info');
            if (platformResult.success) {
                console.log('\n🏗️ PLATFORM INFORMATION:');
                console.log(JSON.stringify(platformResult.data, null, 2));
            } else {
                runLog('error', 'Failed to get platform info', platformResult.error);
            }
            break;
        
        case 'help':
            console.log('\n🔮 AURA RUNNER COMMANDS:');
            console.log('- status          Show Aura version and platform info');
            console.log('- reinject        Manual CSS reinjection');
            console.log('- screenshot      Take a screenshot');
            console.log('- refresh         Refresh page and re-inject Aura');
            console.log('- platform        Show platform detection info');
            console.log('- help            Show this help');
            console.log('- exit            Close browser and exit');
            break;
        
        case 'exit':
            runLog('info', '👋 Closing Aura Runner...');
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
 * Setup command line interface
 */
function setupCommandInterface() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '🔮 Aura> '
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('🔮 AURA RUNNER - INTERACTIVE MODE');
    console.log('='.repeat(60));
    console.log('Type "help" for available commands or "exit" to quit.');
    console.log('The browser window shows theingenuity.co with Aura injected.');
    
    rl.prompt();
    
    rl.on('line', async (input) => {
        if (input.trim()) {
            await processCommand(input);
        }
        rl.prompt();
    });
    
    rl.on('close', async () => {
        runLog('info', '👋 Goodbye! Closing Aura Runner...');
        if (browser) {
            await browser.close();
        }
        process.exit(0);
    });
}

/**
 * Main execution function
 */
async function runAuraSession() {
    try {
        runLog('info', '🚀 Starting Aura Runner for theingenuity.co');
        
        // Ensure screenshots directory exists
        ensureDirectoryExists(CONFIG.screenshotsDir);
        
        // Read Aura Core library
        if (!readAuraCore()) {
            throw new Error('Failed to load Aura Core library');
        }
        
        // Launch browser
        runLog('info', '🌐 Launching browser with DevTools...');
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
        runLog('info', `🌍 Navigating to ${CONFIG.website}...`);
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
        
        runLog('info', '🎉 Aura Runner ready! Browser window is open and interactive.');
        runLog('info', '💡 Use DevTools (F12) to inspect Aura in the browser console.');
        runLog('info', '🔍 Try: window.AuraCore or window.Aura in browser console');
        
        // Setup command line interface
        setupCommandInterface();
        
    } catch (error) {
        runLog('error', '❌ Aura Runner failed to start', error);
        if (browser) {
            await browser.close();
        }
        process.exit(1);
    }
}

/**
 * Handle process termination
 */
process.on('SIGINT', async () => {
    runLog('info', '\n🛑 Received interrupt signal. Closing Aura Runner...');
    if (browser) {
        await browser.close();
    }
    process.exit(0);
});

process.on('SIGTERM', async () => {
    runLog('info', '\n🛑 Received termination signal. Closing Aura Runner...');
    if (browser) {
        await browser.close();
    }
    process.exit(0);
});

// Run the Aura session if this file is executed directly
if (require.main === module) {
    runAuraSession();
}

module.exports = {
    runAuraSession,
    CONFIG,
    runLog
};