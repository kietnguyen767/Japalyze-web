import { readdirSync, readFileSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import { describe, it, expect } from 'vitest';

// Recursively find all .ts/.tsx files
function findSourceFiles(dir: string, skip: string[] = []): string[] {
  const files: string[] = [];
  try {
    for (const entry of readdirSync(dir)) {
      if (skip.includes(entry)) continue;
      const full = join(dir, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) {
        files.push(...findSourceFiles(full, skip));
      } else if (['.ts', '.tsx'].includes(extname(entry))) {
        files.push(full);
      }
    }
  } catch {
    /* ignore unreadable dirs */
  }
  return files;
}

const FE_ROOT = join(__dirname, '..');
const SKIP_DIRS = ['node_modules', '.next', '__pycache__', '__tests__'];
const SKIP_FILES = ['conversationData.ts', 'pos.ts'];

const sourceFiles = [
  ...findSourceFiles(join(FE_ROOT, 'app'), SKIP_DIRS),
  ...findSourceFiles(join(FE_ROOT, 'components'), SKIP_DIRS),
  ...findSourceFiles(join(FE_ROOT, 'context'), SKIP_DIRS),
  ...findSourceFiles(join(FE_ROOT, 'lib'), SKIP_DIRS),
].filter(f => !SKIP_FILES.some(skip => f.endsWith(skip)));

describe('Code Quality Guards', () => {
  it('no console.log calls in source files', () => {
    const violations: string[] = [];
    for (const file of sourceFiles) {
      const content = readFileSync(file, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((line, i) => {
        if (/console\.log\s*\(/.test(line) && !line.trim().startsWith('//')) {
          violations.push(`${file}:${i + 1}: ${line.trim()}`);
        }
      });
    }
    expect(violations, `Found console.log: ${violations.join('\n')}`).toHaveLength(0);
  });

  it('no console.warn calls in source files (except intentional ChatSession AI feedback warning)', () => {
    const violations: string[] = [];
    for (const file of sourceFiles) {
      if (file.includes('ChatSession')) continue; // intentional warning about AI feedback
      const content = readFileSync(file, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((line, i) => {
        if (/console\.warn\s*\(/.test(line) && !line.trim().startsWith('//')) {
          violations.push(`${file}:${i + 1}: ${line.trim()}`);
        }
      });
    }
    expect(violations, `Found console.warn: ${violations.join('\n')}`).toHaveLength(0);
  });

  it('no token values logged (no .substring pattern in console calls)', () => {
    const violations: string[] = [];
    for (const file of sourceFiles) {
      const content = readFileSync(file, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((line, i) => {
        // A token leak would have both a console call AND .substring() on same line or nearby
        if (/\.substring\(0,\s*20\)/.test(line)) {
          violations.push(`${file}:${i + 1}: ${line.trim()}`);
        }
      });
    }
    expect(violations, `Found token logging: ${violations.join('\n')}`).toHaveLength(0);
  });
});
