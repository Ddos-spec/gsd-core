'use strict';

const { describe, test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const workflow = fs.readFileSync(path.join(ROOT, 'gsd-core/workflows/ui-review.md'), 'utf8');
const auditor = fs.readFileSync(path.join(ROOT, 'agents/gsd-ui-auditor.md'), 'utf8');
const compactAuditor = fs.readFileSync(path.join(ROOT, 'agents/gsd-ui-auditor.compact.md'), 'utf8');

describe('bounded autonomous UI repair', () => {
  test('workflow only enables code changes with --fix and passes the flag to the auditor', () => {
    assert.match(workflow, /Set `UI_REPAIR=true` only when `\$ARGUMENTS` contains `--fix`/);
    assert.match(workflow, /repair_enabled: \{UI_REPAIR\}/);
    assert.match(workflow, /If `--fix`[\s\S]*?Skip the choice prompt/);
  });

  test('repair is limited to three findings and one verified pass', () => {
    for (const source of [auditor, compactAuditor]) {
      assert.match(source, /fix at most three|Select at most the three/i);
      assert.match(source, /Stop after this single pass|Stop\. Do not start another repair cycle/i);
      assert.match(source, /browser evidence is unavailable/i);
      assert.match(source, /Visuals at 2\/4/);
      assert.match(source, /do not install packages|install no packages/i);
    }
  });
});
