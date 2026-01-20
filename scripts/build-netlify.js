#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

try {
  // Get API key from environment variable
  const apiKey = process.env.WEATHER_API_KEY || 'YOUR_API_KEY_HERE';

  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    console.warn('⚠ Warning: WEATHER_API_KEY environment variable not set. Using placeholder.');
  } else {
    console.log('✓ Found WEATHER_API_KEY environment variable');
  }

  // Path to environment.prod.ts
  const envProdPath = path.join(__dirname, '../src/environments/environment.prod.ts');

  // Check if file exists
  if (!fs.existsSync(envProdPath)) {
    console.error('❌ Error: environment.prod.ts file not found at:', envProdPath);
    process.exit(1);
  }

  // Read the file
  let envContent = fs.readFileSync(envProdPath, 'utf8');

  // Replace the placeholder with the actual API key
  const originalContent = envContent;
  envContent = envContent.replace(
    /weatherApiKey:\s*['"]YOUR_API_KEY_HERE['"]/g,
    `weatherApiKey: '${apiKey}'`
  );

  // Check if replacement was made
  if (envContent === originalContent && apiKey !== 'YOUR_API_KEY_HERE') {
    console.warn('⚠ Warning: Could not find placeholder to replace in environment.prod.ts');
  }

  // Write back to file
  fs.writeFileSync(envProdPath, envContent, 'utf8');

  console.log('✓ Environment file updated with API key for Netlify build');
  process.exit(0);
} catch (error) {
  console.error('❌ Error in build script:', error.message);
  console.error(error.stack);
  process.exit(1);
}
