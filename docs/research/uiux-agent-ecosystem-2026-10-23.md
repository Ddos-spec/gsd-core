# UI/UX agent ecosystem review — 2026-10-23

## Decision

Keep GSD Core as the workflow and cross-runtime base. The current upstream already
has `/gsd-ui-phase`, `/gsd-ui-review`, `/gsd-autonomous`, a seven-dimension UI
contract check, six-pillar visual review, Playwright screenshots, and opt-in
post-interaction capture. The missing opportunity is a more automatic, repeatable
quality loop that combines design direction, objective browser checks, and a
separate visual critic across runtimes.

Do not replace GSD with a second workflow engine or copy an entire UI skill pack
into the repository. First build a small, license-clean UI quality capability
around the existing contract and review stages. Add any external data or runtime
only when a benchmark shows a measurable improvement over the existing flow.

## What was checked

GitHub REST API snapshots and primary repository docs were inspected on
2026-10-23. Popularity and README feature counts are useful discovery signals,
not evidence that an agent produces better designs.

### GSD Core and its forks

- Upstream: [open-gsd/gsd-core](https://github.com/open-gsd/gsd-core). The API
  snapshot showed 764 forks, 10,788 stars, and a push on the same day. The
  default branch is `next`.
- UI workflow: [UI phase guide](https://github.com/open-gsd/gsd-core/blob/next/docs/how-to/design-a-ui-phase.md),
  [UI review workflow](https://github.com/open-gsd/gsd-core/blob/next/gsd-core/workflows/ui-review.md),
  [autonomous command](https://github.com/open-gsd/gsd-core/blob/next/commands/gsd/autonomous.md).
- No reviewed fork had a material, maintained improvement to adopt. The
  `Aslanzoghi/gsd-core-kiro` fork was 55 commits behind `next` and 0 ahead;
  `claude-repos/gsd-core` was 2,424 behind. The latest Ddos-spec fork was one
  commit behind when checked. Fork list:
  [GitHub REST API](https://api.github.com/repos/open-gsd/gsd-core/forks?per_page=100&sort=newest).

### UI/UX repositories

| Repository | What it contributes | Evidence limits and decision |
|---|---|---|
| [Impeccable](https://github.com/pbakaus/impeccable) | Apache-2.0 design workflow, durable product brief, 24 design commands, live browser iteration, and 61 deterministic anti-pattern detectors. Its README lists Codex and Grok Build among supported harnesses. | Strong source for product-specific art direction and iterative critique. Detector count is not a design-quality score; runtime-native hooks still vary. Adapt concepts, then prove the workflow across our five target runtimes. |
| [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | MIT design-system search over product categories, styles, palettes, type pairings, UX rules, chart patterns, and stack guidance; local Python search/generation tooling. | Good structured retrieval source. Its own design-system examples and dataset size do not establish better rendered outcomes. If data is bundled, retain upstream license and provenance. |
| [XIAS / UX/UI Agent Skills](https://github.com/bear2u/ux-ui-agent-skills-codex) | MIT fork of `plugin87/ux-ui-agent-skills`. Its README describes 52 objective gates (34 browser-backed), an independent visual critic, and cold-start evals. | The README's scores and gate coverage are project claims, not an independent benchmark. REST compare found one commit ahead and three behind; that commit adds Codex hooks and a portable installer. Best pattern to study for measurable gates plus a separate taste review. |
| [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills) | Cross-agent frontend implementation and web-design review guidance. | Useful implementation and review references; does not by itself provide complete product-specific visual direction or rendered evidence. |
| [Agent Browser](https://github.com/vercel-labs/agent-browser) | Cross-agent browser CLI with screenshots, accessible page snapshots, interactions, and browser state inspection. | Candidate evidence surface if it reduces duplicated runtime-specific browser setup. It proves observable behavior and rendering, not that the design is compelling. |
| [Agentic Design System](https://github.com/psaazevedo/agentic-design-system) | A design contract tied to actual tokens/components and executable browser or Storybook checks. | Useful architecture pattern: keep the spec connected to measurable artifacts. Its scope is a smaller starter system, not a universal library. |
| [Superpowers](https://github.com/obra/superpowers) | MIT development method for specification, implementation, tests, delegation, and review across multiple coding agents. | Borrow durable artifacts and verification loops. Make user approvals conditional on real decisions; mandatory approval checkpoints conflict with the low-handoff goal. |
| [better-web-ui](https://github.com/aladicf/better-web-ui) | Many focused UI build, audit, critique, and polish skills. | Source-available custom license and maintenance-mode notice make it a poor vendoring choice. Treat it as workflow research only. |

### A concrete fork worth noticing

The `bear2u/ux-ui-agent-skills-codex` fork is not just a renamed copy: GitHub's
compare endpoint showed one fork-only commit, `Add Codex hooks and portable skill
installer`, plus three upstream commits not yet merged. It is a useful example of
adapting an existing design system to another coding agent. It does not demonstrate
that its Codex output is better than other runtimes; its own cold-start evaluation
is the evidence to inspect and reproduce.

## Proposed integrated capability

1. **One durable product and design contract.** Read the repository, existing
   tokens, requirements, and supplied references first. Choose a specific visual
   direction and sensible defaults from that evidence. Ask only when a missing
   brand/product decision materially changes the result.
2. **Implementation in the existing GSD lifecycle.** The plan consumes the
   contract, executes end-to-end, runs project tests, and fixes failures. Keep the
   same source artifacts available to Codex, Claude Code, Antigravity, Grok Build,
   and Mistral Vibe.
3. **Objective rendered checks.** Capture desktop and narrow mobile views, test
   key interactions, console/network failures, overflow, and automated WCAG rules.
   A skipped browser or failed capture is reported as unverified, never passed.
4. **Independent visual critique.** A separate critic sees the rendered result,
   brief, and design contract, but not the maker's explanation. It lists specific
   evidence-backed defects and proposes direct fixes.
5. **Bounded repair loop.** Fix findings and rerun relevant checks automatically.
   Stop only for a real blocker or a user-owned decision; otherwise return a
   finished change with screenshots and validation evidence.
6. **Cross-model benchmark.** Run the same held-out briefs on each available
   runtime, with the same scaffold and browser checks. Compare task completion,
   visual clarity and originality, responsive behavior, accessibility, functional
   interactions, and user questions required. Keep claims like “100x” as a target,
   not a result, until measurements support them.

## Source links

- [GSD Core UI design guide](https://github.com/open-gsd/gsd-core/blob/next/docs/how-to/design-a-ui-phase.md)
- [Impeccable README](https://github.com/pbakaus/impeccable/blob/main/README.md)
- [UI UX Pro Max README](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/README.md)
- [XIAS README and evaluation claims](https://github.com/bear2u/ux-ui-agent-skills-codex)
- [XIAS fork compare](https://github.com/plugin87/ux-ui-agent-skills/compare/main...bear2u:main)
- [Agent Browser README](https://github.com/vercel-labs/agent-browser)
- [Superpowers README](https://github.com/obra/superpowers)
- [better-web-ui license and maintenance notice](https://github.com/aladicf/better-web-ui)
