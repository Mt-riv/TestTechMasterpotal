// Local development helper script
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectRoot = __dirname;

function checkNodeVersion() {
  const version = process.version;
  const majorVersion = parseInt(version.slice(1).split('.')[0]);
  
  if (majorVersion < 18) {
    console.error(`Node.js 18+ required. Current version: ${version}`);
    process.exit(1);
  }
}

function ensureDependencies() {
  const nodeModulesPath = path.join(projectRoot, 'node_modules');
  
  if (!fs.existsSync(nodeModulesPath)) {
    console.log('Installing dependencies...');
    return new Promise((resolve, reject) => {
      const install = spawn('npm', ['install'], {
        cwd: projectRoot,
        stdio: 'inherit',
        shell: process.platform === 'win32'
      });
      
      install.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error('Failed to install dependencies'));
        }
      });
    });
  }
  
  return Promise.resolve();
}

function startDevelopmentServer() {
  console.log('Starting development server...');
  
  const server = spawn('npm', ['run', 'dev'], {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: {
      ...process.env,
      NODE_ENV: 'development',
      PORT: process.env.PORT || '5000'
    }
  });
  
  server.on('error', (err) => {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  });
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down development server...');
    server.kill('SIGINT');
    process.exit(0);
  });
}

async function main() {
  try {
    checkNodeVersion();
    await ensureDependencies();
    startDevelopmentServer();
  } catch (error) {
    console.error('Setup failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkNodeVersion, ensureDependencies, startDevelopmentServer };