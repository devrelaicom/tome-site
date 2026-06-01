---
title: Configuration
sidebar_position: 3
---

# Configuration

Every Tome-owned path lives under a single root: `~/.tome/`. There is no scatter
across the filesystem. Project directories carry a small marker so Tome knows
which workspace they belong to.

## `~/.tome/` layout

```
~/.tome/
├── config.toml          # global configuration
├── settings.toml        # global settings layer (harness composition)
├── index.db             # the central SQLite search index
├── index.lock           # the index advisory lock
├── catalogs/            # cloned catalog content
├── models/              # downloaded embedding + rerank models
├── logs/                # logs
└── workspaces/
    └── <name>/
        ├── settings.toml   # workspace-layer settings
        └── RULES.md        # workspace-layer rules surface
```

There is exactly one central `index.db`, one `index.lock`, and one global
`config.toml`. Per-workspace state lives under `workspaces/<name>/`.

## Global `config.toml`

`~/.tome/config.toml` holds global configuration. Tome bootstraps the `~/.tome/`
root on first write. Tome-owned config is parsed strictly — unknown fields are
rejected — so a typo surfaces as an error rather than being silently ignored.

## Settings layers

Harness composition is resolved from layered settings:

- **Global** — `~/.tome/settings.toml`
- **Workspace** — `~/.tome/workspaces/<name>/settings.toml`

The workspace layer composes over the global layer to produce the configuration
written to each harness. Edits are made surgically, preserving comments and key
order.

## Project markers

A project bound to a workspace carries a marker directory at the project root:

```
<project>/.tome/
├── config.toml          # which workspace this project maps to
└── RULES.md             # a copy of the workspace-layer rules
```

This is how working inside a project activates the right
[workspace](../using-tome/workspaces.md) composition automatically.

## Models

Downloaded models live under `~/.tome/models/`, each with its own
`manifest.json`. Manage them with `tome models {download,list,remove}` against a
pinned registry. See the [Commands reference](../commands/reference.md#tome-models).
