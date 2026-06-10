---
title: Authoring overview
sidebar_position: 1
---

# Authoring

*Chapter III — in which you write your own.*

Everything so far has been about reading other people's work: add a catalog,
enable a plugin, let your agents read from the shelf. Sooner or later you have
knowledge of your own — a debugging ritual, a deploy runbook, a house style —
and pasting it into five harness configs is exactly the problem Tome exists to
end. Write it once, shelve it once, and every agent you run can read it.

This page covers the shape of what you're writing. The three verbs that produce
it — [`create`](./create.md), [`convert`](./convert.md), and
[`lint`](./lint.md) — each get their own page, and
[Distributing](./distributing.md) covers sharing the result.

## Anatomy of a catalog

A catalog is just a **git repository of plugins** with one manifest at its root:

```
your-catalog/
├── tome-catalog.toml          # the catalog manifest (required, at the root)
└── <plugin>/
    ├── tome-plugin.toml       # the plugin manifest — what Tome reads (strict)
    ├── .claude-plugin/
    │   └── plugin.json        # legacy (converted by `tome plugin convert`)
    ├── skills/
    │   └── <name>/SKILL.md    # one directory per skill
    ├── commands/
    │   └── <name>.md          # one file per command
    ├── agents/
    │   └── <name>.md          # one file per agent
    └── hooks/
        └── <name>.md          # one file per hook
```

The layout descends from Claude Code's plugin format, which is why converting
an existing Claude Code plugin is mostly mechanical — but the manifest Tome
reads is its own. A plugin directory that carries only the legacy
`.claude-plugin/plugin.json` is not yet a Tome plugin: commands that touch it
exit `80` (`plugin_not_converted`) until [`tome plugin convert`](./convert.md)
writes the native manifest alongside it.

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
```

Each `[[plugins]]` entry names a plugin and points `source` at its directory
within the repo:

```toml
[[plugins]]
name = "my-plugin"
source = "my-plugin"
```

## `tome-plugin.toml`

Each plugin has a manifest at its root: `<plugin>/tome-plugin.toml`. Like the
catalog manifest it is parsed strictly — a typo'd or unknown field is a parse
error, not a silent shrug.

```toml
name = "my-plugin"
version = "0.1.0"
description = "What this plugin does, and when an agent should reach for it."
license = "MIT"

[author]
name = "Your Name"
email = "you@example.com"
```

You rarely write this file by hand: [`create`](./create.md) scaffolds it and
[`convert`](./convert.md) derives it from a legacy `plugin.json`.

## Entries

A plugin contributes four kinds of
[entry](../getting-started/concepts.md#entry-kinds):

- **Skills** — `skills/<name>/SKILL.md`. A `SKILL.md` is a Markdown file with a
  YAML frontmatter header. A `when_to_use` field in the frontmatter is indexed
  to improve [semantic search](../using-tome/search.md), so write it well.
- **Commands** — `commands/<name>.md`. Exposed as slash commands and MCP
  prompts.
- **Agents** — `agents/<name>.md`. Translated to each harness's native agent
  format where supported.
- **Hooks** — `hooks/<name>.md`. Event-driven actions, wired in where the
  harness supports them.

## The three verbs

Three verbs produce all of the above. [`create`](./create.md) scaffolds a new
skill, plugin, or catalog from a built-in template — lint-clean by
construction, so you start from a passing state and edit downhill.
[`convert`](./convert.md) migrates what you already have: Claude Code
marketplaces, plugins, and skills, Codex projects, and native `SKILL.md` trees
from other harnesses. [`lint`](./lint.md) validates the result — and never
halts on a malformed artifact, because malformed input is a finding, not a
crash. When the lint run comes back clean, [Distributing](./distributing.md)
is one `git push` away.
