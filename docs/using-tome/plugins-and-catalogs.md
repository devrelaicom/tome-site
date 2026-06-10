---
title: Plugins & catalogs
sidebar_position: 1
---

# Plugins & catalogs

A **catalog** is a volume you add to your bookshelf once: a git repository of
plugins that Tome clones and indexes. A **plugin** is a chapter you choose to
read from it: a bundle of skills, commands, agents, and hooks. Day-to-day Tome
is mostly these two verbs — add volumes, enable chapters — and everything else
(search, harness config, the MCP server) follows from what you've enabled.

## Add a catalog

```bash
tome catalog add devrelaicom/midnight-expert-tome
```

Tome clones the repository, parses every plugin manifest it finds, and
registers the catalog under a short name — here `midnight-expert`, thirteen
plugins in a single add. Inspect what arrived:

```bash
tome catalog show midnight-expert
```

```text
midnight-expert-tome (v0.46.0)
  Converted from the midnight-expert Claude Code marketplace
  Owner: Aaron Bassett <aaron@devrel-ai.com>

Plugins:
  compact-cli-dev        compact-cli-dev
  compact-core           compact-core
  compact-examples       compact-examples
  core-concepts          core-concepts
  midnight-cq            midnight-cq
  midnight-dapp-dev      midnight-dapp-dev
  midnight-expert        midnight-expert
  midnight-fact-check    midnight-fact-check
  midnight-plugin-utils  midnight-plugin-utils
  midnight-status-codes  midnight-status-codes
  midnight-tooling       midnight-tooling
  midnight-verify        midnight-verify
  midnight-wallet        midnight-wallet
```

(Output abridged — the full listing also shows the catalog's source URL and
last sync time.)

Adding a catalog enables nothing by itself. Thirteen plugins are now on the
shelf; none of them is taking up space in anyone's context window.

## Enable a plugin

```bash
tome plugin enable midnight-verify
```

Enabling parses the plugin's entries — skills, commands, agents — and indexes
them for [search](./search.md). Check the state of the shelf:

```bash
tome plugin list
```

```text
| Catalog         | Plugin                | Version | Status     | Entries                           | Last indexed |
|-----------------|-----------------------|---------|------------|-----------------------------------|--------------|
| midnight-expert | compact-cli-dev       | 0.4.0   | ✗ disabled | —                                 | —            |
| midnight-expert | compact-core          | 0.10.0  | ✗ disabled | —                                 | —            |
| midnight-expert | compact-examples      | 0.4.0   | ✗ disabled | —                                 | —            |
| midnight-expert | core-concepts         | 0.3.2   | ✗ disabled | —                                 | —            |
| midnight-expert | midnight-cq           | 0.4.0   | ✗ disabled | —                                 | —            |
| midnight-expert | midnight-dapp-dev     | 0.5.0   | ✗ disabled | —                                 | —            |
| midnight-expert | midnight-expert       | 0.6.0   | ✗ disabled | —                                 | —            |
| midnight-expert | midnight-fact-check   | 0.4.0   | ✗ disabled | —                                 | —            |
| midnight-expert | midnight-plugin-utils | 0.1.1   | ✗ disabled | —                                 | —            |
| midnight-expert | midnight-status-codes | 0.9.0   | ✗ disabled | —                                 | —            |
| midnight-expert | midnight-tooling      | 0.4.0   | ✗ disabled | —                                 | —            |
| midnight-expert | midnight-verify       | 0.13.0  | ✓ enabled  | (19 skills, 2 commands, 7 agents) | just now     |
| midnight-expert | midnight-wallet       | 0.5.0   | ✗ disabled | —                                 | —            |
```

One chapter open: 19 skills, 2 commands, and 7 agents — 28 entries indexed and
searchable. The other twelve plugins stay shelved, costing nothing, until you
want them.

### Variations

- `tome plugin show <name>` prints one plugin's entries, grouped by kind with
  per-entry annotations — useful before deciding whether to enable it.
- `tome plugin disable <name>` closes the chapter again: its entries leave the
  index, and your harnesses drop them on the next sync.
- Bare `tome plugin` opens an interactive picker — catalog → plugin → action —
  for when you'd rather browse the shelf than type names.

## Keep volumes current

```bash
tome catalog update midnight-expert
```

Pulls the catalog's source and re-indexes it. Run this when a catalog you
follow ships new plugins or revised skills; your enabled plugins pick up the
changes.

## Remove a catalog

```bash
tome catalog remove midnight-expert
```

If the catalog still has enabled plugins, removal refuses (exit `53`) rather
than yank entries out from under your harnesses. Pass `--force` to cascade:
every enabled plugin is disabled first, then the catalog is removed.

## Catalogs to add today

**Midnight Expert** is the flagship catalog from the Midnight Foundation: a
collection of AI plugins for building, testing, and verifying
[Compact](https://docs.midnight.network) smart contracts on
[Midnight](https://midnight.network) — privacy patterns, formal verification,
devnet tooling, and more, available across every harness Tome supports.

```bash
tome catalog add devrelaicom/midnight-expert-tome
tome plugin enable midnight-expert
```

The catalog bundles **13 plugins** covering the Compact development lifecycle,
including:

- Compact language and standard-library guidance
- Privacy and disclosure patterns
- Formal verification and code review
- dApp and SDK development
- Local devnet and tooling

The verification plugin alone — `midnight-verify` — carries **19 skills,
2 commands, and 7 agents**: 28 searchable entries from a single
`plugin enable`.

Once enabled, point a harness at it:

```bash
tome harness use claude-code
```

and search for what you need:

```bash
tome query "verify a Compact contract"
```

See [Quickstart](../getting-started/quickstart.md) for the full flow and
[Search](./search.md) for how retrieval works.

## Pitfalls

| Exit code | What happened | What to do |
| --- | --- | --- |
| `4` | Catalog already added. | Use `tome catalog update <name>` to refresh it instead of re-adding. |
| `21` | Plugin already in the requested state. | Nothing — it was already enabled (or disabled). Check `tome plugin list`. |
| `53` | Catalog removal refused: it still has enabled plugins. | Disable them, or re-run `tome catalog remove <name> --force` to cascade. |
| `80` | Plugin not converted: a legacy `.claude-plugin/plugin.json` exists but no `tome-plugin.toml`. | Convert it — see [Converting](../authoring/convert.md). |

The full table lives in the [exit codes reference](../reference/exit-codes.md).

## Where next

- [Search](./search.md) — find the right entry by meaning, not by name.
- [Harnesses](./harnesses.md) — land your enabled plugins in each agent's
  native config.
- [Converting](../authoring/convert.md) — already have plugins in another
  format? Convert, don't rewrite.
