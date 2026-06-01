---
title: Troubleshooting
sidebar_position: 5
---

# Troubleshooting

When something looks off, Tome gives you two read-only commands to inspect state
and one flag to repair it.

## `tome status`

A fast, read-only pre-flight check. It never takes the index lock, so it's safe
to run any time — even while another Tome command is working.

```bash
tome status            # summary of subsystem state
tome status --verify   # deeper verification
tome status --json     # machine-readable
```

## `tome doctor`

`doctor` reports on every subsystem — index, models, harness config, workspaces —
and can repair them. It is **read-only by default**; it only writes when you pass
`--fix`.

```bash
tome doctor            # report only (no writes)
tome doctor --fix      # repair what it safely can
tome doctor --force    # apply fixes it would otherwise hold back
tome doctor --verify   # deeper checks
tome doctor --json     # machine-readable
```

`--fix` re-runs the same idempotent reconcilers the normal commands use, so a
repair inherits all their safety (marker-bounded edits, structural-match-only
removal, symlink refusal). It won't take a destructive shortcut.

## Common issues

- **A harness's config drifted** — run `tome harness sync`, or
  `tome doctor --fix` to reconcile rules, MCP wiring, agents, and hooks from
  current state.
- **Search returns nothing or stale results** — reindex the affected scope:
  `tome reindex` (everything), `tome reindex <catalog>`, or
  `tome reindex <catalog>/<plugin>`. Add `--force` to rebuild from scratch.
- **The index is busy** — another Tome process holds the lock. `tome status` is
  always safe to run; wait for the other command to finish, or check for a stale
  process.
- **A model is missing or corrupt** — `tome models list` shows what's present;
  `tome models download` fetches a missing one. `tome doctor` reports model
  problems.
- **Non-zero exit and you're not sure why** — every failure maps to a documented
  [exit code](../reference/exit-codes.md); look it up there.

If `doctor` reports a problem it can't fix safely, it tells you what it found so
you can resolve it by hand.
