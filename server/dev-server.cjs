// Development server with Node.js compatibility
const express = require('express');
const { createServer } = require('vite');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Get project root using require.resolve for compatibility
const projectRoot = path.dirname(__dirname);

async function startDevServer() {
  try {
    console.log(`Starting development server on port ${port}...`);
    console.log(`Project root: ${projectRoot}`);
    
    // Create Vite server with manual configuration
    const vite = await createServer({
      root: path.join(projectRoot, 'client'),
      server: {
        middlewareMode: true,
        hmr: { port: port + 1 }
      },
      resolve: {
        alias: {
          '@': path.resolve(projectRoot, 'client', 'src'),
          '@shared': path.resolve(projectRoot, 'shared'),
          '@assets': path.resolve(projectRoot, 'attached_assets'),
        },
      },
      build: {
        outDir: path.resolve(projectRoot, 'dist/public'),
        emptyOutDir: true,
      },
    });

    app.use(vite.middlewares);

    // Handle client-side routing
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      
      try {
        const templatePath = path.resolve(projectRoot, 'client', 'index.html');
        let template = require('fs').readFileSync(templatePath, 'utf-8');
        
        // Add cache busting
        const cacheId = Date.now().toString(36);
        template = template.replace(
          'src="/src/main.tsx"',
          `src="/src/main.tsx?v=${cacheId}"`
        );
        
        const html = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });

    app.listen(port, '0.0.0.0', () => {
      console.log(`Development server running at:`);
      console.log(`  Local:   http://localhost:${port}`);
      console.log(`  Network: http://0.0.0.0:${port}`);
    });

  } catch (error) {
    console.error('Failed to start development server:', error.message);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down development server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  process.exit(0);
});

startDevServer();