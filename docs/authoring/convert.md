---
title: Converting
sidebar_position: 3
---

# Converting

Nobody starts a library from scratch. You already have plugins — a Claude Code
marketplace, a Codex project, a stack of `SKILL.md`s written for Cursor or
OpenCode. `tome catalog convert` (and its `plugin` and `skill` siblings) turns
what you have into native Tome artifacts, tells you honestly what survived the
trip, and never touches the original. Convert, don't rewrite.

## What converts

The verb names what you want out: a whole collection (`catalog`), one plugin
(`plugin`), or a single skill (`skill`). The source format is auto-detected;
`--from` overrides detection when it can't decide.

| Source (`--from`) | What it covers |
| --- | --- |
| `claude-code` | Claude Code marketplaces, plugins, and skills |
| `codex` | Codex projects |
| `cursor` | Native `SKILL.md` trees written for Cursor |
| `opencode` | Native `SKILL.md` trees written for OpenCode |
| `cline` | Native `SKILL.md` trees written for Cline |
| `agent-skills` | The generic Agent Skills `SKILL.md` layout |

When detection fails, convert exits `83` and asks you to pass `--from` rather
than guessing.

## A marketplace becomes a catalog

The catalog used throughout these docs is a real conversion: the
`devrelaicom/midnight-expert` Claude Code marketplace — 13 plugins — converted
in one command. Always start with `--dry-run`, which prints the full plan and
writes nothing:

```console
$ tome catalog convert ~/.claude/plugins/marketplaces/midnight-expert --output ~/catalogs --dry-run
Would convert claude-code catalog `midnight-expert` → `midnight-expert-tome`
  [info] convert/catalog-synthesized-field: marketplace has no `description`; synthesizing one
  [info] convert/dropped-manifest-field: plugin.json `homepage` is not modelled by Tome; dropping it
  [warning] harness-ism/claude-skill-dir: rewrote 6 occurrence(s) of `${CLAUDE_SKILL_DIR}` → `${TOME_SKILL_DIR}`
  [warning] harness-ism/claude-plugin-data: rewrote 2 occurrence(s) of `${CLAUDE_PLUGIN_DATA}` → `${TOME_PLUGIN_DATA}`
  …
  [warning] convert/tool-restriction-dropped: frontmatter `allowed-tools` (a tool restriction) is dropped — Tome does not constrain tools, so dropping it silently broadens capability
  [warning] convert/agent-lossy: agent frontmatter `memory` is not modelled by Tome; dropping it (agent conversion is lossy)
  …
Dry run: 616 file(s) to …/midnight-expert-tome  (128 warning(s), 100 info(s))
```

*(Excerpt — the full plan lists every diagnostic; output paths shortened here.)*

Read the warnings before you commit to anything. Each one is convert being
honest about a judgment it made on your behalf: a rewritten variable, a dropped
manifest field, a tool restriction it cannot enforce. When you're satisfied,
run the same command without `--dry-run`:

```console
$ tome catalog convert ~/.claude/plugins/marketplaces/midnight-expert --output ~/catalogs
Converted claude-code catalog `midnight-expert` → `midnight-expert-tome`
  …
Done: 616 file(s) to …/midnight-expert-tome  (128 warning(s), 100 info(s))
```

Then lint the result to see what residue is left for human judgment:

```console
$ tome catalog lint ~/catalogs/midnight-expert-tome
[warning] lint/description-too-long: entry `compact-dev` description is 2557 characters (max 1024) (…/midnight-expert-tome/compact-core/agents/compact-dev.md)
[warning] lint/residual-harness-ism: file-reference injection (`@path`) is not supported — Tome does not inject file contents (…/midnight-expert-tome/midnight-verify/skills/midnight-verify:verify-by-execution/SKILL.md)
  …
Summary: 0 error(s), 18 warning(s), 0 info(s)
```

Zero errors: the catalog works as-is. The 18 warnings are the honest residue —
over-long descriptions and harness-isms Tome refuses to fake. [Linting](./lint.md)
covers how to work through them (and what `--autofix` can do for you).

## Where the copy lands

Convert never modifies the source — it writes a converted copy:

- The copy is named `<source-name>-tome` by default. Override it with the
  positional `NAME` argument or `--name` (supplying both with different values
  is a usage error).
- The copy lands under the current directory by default; `--output <dir>`
  picks a different parent.
- `--into <path>` injects the converted artifact into an existing Tome
  artifact instead: a plugin converted `--into` a catalog is registered in its
  `tome-catalog.toml`; a skill converted `--into` a plugin lands in its
  `skills/` directory. `--into` and `--output` are mutually exclusive.
- If the destination already contains files convert wants to write, it refuses
  with exit `81`. `--force` overwrites the colliding files — only those files,
  never a directory wipe.

## Remote sources

The source can be a local path, an `owner/repo` shorthand, or a git URL.
Remote sources are fetched as a shallow clone into a temporary directory and
cleaned up on every exit path — success, failure, or `--strict` abort. If the
source string could be read both ways (a local directory named `owner/repo`
exists), the local path wins.

For `tome catalog convert` only, `--no-fetch` skips the marketplace's
remote-source plugins: they're warned and skipped instead of fetched. The
source argument itself may still be remote.

## What gets rewritten

Claude Code bodies lean on variables Tome doesn't speak natively. Convert
rewrites them to their Tome equivalents and reports every occurrence:

| Claude Code | Tome |
| --- | --- |
| `${CLAUDE_SKILL_DIR}` | `${TOME_SKILL_DIR}` |
| `${CLAUDE_PLUGIN_DATA}` | `${TOME_PLUGIN_DATA}` |
| `${CLAUDE_PLUGIN_ROOT}` | `${TOME_PLUGIN_DIR}` |

Legacy positional arguments (`$1`..`$9`) are rewritten to Tome's 0-based
argument substitution.

## What refuses to pretend

Some things Tome cannot represent, and convert says so instead of silently
dropping them. Hook monitors, LSP servers, themes, output styles, and the rest
of the unconvertible tail are each reported as a warning naming exactly what
was lost. Two injections can't be rewritten at all — file-reference injection
(`@path`) and shell-execution injection — because Tome does not inject file
contents or execute commands in bodies; convert warns and leaves them in place
for your judgment, and `lint` keeps flagging them afterwards as
`lint/residual-harness-ism`.

If you'd rather fail than lose anything, pass `--strict`: the first
unsupported feature aborts the conversion with exit `84`, writing nothing.

## The cutover: why exit 80 exists

Tome reads exactly one plugin manifest: `tome-plugin.toml`, parsed strictly.
There is no fallback chain — a plugin that ships only a legacy
`.claude-plugin/plugin.json` isn't loaded; Tome exits `80` with a nudge to run
`tome plugin convert`. One format means you always know whether a plugin has
been converted, and nobody debugs a half-understood lenient parse.

For authors, the practical consequence: run convert against your own checkout,
review the converted copy, and commit it — replacing the legacy layout — so
your consumers never meet exit `80`. The converted tree is the thing to
publish; see [Distributing](./distributing.md). For the manifest itself, see
the [authoring overview](./overview.md).

## Let your agent drive

Tome ships a bundled meta skill, `convert-marketplace`, that teaches your
agent this whole workflow — drive `convert` and `lint`, apply judgment to the
residue, and report back for your confirmation before registering anything:

```bash
tome meta add convert-marketplace
```

See [Meta skills](../using-tome/meta-skills.md).

## Pitfalls

| Exit | When you'll hit it | What to do |
| --- | --- | --- |
| `80` | A plugin ships only a legacy `plugin.json` — Tome won't load it | Run `tome plugin convert` (or ask the author to) |
| `81` | The destination already contains files convert would write | `--force` to overwrite the colliding files, or pick another `--output` |
| `83` | Source format detection failed | Pass `--from <source>` |
| `84` | `--strict` met a feature Tome cannot represent | Drop `--strict` to convert with warnings, or remove the unsupported component |

Full table in the [exit code reference](../reference/exit-codes.md).

## Next steps

- [Linting](./lint.md) — work through the warnings, wire the verdict into CI.
- [Distributing](./distributing.md) — publish the converted catalog.
- [Authoring overview](./overview.md) — what the converted layout actually is.
