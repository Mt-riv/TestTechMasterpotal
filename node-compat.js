// Node.js compatibility shim for import.meta.dirname
// This file provides backward compatibility for Node.js versions < 20.11.0

const { fileURLToPath } = require('url');
const path = require('path');

// Add import.meta.dirname polyfill if not available
if (typeof globalThis !== 'undefined' && !globalThis.import?.meta?.dirname) {
  const originalImport = globalThis.import;
  
  globalThis.import = new Proxy(originalImport || {}, {
    get(target, prop) {
      if (prop === 'meta') {
        return new Proxy(target.meta || {}, {
          get(metaTarget, metaProp) {
            if (metaProp === 'dirname') {
              // Return the directory of the current working directory
              return process.cwd();
            }
            return metaTarget[metaProp];
          }
        });
      }
      return target[prop];
    }
  });
}

module.exports = {};