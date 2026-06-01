---
title: MCP server
sidebar_position: 3
---

# MCP server

`tome mcp` runs Tome as a [Model Context Protocol](https://modelcontextprotocol.io)
server. This is how a coding agent searches your catalogs and loads skills at
runtime, instead of holding everything in context.

```bash
tome mcp
```

The server speaks MCP over stdio, so harnesses launch it as a subprocess.

## Tools

Tome exposes three tools, forming a search-then-load flow:

- **`search_skills`** — semantic search over enabled skills and commands. Returns
  candidate matches (KNN + reranker), so the agent can decide what's relevant.
- **`get_skill_info`** — a middle tier that returns metadata about a skill
  (including its `when_to_use` guidance) without pulling the full body. Useful for
  confirming relevance before loading.
- **`get_skill`** — loads a skill's full content, with variable substitution
  applied, ready for the agent to use.

The typical loop is: `search_skills` to find candidates → `get_skill_info` to
confirm → `get_skill` to load only the winner.

## Prompts

User-invocable entries — **commands** and agent **personas** (when enabled) — are
exposed as **MCP prompts**. In a harness that surfaces prompts, these appear as
slash commands the user can invoke directly, with argument substitution handled
by Tome.

## Wiring it into an editor

You normally don't configure this by hand. Running

```bash
tome harness use <name>
```

writes the MCP server configuration for that harness automatically, so the
editor knows to launch `tome mcp` and which tools are available. See
[Harnesses](./harnesses.md) for what's written per harness.

If you're wiring an MCP client manually, point it at the `tome mcp` command over
stdio. If the server fails to start, [Troubleshooting](./troubleshooting.md) and
`tome doctor` will report why.
