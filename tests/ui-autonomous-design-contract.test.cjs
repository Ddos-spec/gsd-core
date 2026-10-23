'use strict';

const { describe, test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const workflow = fs.readFileSync(path.join(ROOT, 'gsd-core/workflows/ui-phase.md'), 'utf8');
const researcher = fs.readFileSync(path.join(ROOT, 'agents/gsd-ui-researcher.md'), 'utf8');
const specTemplate = fs.readFileSync(path.join(ROOT, 'gsd-core/templates/UI-SPEC.md'), 'utf8');
const checker = fs.readFileSync(path.join(ROOT, 'agents/gsd-ui-checker.md'), 'utf8');
const auditor = fs.readFileSync(path.join(ROOT, 'agents/gsd-ui-auditor.md'), 'utf8');

describe('autonomous UI design contract', () => {
  test('ui-phase passes explicit auto mode to the researcher', () => {
    assert.match(workflow, /AUTO_MODE=false[\s\S]*?--auto[\s\S]*?<execution_mode>[\s\S]*?auto_mode:\s*\$\{AUTO_MODE\}/);
    assert.match(workflow, /<execution_mode>[\s\S]*?auto_mode:\s*\$\{AUTO_MODE\}/);
  });

  test('researcher records evidence-based defaults instead of prompting in auto mode', () => {
    assert.match(researcher, /<auto_mode_policy>[\s\S]*?When `auto_mode` is true[\s\S]*?Do not ask the user/);
    assert.match(researcher, /record the assumption and its rationale/i);
  });

  test('auto mode does not initialize shadcn or approve third-party registries', () => {
    assert.match(researcher, /If `auto_mode` is true[\s\S]*?Do not ask to initialize shadcn and do not run `npx shadcn init`/);
    assert.match(researcher, /do not initialize shadcn, install packages, or add a third-party registry/i);
  });

  test('UI contract requires product-specific visual direction and a recorded rationale', () => {
    assert.match(specTemplate, /## Product and Visual Direction/);
    assert.match(specTemplate, /Audience and use context/);
    assert.match(specTemplate, /Creative direction/);
    assert.match(specTemplate, /Primary visual anchor/);
    assert.match(specTemplate, /Assumptions and Rationale/);
    assert.match(checker, /Dimension 2: Visuals[\s\S]*?Creative direction/);
    assert.match(auditor, /Compare rendered screenshots with the UI-SPEC's audience, creative direction/);
  });
});
