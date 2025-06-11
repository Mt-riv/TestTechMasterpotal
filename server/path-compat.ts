// Path compatibility layer for Node.js versions < 20.11.0
import { fileURLToPath } from "url";
import path from "path";

// Polyfill for import.meta.dirname which is not available in Node.js < 20.11.0
export function getProjectRoot(): string {
  // Get the current file path
  const currentFile = fileURLToPath(import.meta.url);
  // Go up one level from server/ to project root
  return path.dirname(path.dirname(currentFile));
}

// Export directory paths for consistent usage
export const PROJECT_ROOT = getProjectRoot();
export const CLIENT_DIR = path.join(PROJECT_ROOT, "client");
export const SERVER_DIR = path.join(PROJECT_ROOT, "server");
export const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");
export const DIST_DIR = path.join(PROJECT_ROOT, "dist");