---
title: Midnight Expert
sidebar_position: 1
---

# Midnight Expert

**Midnight Expert** is the flagship catalog from the Midnight Foundation: a
collection of AI plugins for building, testing, and verifying
[Compact](https://docs.midnight.network) smart contracts on
[Midnight](https://midnight.network) — privacy patterns, formal verification,
devnet tooling, and more, available across every harness Tome supports.

## Install

```bash
tome catalog add devrelaicom/midnight-expert-tome
tome plugin enable midnight-expert
```

The first command clones and indexes the catalog; the second enables it so its
skills, commands, agents, and hooks become available to your harnesses and to
search.

## What you get

{/* TODO(launch): replace placeholder counts with real values from
    `tome catalog show midnight-expert` against the published catalog. */}

The catalog bundles plugins covering the Compact development lifecycle, including:

- Compact language and standard-library guidance
- Privacy and disclosure patterns
- Formal verification and code review
- dApp and SDK development
- Local devnet and tooling

{/* TODO(launch): catalog totals — N plugins, N skills, N agents */}

Once enabled, point a harness at it:

```bash
tome harness use claude-code
```

and search for what you need:

```bash
tome query "verify a Compact contract"
```

See [Quickstart](../getting-started/quickstart.md) for the full flow and
[Search](../using-tome/search.md) for how retrieval works.
