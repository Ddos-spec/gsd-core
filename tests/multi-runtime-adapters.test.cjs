'use strict';

const { describe, test } = require('node:test');
const assert = require('node:assert/strict');
const os = require('node:os');
const path = require('node:path');
process.env.GSD_TEST_MODE = '1';

const { runtimes } = require('../gsd-core/bin/lib/capability-registry.cjs');
const { getGlobalConfigDir, getGlobalSkillsBase } = require('../gsd-core/bin/lib/runtime-homes.cjs');
const { resolveRuntimeArtifactLayout } = require('../gsd-core/bin/lib/runtime-artifact-layout.cjs');
const { convertClaudeCommandToGrokSkill, convertClaudeCommandToVibeSkill } = require('../gsd-core/bin/lib/runtime-artifact-conversion.cjs');
const { allRuntimes, selectRuntimesFromArgs } = require('../bin/install.js');

function withEnv(overrides, fn) {
  const saved = {};
  for (const [name, value] of Object.entries(overrides)) {
    saved[name] = process.env[name];
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
  try {
    return fn();
  } finally {
    for (const [name, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
}

describe('first-class Grok Build and Mistral Vibe runtime homes', () => {
  test('registers Grok and resolves skills under its native home, separate from Codex', () => {
    withEnv({ GROK_HOME: undefined }, () => {
      assert.ok(runtimes.grok?.runtime, 'Grok Build must have a runtime descriptor');
      assert.equal(getGlobalConfigDir('grok'), path.join(os.homedir(), '.grok'));
      assert.equal(getGlobalSkillsBase('grok'), path.join(os.homedir(), '.grok', 'skills'));
      assert.notEqual(getGlobalSkillsBase('grok'), getGlobalSkillsBase('codex'));
    });
  });

  test('uses GROK_HOME for both Grok config and skills', () => {
    withEnv({ GROK_HOME: '~/grok-home' }, () => {
      assert.equal(getGlobalConfigDir('grok'), path.join(os.homedir(), 'grok-home'));
      assert.equal(getGlobalSkillsBase('grok'), path.join(os.homedir(), 'grok-home', 'skills'));
      const layout = resolveRuntimeArtifactLayout('grok', getGlobalConfigDir('grok'));
      assert.equal(layout.kinds[0].destSubpath, 'skills');
    });
  });

  test('registers Vibe and resolves its native home and skill path', () => {
    withEnv({ VIBE_HOME: undefined }, () => {
      assert.ok(runtimes.vibe?.runtime, 'Mistral Vibe must have a runtime descriptor');
      assert.equal(getGlobalConfigDir('vibe'), path.join(os.homedir(), '.vibe'));
      assert.equal(getGlobalSkillsBase('vibe'), path.join(os.homedir(), '.vibe', 'skills'));
    });
  });

  test('uses VIBE_HOME for both Vibe config and skill roots', () => {
    withEnv({ VIBE_HOME: '~/custom-vibe' }, () => {
      assert.equal(getGlobalConfigDir('vibe'), path.join(os.homedir(), 'custom-vibe'));
      assert.equal(getGlobalSkillsBase('vibe'), path.join(os.homedir(), 'custom-vibe', 'skills'));
    });
  });

  test('selects Grok and Vibe by flag and exactly once through --all', () => {
    assert.deepEqual(selectRuntimesFromArgs(['--grok']), ['grok']);
    assert.deepEqual(selectRuntimesFromArgs(['--vibe']), ['vibe']);
    const selected = selectRuntimesFromArgs(['--all']);
    assert.equal(selected.filter((runtime) => runtime === 'grok').length, 1);
    assert.equal(selected.filter((runtime) => runtime === 'vibe').length, 1);
    assert.equal(allRuntimes.filter((runtime) => runtime === 'grok').length, 1);
    assert.equal(allRuntimes.filter((runtime) => runtime === 'vibe').length, 1);
  });

  test('converts command markdown into invocable Grok and Vibe skills', () => {
    const source = '---\ndescription: Run /gsd:plan-phase for this project\nallowed-tools: Read, Bash\n---\n\nRun `/gsd:plan-phase` with $ARGUMENTS.';
    const grok = convertClaudeCommandToGrokSkill(source, 'gsd-plan-phase');
    const vibe = convertClaudeCommandToVibeSkill(source, 'gsd-plan-phase');

    for (const output of [grok, vibe]) {
      assert.match(output, /^---\nname: ["']?gsd-plan-phase["']?\n/);
      assert.match(output, /description: .*plan-phase/);
      assert.match(output, /user-invocable: true/);
      assert.match(output, /`\/gsd-plan-phase`/);
      assert.doesNotMatch(output, /^allowed-tools:/m);
    }
    assert.match(vibe, /Vibe/);
    assert.match(grok, /End-to-End Execution/);
    assert.match(grok, /inspect, plan, implement, verify, and summarize/);
    assert.match(grok, /ask the user only when missing information blocks/);
    assert.match(vibe, /ask the user only when missing information blocks/);
  });
});
