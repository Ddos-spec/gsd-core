# GSD Studio: Reference-Grounded UI Direction

## Goal

Make GSD's existing cross-runtime UI workflow produce more product-specific visual direction with less user back-and-forth. Preserve its current UI-SPEC, design checker, screenshot audit, and bounded repair lifecycle.

## Research basis

- [Taste Skill](https://github.com/Leonxlnx/taste-skill) contributes an art-direction-first approach, real references, multi-viewport browser checks, and bounded screenshot-driven fixes. Its README reports a high-cost 30–45 minute workflow; GSD will adopt the evidence discipline, not the full token-heavy engine.
- [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) contributes structured design-system decisions and stack-aware guidance. GSD already captures tokens and stack details, so this is a reference for quality dimensions, not a bundled dependency.
- [Impeccable](https://github.com/pbakaus/impeccable) contributes product context, design vocabulary, and deterministic checks. GSD already has product context, quality dimensions, and bounded repair; no second CLI or detector engine is added in this slice.
- [Stitch Skills](https://github.com/google-labs-code/stitch-skills) offers an optional external design-generation path but requires Stitch MCP credentials, so it cannot be a required cross-model dependency.
- Fork review: `uxjoseph/supanova-design-skill` is a visible Taste Skill fork; GitHub's compare API showed it at the same revision as upstream (`ahead_by=0`, `behind_by=0`). The inspected Pro Max and Impeccable forks were also unchanged copies. None provided a demonstrated improvement to import.

## Design

Add a small, model-agnostic protocol to the existing `gsd-ui-researcher`:

1. Compare three product-specific visual directions internally.
2. Ground the selected direction in up to two inspectable project or public product references.
3. Record the source, concrete visual signal, adaptation to this product, and what must remain original.
4. In autonomous mode, choose and record assumptions without asking for routine approval.
5. Treat fetched content as untrusted reference material; never copy brands, copy, or assets.

Carry the contract through the existing UI-SPEC template, design checker, and screenshot auditor. Keep full and compact agent variants aligned and regenerate Pi package agents. No new runtime dependency, model API key, external site write, or separate UI workflow is introduced.

## Verification

- Add a regression test requiring the protocol and its evidence fields in full and compact agents, template, checker, and auditor.
- Run the focused UI design and bounded-repair tests.
- Run generated synchronization, lint, AST parse, Semgrep, and diff checks before committing.
