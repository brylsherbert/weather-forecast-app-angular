#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('\n=== Netlify Build Script - API Key Injection ===\n');

try {
  // Get API key from environment variable
  const apiKey = process.env.WEATHER_API_KEY;

  console.log('Environment Variables Check:');
  console.log('- WEATHER_API_KEY exists:', !!apiKey);
  console.log('- WEATHER_API_KEY length:', apiKey ? apiKey.length : 0);
  console.log('- WEATHER_API_KEY value (first 5 chars):', apiKey ? apiKey.substring(0, 5) + '...' : 'N/A');

  if (!apiKey) {
    console.error('\n❌ FATAL ERROR: WEATHER_API_KEY environment variable is not set!');
    console.error('\nPlease add it in Netlify:');
    console.error('1. Go to Site settings → Environment variables');
    console.error('2. Add variable: WEATHER_API_KEY');
    console.error('3. Set value to your WeatherAPI.com API key');
    console.error('4. Deploy again\n');
    process.exit(1);
  }

  console.log('\n✓ WEATHER_API_KEY found!\n');

  // Path to environment.prod.ts
  const envProdPath = path.join(__dirname, '../src/environments/environment.prod.ts');

  // Check if file exists
  if (!fs.existsSync(envProdPath)) {
    console.error('❌ Error: environment.prod.ts not found at:', envProdPath);
    process.exit(1);
  }

  // Read the file
  let content = fs.readFileSync(envProdPath, 'utf8');
  
  console.log('Original file content:');
  console.log('---');
  console.log(content);
  console.log('---\n');

  // Simple string replacement - more reliable than regex
  if (!content.includes('__WEATHER_API_KEY__')) {
    console.error('❌ Error: __WEATHER_API_KEY__ placeholder not found in environment.prod.ts');
    console.error('Please ensure the file contains: weatherApiKey: \'__WEATHER_API_KEY__\',');
    process.exit(1);
  }

  // Replace all occurrences
  content = content.replace(/__WEATHER_API_KEY__/g, apiKey);

  console.log('After replacement (with masked key):');
  console.log('---');
  console.log(content.replace(new RegExp(apiKey, 'g'), apiKey.substring(0, 5) + '...' + apiKey.slice(-3)));
  console.log('---\n');

  // Write back to file
  fs.writeFileSync(envProdPath, content, 'utf8');

  console.log('✅ SUCCESS: API key injected into environment.prod.ts');
  console.log('✅ Ready to build Angular application\n');
  
  process.exit(0);
} catch (error) {
  console.error('\n❌ Build script error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
