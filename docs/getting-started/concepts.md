---
title: Concepts
sidebar_position: 3
---

# Concepts

A short tour of the model behind Tome. Everything else in the docs builds on
these terms.

## Catalog

A **catalog** is a git repository of plugins. You add a catalog by pointing Tome
at its repo; Tome clones it, parses every plugin it contains, and indexes the
entries for search. Catalogs are the unit of distribution — sharing your work
means publishing a catalog and telling people to add it.

```bash
tome catalog add <repo>
```

## Plugin

A **plugin** is a bundle of capabilities inside a catalog, described by a
`plugin.json` manifest. Plugins are enabled or disabled individually. Enabling a
plugin makes its entries available to your harnesses and to search.

```bash
tome plugin enable <name>
```

## Entry kinds

A plugin contributes four kinds of **entry**:

- **Skill** — a unit of knowledge or procedure (`SKILL.md` with frontmatter). The
  primary thing semantic search retrieves.
- **Command** — a user-invocable action, exposed as a slash command in supporting
  harnesses and as an MCP prompt.
- **Agent** — a persona with its own system prompt, translated to each harness's
  native agent format (where supported).
- **Hook** — an event-driven action wired into the harness (for example, real
  Claude Code hooks).

## Workspace

A **workspace** is a per-project scope. Different workspaces can enable different
catalogs and plugins, and a workspace can be bound to one or more project
directories so the right composition is active for the right project.

```bash
tome workspace use <name>
```

## Harness

A **harness** is a coding agent that Tome targets: Claude Code, Cursor, Codex,
Gemini CLI, or OpenCode. Running `tome harness use <name>` writes that harness's
native configuration — rules file, MCP server wiring, and native agents/hooks
where the harness supports them.

## The central index

Tome maintains a single local SQLite index (with a vector extension for semantic
search) under `~/.tome/`. Adding a catalog or enabling a plugin updates this
index. It powers both `tome query` and the MCP server's search. The index, the
embedding model, and the reranker all stay on your machine — there is no
telemetry.

## MCP server

`tome mcp` runs Tome as an [MCP](https://modelcontextprotocol.io) server. It
exposes search and skill-loading tools (`search_skills`, `get_skill`,
`get_skill_info`) plus user-invocable entries as MCP prompts, so an agent can
find and load only the skills it needs at runtime rather than holding everything
in context. See the [MCP server](../using-tome/mcp-server.md) page for wiring.
