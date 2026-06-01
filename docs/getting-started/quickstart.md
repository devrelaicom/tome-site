---
title: Quickstart
sidebar_position: 2
---

# Quickstart

This walks you from a fresh install to searching and loading plugins in your
coding agent in four commands. If you haven't installed Tome yet, start with
[Install](./install.md).

## 1. Add a catalog

A catalog is a git repo of plugins. Point Tome at one and it clones, parses, and
indexes everything it finds.

```bash
tome catalog add devrelaicom/midnight-expert-tome
```

## 2. Enable a plugin

Enabling a plugin makes its skills, commands, agents, and hooks available to your
harnesses.

```bash
tome plugin enable midnight-expert
```

## 3. Point a harness at Tome

Tome writes native configuration for each supported harness — rules files, MCP
server wiring, and (where the harness supports them) native agents and hooks.

```bash
tome harness use cursor
```

Swap `cursor` for `claude-code`, `codex`, `gemini`, or `opencode` as needed. See
[Harnesses](../using-tome/harnesses.md) for what gets written for each.

## 4. Search

Run a semantic search across every enabled skill and command:

```bash
tome query "verify a Compact contract"
```

Inside a configured harness, the same search runs over the MCP server, so your
agent loads only the skills it needs — protecting the context window and cutting
token spend. See [Search](../using-tome/search.md) and the
[MCP server](../using-tome/mcp-server.md) for details.

## Next steps

- [Concepts](./concepts.md) — the model behind catalogs, plugins, and workspaces.
- [Commands reference](../commands/reference.md) — every command and flag.
- [Troubleshooting](../using-tome/troubleshooting.md) — `tome doctor` and common issues.
