# Multi-Runtime Adapter Spec

## User outcome

Bos can install one GSD Core checkout into the five coding runtimes used on this laptop. GSD workflows and skills stay sourced from one repository, and runtime-specific installation is explicit and repeatable. The initial release must reduce setup drift without pretending unverified native features work.

## Supported runtimes in scope

- OpenAI Codex CLI (`codex`)
- Claude Code (`claude`)
- Google Antigravity (`agy` / registry id `antigravity`)
- xAI Grok Build (`grok`)
- Mistral Vibe Code CLI (`vibe`)

## Installation behavior

- Existing runtimes retain all current paths and conversion behavior.
- Grok Build gets a registry-backed config and skill home `~/.grok` controlled by `GROK_HOME`; skills use the native `~/.grok/skills` root so `--all` does not overwrite Codex's runtime-specific projection in `~/.agents/skills`.
- Mistral Vibe gets a registry-backed install target, user home default `~/.vibe` controlled by `VIBE_HOME`, and skills emitted to `~/.vibe/skills`.
- Both new runtimes accept explicit global installation and are present in `--all` exactly once.
- Existing shared roots are preserved; no install deletes or rewrites unrelated files.
- This release ships tested skill installation only. Native Grok and Vibe hook/agent profile projection remains a later tested adapter phase.

## Acceptance criteria

1. Registry and installer recognize Grok Build and Vibe without treating either as an unknown runtime.
2. Environment-variable home overrides resolve correctly on Windows and POSIX.
3. A global install stages discoverable GSD skills at the runtime's documented location and converts the command frontmatter to valid Agent Skills metadata.
4. `--all` includes every supported runtime once, with no changes to prior selection semantics.
5. Existing runtime-home, artifact-layout, installer, and generated-file checks pass.
6. Documentation names any unsupported native artifact kinds instead of implying full parity.
7. The five target runtimes install their global skill projections to distinct roots, so a combined `--all` install cannot overwrite one runtime's converted skill with another runtime's format.

## Evidence basis

- Grok Build discovers both `~/.grok/skills/` and the shared `~/.agents/skills/` root; GSD uses its native root to avoid converter collisions with Codex: <https://docs.x.ai/build/features/skills-plugins-marketplaces> and <https://docs.x.ai/build/settings>.
- Mistral Vibe documents `VIBE_HOME`, its native user skill directory, and the shared `~/.agents/skills/` location: <https://docs.mistral.ai/vibe/code/cli/configuration>.
- Mistral Vibe documents native agent profile TOML and subagent schema: <https://docs.mistral.ai/vibe/code/cli/agents>.
- Mistral Vibe hook definitions use TOML and have runtime-specific lifecycle types; native hook parity is out of this initial scope: <https://docs.mistral.ai/vibe/code/cli/hooks>.
