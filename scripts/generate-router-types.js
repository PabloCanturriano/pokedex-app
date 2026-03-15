#!/usr/bin/env node
/**
 * Generates .expo/types/router.d.ts for typed routes without running expo export.
 * Used in CI to make `tsc --noEmit` work with Expo Router typed routes.
 */
const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '..');
const outputDir = path.join(root, '.expo', 'types');

process.env.EXPO_ROUTER_APP_ROOT = path.join(root, 'app');

const { EXPO_ROUTER_CTX_IGNORE } = require('expo-router/_ctx-shared');
const requireContext = require('expo-router/build/testing-library/require-context-ponyfill').default;
const { getTypedRoutesDeclarationFile } = require('expo-router/build/typed-routes/generate');

const ctx = requireContext(process.env.EXPO_ROUTER_APP_ROOT, true, EXPO_ROUTER_CTX_IGNORE);
const file = getTypedRoutesDeclarationFile(ctx);

if (!file) {
  console.error('No typed routes declaration generated.');
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, 'router.d.ts'), file);
console.log('Generated .expo/types/router.d.ts');
