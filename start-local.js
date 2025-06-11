#!/usr/bin/env node

// Local development starter with Node.js compatibility
const { spawn } = require('child_process');
const { fileURLToPath } = require('url');
const path = require('path');
const fs = require('fs');

// Get project root directory
const projectRoot = process.cwd();

// Set up environment for local development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || '5000';

console.log('Starting local development server...');
console.log(`Node.js version: ${process.version}`);
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Port: ${process.env.PORT}`);
console.log(`Project root: ${projectRoot}`);

// Check if dependencies are installed
const nodeModulesPath = path.join(projectRoot, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('Installing dependencies...');
  const installProcess = spawn('npm', ['install'], {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  
  installProcess.on('close', (code) => {
    if (code === 0) {
      startServer();
    } else {
      console.error('Failed to install dependencies');
      process.exit(1);
    }
  });
} else {
  startServer();
}

function startServer() {
  // Create a compatibility shim file
  const shimContent = `
// Node.js compatibility shim for import.meta.dirname
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up global compatibility for import.meta.dirname
if (!import.meta.dirname) {
  Object.defineProperty(import.meta, 'dirname', {
    value: __dirname,
    writable: false,
    enumerable: true,
    configurable: false
  });
}

// Now import the actual server
import('./index.ts');
`;

  const shimPath = path.join(projectRoot, 'server', 'start-shim.js');
  fs.writeFileSync(shimPath, shimContent);

  // Start the development server with the shim
  const serverProcess = spawn('npx', ['tsx', 'server/start-shim.js'], {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: {
      ...process.env,
      NODE_OPTIONS: '--loader tsx/esm'
    }
  });

  serverProcess.on('error', (error) => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down development server...');
    // Clean up shim file
    if (fs.existsSync(shimPath)) {
      fs.unlinkSync(shimPath);
    }
    serverProcess.kill('SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    if (fs.existsSync(shimPath)) {
      fs.unlinkSync(shimPath);
    }
    serverProcess.kill('SIGTERM');
    process.exit(0);
  });
}