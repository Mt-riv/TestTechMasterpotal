#!/usr/bin/env node

// Local development starter with Node.js compatibility
const { spawn } = require('child_process');
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
  // Use the Node.js compatible development server
  const serverProcess = spawn('node', ['server/dev-server.js'], {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: {
      ...process.env
    }
  });

  serverProcess.on('error', (error) => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down development server...');
    serverProcess.kill('SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    serverProcess.kill('SIGTERM');
    process.exit(0);
  });
}