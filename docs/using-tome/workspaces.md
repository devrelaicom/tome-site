---
title: Workspaces
sidebar_position: 4
---

# Workspaces

A **workspace** is a per-project scope. Different workspaces enable different
catalogs and plugins, so the composition that's active for one project doesn't
leak into another.

## Why workspaces

Without workspaces, every plugin you enable is enabled everywhere. Workspaces let
you keep a focused set per project — a Compact contract project might enable the
Midnight Expert plugins, while another project enables a different set entirely.

## Lifecycle

```bash
tome workspace init <name>     # create a workspace
tome workspace use <name>      # switch the active workspace
tome workspace list            # list workspaces
tome workspace info            # show the active workspace and its composition
tome workspace rename <a> <b>  # rename a workspace
tome workspace remove <name>   # remove a workspace
```

## Project binding

A workspace can be **bound** to one or more project directories, so the right
composition activates automatically when you work in that project. Catalog and
plugin enablement is recorded per workspace as the source of truth, rather than
globally.

## Composition

The set of catalogs and plugins enabled in a workspace is its **composition**.
When you run `tome harness use <name>`, Tome resolves the active workspace's
composition and writes native config for exactly that set. Switching workspaces
changes what your harnesses see.

## Summaries and sync

```bash
tome workspace regen-summary   # regenerate the workspace summary
tome workspace sync            # reconcile the workspace with current state
```

If a workspace looks out of sync, `tome doctor` reports it and `tome doctor --fix`
re-runs the relevant reconciliation. See
[Troubleshooting](./troubleshooting.md).
