#!/usr/bin/env node

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { URL } = require('url');

/**
 * Robust Testing Script for TheIngenuity.co
 * 
 * This script fetches HTML from https://theingenuity.co and injects local v1 CSS/JS files
 * in the correct dependency order for testing purposes.
 */

class TestRunner {
    constructor() {
        this.port = 3000;
        this.server = null;
        
        // File injection order (critical dependencies)
        this.cssFiles = [
            'v1/css/core/brand.css',      // Foundation
            'v1/css/enhancement.css'       // Depends on brand.css
        ];
        
        this.jsFiles = [
            'v1/js/core/ingenuity.js',    // Core library
            'v1/js/enhancement.js'         // Depends on ingenuity.js
        ];
        
        console.log('🚀 TheIngenuity.co Test Runner Initialized');
        console.log('📋 CSS Injection Order:', this.cssFiles);
        console.log('📋 JS Injection Order:', this.jsFiles);
    }

    /**
     * Read a local file and return its contents
     */
    readLocalFile(filePath) {
        try {
            const fullPath = path.join(__dirname, filePath);
            if (!fs.existsSync(fullPath)) {
                throw new Error(`File not found: ${filePath}`);
            }
            const content = fs.readFileSync(fullPath, 'utf8');
            console.log(`✅ Successfully read: ${filePath} (${content.length} chars)`);
            return content;
        } catch (error) {
            console.error(`❌ Error reading ${filePath}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch HTML from https://theingenuity.co
     */
    fetchHTML() {
        return new Promise((resolve, reject) => {
            console.log('🌐 Fetching HTML from https://theingenuity.co...');
            
            const options = {
                hostname: 'theingenuity.co',
                port: 443,
                path: '/',
                method: 'GET',
                headers: {
                    'User-Agent': 'TheIngenuity Test Runner/1.0',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'identity',
                    'Connection': 'close'
                }
            };

            const req = https.request(options, (res) => {
                let data = '';
                
                console.log(`📡 Response Status: ${res.statusCode}`);
                console.log(`📡 Response Headers:`, res.headers);
                
                if (res.statusCode !== 200) {
                    return reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
                }

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    console.log(`✅ Successfully fetched HTML (${data.length} chars)`);
                    resolve(data);
                });
            });

            req.on('error', (error) => {
                console.error('❌ Error fetching HTML:', error.message);
                reject(error);
            });

            req.setTimeout(10000, () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });

            req.end();
        });
    }

    /**
     * Inject CSS and JS files into HTML in the correct order
     */
    injectAssets(html) {
        console.log('🔧 Injecting local assets into HTML...');
        
        let modifiedHTML = html;
        
        // Inject CSS files in <head> section
        console.log('💅 Injecting CSS files...');
        let cssInjection = '\n';
        
        for (const cssFile of this.cssFiles) {
            try {
                const cssContent = this.readLocalFile(cssFile);
                cssInjection += `    <!-- Injected: ${cssFile} -->\n`;
                cssInjection += `    <style>\n${cssContent}\n    </style>\n`;
            } catch (error) {
                console.warn(`⚠️ Warning: Could not inject ${cssFile}:`, error.message);
            }
        }
        
        // Find </head> tag and inject CSS before it
        const headCloseIndex = modifiedHTML.indexOf('</head>');
        if (headCloseIndex !== -1) {
            modifiedHTML = modifiedHTML.slice(0, headCloseIndex) + 
                          cssInjection + 
                          modifiedHTML.slice(headCloseIndex);
            console.log('✅ CSS files injected into <head>');
        } else {
            console.warn('⚠️ Warning: Could not find </head> tag');
        }
        
        // Inject JS files before </body>
        console.log('⚙️ Injecting JS files...');
        let jsInjection = '\n';
        
        for (const jsFile of this.jsFiles) {
            try {
                const jsContent = this.readLocalFile(jsFile);
                jsInjection += `    <!-- Injected: ${jsFile} -->\n`;
                jsInjection += `    <script>\n${jsContent}\n    </script>\n`;
            } catch (error) {
                console.warn(`⚠️ Warning: Could not inject ${jsFile}:`, error.message);
            }
        }
        
        // Find </body> tag and inject JS before it
        const bodyCloseIndex = modifiedHTML.indexOf('</body>');
        if (bodyCloseIndex !== -1) {
            modifiedHTML = modifiedHTML.slice(0, bodyCloseIndex) + 
                          jsInjection + 
                          modifiedHTML.slice(bodyCloseIndex);
            console.log('✅ JS files injected before </body>');
        } else {
            console.warn('⚠️ Warning: Could not find </body> tag');
        }
        
        return modifiedHTML;
    }

    /**
     * Start the HTTP server
     */
    startServer(html) {
        return new Promise((resolve, reject) => {
            this.server = http.createServer((req, res) => {
                console.log(`📝 Request: ${req.method} ${req.url} from ${req.headers['user-agent'] || 'Unknown'}`);
                
                // Parse the URL to determine routing
                const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
                const pathname = parsedUrl.pathname;
                
                // Serve HTML only for root paths (/ or /index.html)
                if (pathname === '/' || pathname === '/index.html') {
                    // Set headers for proper HTML serving
                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    });
                    
                    res.end(html);
                } else {
                    // Return 404 for all other requests (assets, etc.)
                    console.log(`❌ 404 - Asset not found: ${pathname}`);
                    res.writeHead(404, {
                        'Content-Type': 'text/plain; charset=utf-8',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    });
                    
                    res.end(`404 - Not Found: ${pathname}`);
                }
            });

            this.server.on('error', (error) => {
                if (error.code === 'EADDRINUSE') {
                    console.warn(`⚠️ Port ${this.port} is in use, trying ${this.port + 1}...`);
                    this.port++;
                    this.startServer(html).then(resolve).catch(reject);
                } else {
                    console.error('❌ Server error:', error.message);
                    reject(error);
                }
            });

            this.server.listen(this.port, 'localhost', () => {
                console.log(`🌟 Test server started at http://localhost:${this.port}`);
                resolve(`http://localhost:${this.port}`);
            });
        });
    }

    /**
     * Open the test page in the default browser
     */
    openBrowser(url) {
        console.log('🌐 Opening test page in default browser...');
        
        const command = process.platform === 'darwin' ? 'open' :
                       process.platform === 'win32' ? 'start' : 'xdg-open';
        
        exec(`${command} ${url}`, (error) => {
            if (error) {
                console.warn('⚠️ Could not open browser automatically:', error.message);
                console.log(`🔗 Please manually open: ${url}`);
            } else {
                console.log('✅ Browser opened successfully');
            }
        });
    }

    /**
     * Clean shutdown
     */
    shutdown() {
        console.log('\n🛑 Shutting down test server...');
        if (this.server) {
            this.server.close(() => {
                console.log('✅ Server closed');
                process.exit(0);
            });
        } else {
            process.exit(0);
        }
    }

    /**
     * Main execution method
     */
    async run() {
        try {
            console.log('🎯 Starting TheIngenuity.co Test Runner...\n');
            
            // Step 1: Fetch HTML from live site
            const originalHTML = await this.fetchHTML();
            
            // Step 2: Inject local assets
            const modifiedHTML = this.injectAssets(originalHTML);
            
            // Step 3: Start local server
            const testUrl = await this.startServer(modifiedHTML);
            
            // Step 4: Open browser
            this.openBrowser(testUrl);
            
            console.log('\n🎉 Test environment ready!');
            console.log('🔗 Test URL:', testUrl);
            console.log('📝 Press Ctrl+C to stop the server');
            
        } catch (error) {
            console.error('\n❌ Test Runner failed:', error.message);
            console.error('Stack:', error.stack);
            process.exit(1);
        }
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    if (global.testRunner) {
        global.testRunner.shutdown();
    } else {
        console.log('\n🛑 Shutting down...');
        process.exit(0);
    }
});

process.on('SIGTERM', () => {
    if (global.testRunner) {
        global.testRunner.shutdown();
    }
});

// Main execution
if (require.main === module) {
    global.testRunner = new TestRunner();
    global.testRunner.run();
}

module.exports = TestRunner;