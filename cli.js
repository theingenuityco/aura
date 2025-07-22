#!/usr/bin/env node
/*!
 * Aura CLI v4.0.0 - Unified Command Line Interface
 * The Ingenuity Co's Digital Presence Extension Tool
 *
 * Usage:
 * - node cli.js                    → Error: Please provide a base URL
 * - node cli.js https://example.com → Opens example.com with Aura injected
 * - npm start https://example.com   → Same as above
 * - npm run aura https://example.com → Same as above
 *
 * Features:
 * - URL validation (HTTP/HTTPS required)
 * - Secure file referencing (no eval())  
 * - Interactive browser session
 * - Aura injection verification
 * - Basic status commands
 * - Clean exit handling
 *
 * Author: The Ingenuity Co Development Team
 * License: MIT
 */

const puppeteer = require('puppeteer');
const readline = require('readline');

/**
 * Configuration
 */
const CONFIG = {
    viewport: { width: 1400, height: 900 },
    timeout: 30000,
    devtools: true
};

let browser = null;
let page = null;
let targetURL = null;

/**
 * Enhanced logging with Aura branding
 */
function auraLog(level, message, data = null) {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const prefix = '🔮 Aura CLI';
    
    if (data) {
        console[level](`[${prefix}] ${timestamp} - ${message}`, data);
    } else {
        console[level](`[${prefix}] ${timestamp} - ${message}`);
    }
}

/**
 * Validate command line arguments
 */
function validateArguments() {
    const args = process.argv.slice(2);
    
    // Handle npm script forwarding - npm adds extra args, so we need to filter them
    const cleanArgs = args.filter(arg => !arg.startsWith('--') && arg !== 'cli.js');
    
    if (cleanArgs.length === 0) {
        console.error('❌ Error: Please provide a base URL.');
        console.error('Usage: aura https://example.com');
        console.error('');
        console.error('Examples:');
        console.error('  node cli.js https://theingenuity.co');
        console.error('  npm start https://example.com');  
        console.error('  npm run aura https://your-site.com');
        process.exit(1);
    }
    
    const url = cleanArgs[0];
    
    // URL validation
    if (!isValidURL(url)) {
        console.error('❌ Error: Invalid URL format.');
        console.error('Please provide a valid HTTP or HTTPS URL.');
        console.error('');
        console.error('Valid examples:');
        console.error('  https://example.com');
        console.error('  http://localhost:3000');
        console.error('  https://my-site.netlify.app');
        process.exit(1);
    }
    
    return url;
}

/**
 * Validate URL format
 */
function isValidURL(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (error) {
        return false;
    }
}

/**
 * Inject Aura using secure file referencing (like current demo.js)
 */
async function injectAura() {
    try {
        auraLog('info', '✨ Injecting Aura CSS...');
        await page.addStyleTag({ path: './aura.css' });
        
        auraLog('info', '⚡ Injecting Aura JS...');
        await page.addScriptTag({ path: './aura.js' });
        
        // Verify injection
        const auraStatus = await page.evaluate(() => {
            return {
                loaded: !!(window.AuraCore && window.Aura),
                version: window.AuraCore?.version || 'unknown',
                isNextJS: window.AuraCore?.isNextJS?.() || false
            };
        });
        
        if (auraStatus.loaded) {
            auraLog('info', `🎉 Aura v${auraStatus.version} injected successfully!`);
            auraLog('info', `🏗️ Platform: ${auraStatus.isNextJS ? 'Next.js' : 'Standard'}`);
            return auraStatus;
        } else {
            throw new Error('Aura injection verification failed');
        }
        
    } catch (error) {
        auraLog('error', 'Failed to inject Aura', error);
        return false;
    }
}

/**
 * Execute Aura commands in the browser
 */
async function executeAuraCommand(command) {
    try {
        const result = await page.evaluate((cmd) => {
            if (!window.AuraCore) {
                return { success: false, error: 'Aura Core not loaded' };
            }
            
            switch (cmd) {
                case 'status':
                    return {
                        success: true,
                        data: {
                            version: window.AuraCore.version || '4.0.0',
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
                            message: 'CSS reinjection completed',
                            result: reinjectResult
                        };
                    } else {
                        return { success: false, error: 'Reinject method not available' };
                    }
                
                default:
                    return { success: false, error: `Unknown command: ${cmd}` };
            }
        }, command);
        
        return result;
    } catch (error) {
        auraLog('error', `Failed to execute command: ${command}`, error);
        return { success: false, error: error.message };
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
                console.log(`- Target URL: ${targetURL}`);
                console.log(`- Timestamp: ${statusResult.data.timestamp}`);
            } else {
                auraLog('error', 'Failed to get status', statusResult.error);
            }
            break;
        
        case 'reinject':
            const reinjectResult = await executeAuraCommand('reinject');
            if (reinjectResult.success) {
                auraLog('info', reinjectResult.message);
            } else {
                auraLog('error', 'Failed to reinject CSS', reinjectResult.error);
            }
            break;
        
        case 'refresh':
            auraLog('info', '🔄 Refreshing page and re-injecting Aura...');
            await page.reload({ waitUntil: 'networkidle2' });
            await new Promise(resolve => setTimeout(resolve, 2000));
            await injectAura();
            auraLog('info', '✅ Page refreshed with Aura re-injected');
            break;
        
        case 'help':
            console.log('\n🔮 AURA CLI COMMANDS:');
            console.log('- status          Show Aura version and system info');
            console.log('- reinject        Manual CSS cache-busting reinject');
            console.log('- refresh         Refresh page and re-inject Aura');
            console.log('- help            Show this help');
            console.log('- exit            Close browser and exit');
            console.log('');
            console.log('💡 You can also use browser DevTools (F12) to inspect:');
            console.log('   window.AuraCore or window.Aura');
            break;
        
        case 'exit':
            auraLog('info', '👋 Closing Aura CLI...');
            if (browser) {
                await browser.close();
            }
            process.exit(0);
        
        default:
            if (command) {
                console.log(`Unknown command: ${command}. Type 'help' for available commands.`);
            }
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
        prompt: '🔮 aura> '
    });
    
    console.log('\n' + '='.repeat(70));
    console.log('🔮 AURA CLI - INTERACTIVE SESSION');
    console.log('='.repeat(70));
    console.log(`Target URL: ${targetURL}`);
    console.log('Type "help" for available commands or "exit" to quit.');
    console.log('The browser window shows your site with Aura injected.');
    console.log('Use DevTools (F12) to inspect: window.AuraCore');
    
    rl.prompt();
    
    rl.on('line', async (input) => {
        if (input.trim()) {
            await processCommand(input);
        }
        rl.prompt();
    });
    
    rl.on('close', async () => {
        auraLog('info', '👋 Goodbye! Closing Aura CLI...');
        if (browser) {
            await browser.close();
        }
        process.exit(0);
    });
}

/**
 * Main CLI function
 */
async function runAuraCLI() {
    try {
        // Validate arguments and get target URL
        targetURL = validateArguments();
        
        auraLog('info', '🚀 Starting Aura CLI...');
        auraLog('info', `🌍 Target URL: ${targetURL}`);
        
        // Launch browser
        auraLog('info', '🌐 Launching browser with DevTools...');
        browser = await puppeteer.launch({ 
            headless: false,
            devtools: CONFIG.devtools,
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox'
            ]
        });
        
        page = await browser.newPage();
        await page.setViewport(CONFIG.viewport);
        
        // Set up console log monitoring
        page.on('console', (msg) => {
            const text = msg.text();
            if (text.includes('🔮') || text.includes('Aura')) {
                console.log(`[Browser] ${text}`);
            }
        });
        
        // Navigate to target URL
        auraLog('info', `🌍 Navigating to ${targetURL}...`);
        await page.goto(targetURL, { 
            waitUntil: 'networkidle2',
            timeout: CONFIG.timeout 
        });
        
        // Inject Aura using secure file referencing
        const injectionResult = await injectAura();
        if (!injectionResult) {
            throw new Error('Failed to inject Aura');
        }
        
        auraLog('info', '🎉 Aura CLI ready! Browser window is open and interactive.');
        auraLog('info', '💡 Use DevTools (F12) to inspect Aura in the browser console.');
        auraLog('info', '🔍 Try: window.AuraCore or window.Aura in browser console');
        auraLog('info', '🛑 Press Ctrl+C or type "exit" to quit');
        
        // Setup interactive command interface
        setupCommandInterface();
        
    } catch (error) {
        auraLog('error', '❌ Aura CLI failed to start', error);
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
    auraLog('info', '\n🛑 Received interrupt signal. Closing Aura CLI...');
    if (browser) {
        await browser.close();
    }
    process.exit(0);
});

process.on('SIGTERM', async () => {
    auraLog('info', '\n🛑 Received termination signal. Closing Aura CLI...');
    if (browser) {
        await browser.close();
    }
    process.exit(0);
});

// Run the CLI if this file is executed directly
if (require.main === module) {
    runAuraCLI();
}

module.exports = { runAuraCLI };