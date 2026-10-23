# Multi-Runtime Adapter Implementation Plan

> **For agentic workers:** Use this plan task by task. Steps use checkbox syntax for tracking.

**Goal:** Install and verify GSD Core workflows in Codex, Claude Code, Antigravity, Grok Build, and Mistral Vibe through one maintained source tree.

**Architecture:** Promote Grok Build from its legacy home-only path into the capability registry and add Mistral Vibe as a runtime descriptor. Reuse the installer’s descriptor-driven artifact staging and converters where their formats match, then add runtime-specific conversion only where official docs require it. Native hooks are a separate follow-up unless existing installer contracts support them without changing other runtimes.

**Tech Stack:** Node.js 24+, TypeScript `.cts` sources compiled to CommonJS, capability JSON descriptors, `node:test`, existing installer integration tests.

**Spec:** `docs/superpowers/specs/2026-10-23-multi-runtime-adapters.md`

## Global Constraints

- Preserve existing runtime install behavior and generated-file ownership rules.
- Define runtime data in `capabilities/<runtime>/capability.json`; regenerate the capability registry instead of editing it by hand.
- Prove each behavior with a failing test before implementation.
- Use only paths and formats supported by current official runtime documentation.
- Never write credentials or account tokens into repository files.

## Review Focus

- A legacy Grok home override must keep resolving after registry promotion.
- `--all` must include each supported runtime exactly once, while legacy aliases do not duplicate runtimes.
- Vibe's `VIBE_HOME` must win over its default home, including Windows paths.
- Shared `.agents/skills` discovery must not cause duplicate destructive writes or overwrite user-owned files.
- Unverified native hooks/agent converters must not be advertised as supported.

---

### Task 1: Promote Grok Build into the runtime registry

**Files:**
- Create: `capabilities/grok/capability.json`
- Modify: `src/runtime-name-policy.cts`
- Modify: `src/runtime-homes.cts`
- Modify: `src/runtime-artifact-layout.cts`
- Modify: `bin/install.js`
- Modify: runtime/install contract tests identified by the red test
- Generate: `gsd-core/bin/lib/capability-registry.cjs`

**Interfaces:**
- Grok config home defaults to `~/.grok`, honoring `GROK_HOME`.
- Grok skills install under its native `~/.grok/skills` root, keeping `--all` projections isolated from Codex's shared `~/.agents/skills` root.
- Runtime selection uses `--grok`; `--all` selects it once.

- [x] **Step 1: Add failing registry and install tests** asserting runtime discovery, home override, installer flag, and a staged GSD skill under the documented shared skills root.
- [x] **Step 2: Run the focused tests and confirm failure** because Grok is currently legacy-only and absent from the installer registry.
- [x] **Step 3: Add the Grok capability descriptor and descriptor-driven home/layout registration.**
- [x] **Step 4: Regenerate the capability registry and pass focused tests.**
- [x] **Step 5: Run Grok installer integration tests and inspect staged paths/content.**

### Task 2: Add Mistral Vibe CLI runtime support

**Files:**
- Create: `capabilities/vibe/capability.json`
- Modify: `src/runtime-name-policy.cts`
- Modify: `src/runtime-artifact-layout.cts` only if descriptor resolution requires it
- Modify: `bin/install.js`
- Create/modify: focused Vibe runtime and installer tests
- Generate: `gsd-core/bin/lib/capability-registry.cjs`

**Interfaces:**
- Vibe config home defaults to `~/.vibe`, honoring `VIBE_HOME`.
- Skills use Vibe's native `~/.vibe/skills` install root; the standard `~/.agents/skills` root remains readable as a shared compatibility location.
- Runtime selection uses `--vibe`; `--all` selects it once.

- [x] **Step 1: Add failing tests** for runtime registry discovery, `VIBE_HOME`, CLI flag, and native skill installation.
- [x] **Step 2: Run focused tests and confirm failure.**
- [x] **Step 3: Implement descriptor-driven skill support** using the standard Agent Skills markdown format. Do not emit native agent TOML or `hooks.toml` until conversion and merge semantics are covered by tests.
- [x] **Step 4: Regenerate registry and pass focused tests.**
- [x] **Step 5: Verify Vibe's installed skill paths and run the runtime contract suite.**

### Task 3: Verify the supported five-runtime installation path

**Files:**
- Modify: relevant user guide and generated/runtime matrix docs
- Modify: integration tests only where needed to pin `--all` and selected-runtime behavior

- [x] **Step 1: Add a failing test that `--all` contains Grok and Vibe once each.**
- [x] **Step 2: Run it red.**
- [x] **Step 3: Update generated CLI selection/help and runtime documentation from registry data where possible.**
- [x] **Step 4: Run focused runtime/install tests, build/codegen drift checks, Semgrep auto scan, and AST syntax validation for changed sources.** The targeted Semgrep scan is clean; the repository-wide auto scan reports inherited findings. The broad installer test file exceeded its 10-minute harness limit, so only its Grok/Vibe install cases were rerun by name and passed.
- [x] **Step 5: Review the diff and record gaps that require a real local Grok/Vibe binary for native hook and session-flow verification.**

### Follow-up: keep combined installs collision-free

- [x] Add a regression test that installs the five target runtimes under one isolated home and checks that each converted `gsd-help` skill remains in a distinct root.
- [x] Move Grok's projection from the shared `~/.agents/skills` directory to its documented native `~/.grok/skills` directory and use `GROK_HOME` for both config and skills.
- [x] Rewrite Grok/Vibe internal workflow references to their own installed `gsd-core` trees and verify that a combined Grok+Vibe CLI install emits no Claude-home dependency.
- [x] Add curated Grok Build and Mistral Vibe labels so installer output identifies the selected runtime correctly.
- [x] Add `~/.grok` to the canonical GSD tool resolver and regenerate its propagated workflow/agent copies.
- [ ] Smoke-test skill discovery and invocation in the real Grok and Vibe hosts; Grok Build is installed but no no-cost headless skill-list command is documented, and the Vibe CLI is not currently found on this machine.
