#!/usr/bin/env node
/**
 * Comprehensive Syntax Validation Script for GaiaExchanges
 * 
 * This script runs comprehensive validation checks to ensure
 * the codebase is free of syntax errors and builds correctly.
 * 
 * Usage: node scripts/validate-syntax.js
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runCommand(command, description) {
  console.log(`🔍 ${description}...`);
  try {
    const output = execSync(command, { stdio: 'pipe', cwd: path.join(__dirname, '..') });
    console.log(`   ✅ ${description} - PASSED\n`);
    return { success: true, output: output.toString() };
  } catch (error) {
    console.log(`   ❌ ${description} - FAILED`);
    console.log(`   Error: ${error.message}`);
    if (error.stdout) {
      console.log(`   Output: ${error.stdout.toString()}`);
    }
    console.log('');
    return { success: false, error: error.message, output: error.stdout?.toString() || '' };
  }
}

console.log('🚀 Starting comprehensive syntax validation...\n');

const checks = [
  {
    command: 'npx tsc --noEmit --skipLibCheck',
    description: 'TypeScript Compilation Check'
  },
  {
    command: 'npm run build',
    description: 'Vite Build Check'
  },
  {
    command: 'npm run lint',
    description: 'ESLint Check'
  }
];

let allPassed = true;
const results = [];

for (const check of checks) {
  const result = runCommand(check.command, check.description);
  results.push({ ...check, ...result });
  
  if (!result.success) {
    allPassed = false;
  }
}

// Run the syntax audit
console.log('🔍 Running syntax pattern audit...');
try {
  const auditOutput = execSync('node scripts/syntax-audit.js', { stdio: 'pipe', cwd: path.join(__dirname, '..') });
  console.log('   ✅ Syntax audit completed\n');
  console.log(auditOutput.toString());
} catch (error) {
  console.log('   ⚠️  Syntax audit found potential issues to review\n');
  console.log(error.stdout?.toString() || error.message);
}

// Summary
console.log('📋 VALIDATION SUMMARY');
console.log('=====================================');

results.forEach(result => {
  const status = result.success ? '✅ PASSED' : '❌ FAILED';
  console.log(`${result.description}: ${status}`);
});

if (allPassed) {
  console.log('\n🎉 All validation checks passed!');
  console.log('The codebase is ready for deployment.');
} else {
  console.log('\n⚠️  Some validation checks failed.');
  console.log('Please review and fix the issues before deployment.');
}

console.log(`\nValidation completed at: ${new Date().toISOString()}`);

process.exit(allPassed ? 0 : 1);