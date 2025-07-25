#!/usr/bin/env node
/**
 * Syntax Audit Script for GaiaExchanges
 * 
 * This script audits the codebase for potential syntax issues where
 * a number is immediately followed by an identifier (e.g., 123foo).
 * 
 * Usage: node scripts/syntax-audit.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively find all JS/TS files
function findJSFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && item !== 'node_modules' && item !== '.git' && item !== 'dist') {
      findJSFiles(fullPath, files);
    } else if (stat.isFile() && /\.(js|jsx|ts|tsx)$/.test(item)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to detect potential syntax issues
function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const issues = [];
  
  lines.forEach((line, index) => {
    // Skip comments and strings as much as possible
    let processedLine = line;
    
    // Remove single line comments
    const commentIndex = processedLine.indexOf('//');
    if (commentIndex !== -1) {
      processedLine = processedLine.substring(0, commentIndex);
    }
    
    // Remove strings (basic approach)
    processedLine = processedLine.replace(/'[^']*'/g, '');
    processedLine = processedLine.replace(/"[^"]*"/g, '');
    processedLine = processedLine.replace(/`[^`]*`/g, '');
    
    // Look for problematic patterns: number immediately followed by identifier
    const problematicPattern = /\b(\d+)([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g;
    let match;
    
    while ((match = problematicPattern.exec(processedLine)) !== null) {
      const [fullMatch, number, identifier] = match;
      
      // Skip common valid patterns
      const validPatterns = [
        /^\d+(px|em|rem|%|vh|vw|vmin|vmax|deg|rad|turn|grad|s|ms|hz|khz)$/i,
        /^\d+(h|d|x|k|m|b|xl|sm|md|lg|fr)$/i, // units and Tailwind classes
        /^0x[0-9a-f]+$/i, // hexadecimal numbers
        /^\d+e\d+$/i, // scientific notation
        /^\d+[a-f]$/i, // hex digits
        /^\d+_(GB|MB|KB|TB|FA|TV|p)$/i, // common units with underscores
      ];
      
      const isValidPattern = validPatterns.some(pattern => pattern.test(fullMatch));
      
      if (!isValidPattern) {
        // Check if it's part of a larger hex number or similar
        const beforeMatch = processedLine.substring(0, match.index);
        const afterMatch = processedLine.substring(match.index + fullMatch.length);
        
        // Skip if it's part of a hex number (0x prefix)
        if (beforeMatch.endsWith('0x') || beforeMatch.endsWith('0X')) {
          continue;
        }
        
        // Skip if it's part of object property access
        if (beforeMatch.endsWith('.') || afterMatch.startsWith('.')) {
          continue;
        }
        
        // Skip if it's a numeric separator (valid ES2021)
        if (fullMatch.includes('_') && /^\d+_\d+/.test(fullMatch)) {
          continue;
        }
        
        issues.push({
          file: filePath,
          line: index + 1,
          content: line.trim(),
          issue: `Potential syntax error: "${fullMatch}" - number immediately followed by identifier`,
          suggestion: `Consider: "${number} * ${identifier}" or "${number}.${identifier}" or "${number}_${identifier}" depending on intent`
        });
      }
    }
  });
  
  return issues;
}

// Main audit function
function runAudit(directory) {
  const files = findJSFiles(directory);
  const allIssues = [];
  
  console.log(`🔍 Auditing ${files.length} files for syntax issues...\n`);
  
  files.forEach(file => {
    const issues = auditFile(file);
    allIssues.push(...issues);
  });
  
  if (allIssues.length === 0) {
    console.log('✅ No syntax issues found!');
  } else {
    console.log(`⚠️  Found ${allIssues.length} potential syntax issues to review:\n`);
    
    allIssues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.file}:${issue.line}`);
      console.log(`   Code: ${issue.content}`);
      console.log(`   Issue: ${issue.issue}`);
      console.log(`   Suggestion: ${issue.suggestion}\n`);
    });
    
    console.log('📝 Note: These may be false positives. Review each case manually.');
    console.log('   Most patterns in strings, CSS, or Tailwind classes are valid.');
  }
  
  return allIssues;
}

// Run the audit
const projectDir = process.argv[2] || path.join(__dirname, '..');
const issues = runAudit(projectDir);

// Exit with appropriate message
if (issues.length === 0) {
  console.log('\n🎉 Syntax audit completed successfully - no issues found!');
} else {
  console.log(`\n📋 Syntax audit completed - ${issues.length} potential issues found for review.`);
}