# UI Quality Loop for GSD Core

> **Goal:** Make the existing GSD UI workflow produce more distinctive, evidence-grounded interfaces while reducing avoidable user handoffs across supported AI runtimes.

## Research basis

See `docs/research/uiux-agent-ecosystem-2026-10-23.md`. Keep GSD's phase lifecycle, and borrow selectively: structured design knowledge from UI UX Pro Max, art direction and browser iteration from Impeccable, objective browser-backed gates from UX/UI Agent Skills, and cross-runtime skill packaging already provided by this repository. Popularity and repository-authored detector counts are not output-quality evidence.

## Current milestone

- [x] Audit maintained UI/UX projects and material forks using GitHub APIs and source documentation.
- [x] Add a product-specific visual-direction contract to the UI spec.
- [x] Pass autonomous mode into UI research and require evidence-based defaults rather than routine confirmation questions.
- [x] Avoid package installation and registry initialization as an implicit part of design research.
- [x] Make the checker validate specificity of direction and make the screenshot auditor compare the rendered result to that direction.
- [x] Add focused regression tests for the autonomous design contract and run relevant UI workflow tests.

## Follow-up gates

- [ ] Build a reproducible, cross-model fixture suite that scores generated pages from blinded screenshots and task-specific requirements.
- [ ] Add browser-backed interaction and accessibility checks to the default UI review path where the host has a browser available.
- [ ] Define a bounded repair loop that can fix objective visual defects, rerun checks, and stop with a concise blocker summary when evidence is insufficient.
- [ ] Evaluate all supported runtimes on identical UI tasks; publish measurements, screenshots, model/runtime versions, and failure cases.
- [ ] Use evaluation results to tune prompts and retrieval data; do not claim a fixed multiplier such as "100x" without measured evidence.
