---
title: Authoring a catalog
sidebar_position: 2
---

# Authoring a catalog

A catalog is just a **git repository of plugins** with one manifest at its root.
If you've built skills, commands, agents, or hooks, publishing them as a catalog
lets anyone use them across every harness Tome supports.

## Anatomy of a catalog

```
your-catalog/
├── tome-catalog.toml          # the catalog manifest (required, at the root)
└── <plugin>/
    ├── .claude-plugin/
    │   └── plugin.json        # the plugin manifest
    ├── skills/
    │   └── <name>/SKILL.md     # one directory per skill
    ├── commands/
    │   └── <name>.md           # one file per command
    ├── agents/
    │   └── <name>.md           # one file per agent
    └── hooks/
        └── <name>.md           # one file per hook
```

Tome follows the Claude Code plugin layout, so existing Claude Code plugins work
as-is.

## `tome-catalog.toml`

The catalog manifest lives at the repo root and lists the plugins the catalog
ships. It is parsed strictly — unknown fields are rejected.

```toml
name = "my-catalog"
description = "A short description of what this catalog provides."
version = "0.1.0"

[owner]
name = "Your Name"
email = "you@example.com"

[[plugins]]
name = "my-plugin"
source = "my-plugin"
```

Each `[[plugins]]` entry names a plugin and points `source` at its directory
within the repo.

## `plugin.json`

Each plugin has a manifest at `<plugin>/.claude-plugin/plugin.json`. Tome parses
it leniently (extra fields are ignored), reading at least:

```json
{
  "name": "my-plugin",
  "version": "0.1.0",
  "description": "What this plugin does.",
  "author": {"name": "Your Name", "email": "you@example.com"}
}
```

## Entries

A plugin contributes four kinds of [entry](../getting-started/concepts.md#entry-kinds):

- **Skills** — `skills/<name>/SKILL.md`. A `SKILL.md` is a Markdown file with a
  YAML frontmatter header. A `when_to_use` field in the frontmatter is indexed to
  improve semantic search, so write it well.
- **Commands** — `commands/<name>.md`. Exposed as slash commands and MCP prompts.
- **Agents** — `agents/<name>.md`. Translated to each harness's native agent
  format where supported.
- **Hooks** — `hooks/<name>.md`. Event-driven actions, wired in where the harness
  supports them.

## Publish it

1. Push your catalog repo to a host (for example, GitHub).
2. Tell people to add it:

   ```bash
   tome catalog add <your/repo>
   tome plugin enable <plugin-name>
   ```

That's the whole on-ramp — any git repo of plugins becomes a Tome catalog, usable
across Claude Code, Cursor, Codex, Gemini CLI, and OpenCode.

## A note on trust

Adding a catalog runs its instructions inside the user's agent. Be a good
citizen, and tell your users they're trusting your content — just as they would
with `npm install` or any script. See the [Security model](../reference/security-model.md)
for the boundary Tome does and does not defend.
