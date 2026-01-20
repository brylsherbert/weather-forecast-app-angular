#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get API key from environment variable
const apiKey = process.env.WEATHER_API_KEY || 'YOUR_API_KEY_HERE';

// Path to environment.prod.ts
const envProdPath = path.join(__dirname, '../src/environments/environment.prod.ts');

// Read the file
let envContent = fs.readFileSync(envProdPath, 'utf8');

// Replace the placeholder with the actual API key
envContent = envContent.replace(
  /weatherApiKey:\s*process\.env\['WEATHER_API_KEY'\]\s*\|\|\s*'YOUR_API_KEY_HERE'/,
  `weatherApiKey: '${apiKey}'`
);

// If the above doesn't match (fallback for simple replacement)
if (envContent.includes('YOUR_API_KEY_HERE')) {
  envContent = envContent.replace(
    /weatherApiKey:\s*['"]YOUR_API_KEY_HERE['"]/,
    `weatherApiKey: '${apiKey}'`
  );
}

// Write back to file
fs.writeFileSync(envProdPath, envContent, 'utf8');

console.log('✓ Environment file updated with API key for Netlify build');

// Exit with success
process.exit(0);
