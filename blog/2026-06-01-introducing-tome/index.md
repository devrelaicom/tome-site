---
slug: introducing-tome
title: "Introducing Tome"
authors: [midnight-foundation]
tags: [release, announcement]
---

Today we're releasing the public beta of **Tome** — a cross-harness plugin
manager for AI coding agents. Manage your skills, commands, agents, and hooks in
one place, then search and load them on demand across **Claude Code, Cursor,
Codex, Gemini CLI, and OpenCode**.

{/* truncate */}

## The problem

The AI coding agent ecosystem is fragmenting. Each harness has its own way to
configure skills, agents, rules, and hooks. Build something great for one and
you've built it for one — porting it to the next means relearning a different
config format. And the more capabilities you add, the more you stuff into the
agent's context window up front, burning tokens on things the current task will
never touch.

## What Tome does

Tome sits between you and every harness it supports.

- **Cross-harness management.** Enable a plugin once. Tome translates it into each
  harness's native configuration — rules files, MCP wiring, native agents and
  hooks where the harness supports them. Build once, use everywhere.
- **Search and load on demand.** Tome indexes every enabled skill and command for
  semantic search. Instead of loading your whole library into context, your agent
  searches at runtime over the MCP server and loads only what it needs. That
  protects the context window and cuts token spend.
- **Workspaces.** Different projects need different tools. Workspaces give you
  per-project composition — different catalogs and plugins enabled per workspace,
  bound to your project directories.
- **Local and private.** Tome runs on your machine. The semantic index, the
  reranker, and the embedding models are all local. No telemetry.

## Install

Tome ships as a single self-contained binary:

```bash
# macOS · Homebrew
brew install aaronbassett/homebrew-tap/tome

# or with cargo
cargo install tome-mcp
```

See the [Install guide](/docs/getting-started/install) for prerequisites and
platform support.

## Start with Midnight Expert

The flagship catalog is **Midnight Expert** from the Midnight Foundation: AI
plugins for building, testing, and verifying Compact smart contracts. Add it and
enable it in two commands:

```bash
tome catalog add devrelaicom/midnight-expert-tome
tome plugin enable midnight-expert
```

Then point a harness at it and search:

```bash
tome harness use claude-code
tome query "verify a Compact contract"
```

## Publish your own

A catalog is just a git repo of plugins. If you've built skills, commands,
agents, or hooks, publishing them as a catalog means anyone can use your work
across every harness Tome supports. The [authoring guide](/docs/catalogs/authoring)
walks you through it.

Tome is open source under MIT OR Apache-2.0. Try the beta, and
[tell us what you build](https://github.com/devrelaicom/tome).
