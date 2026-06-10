---
title: Security model
sidebar_position: 4
---

# Security model

Here is the uncomfortable fact this page is honest about: when you add a
catalog and enable its plugins, you are arranging for **third-party
instructions to be executed inside your coding agent** — an agent that holds
your shell, your filesystem, and quite possibly your credentials. Tome cannot
make that fact go away. What it does instead is draw one sharp line through it.

## Two boundaries

Tome treats catalog content as untrusted **input** and defends the
*mechanical* boundary — parsing it, indexing it, and writing harness config
without letting it do anything sideways. The *semantic* boundary — whether the
instructions themselves are something your agent should follow — is a judgment
only you can make.

```
        catalog content (untrusted)
                   │
                   ▼
 ┌─────────────────────────────────────┐
 │  mechanical boundary — Tome's job   │  bounded reads · path validation
 │  parse, index, write harness config │  symlink refusal · scrubbed errors
 └─────────────────┬───────────────────┘
                   │  delivered faithfully
                   ▼
 ┌─────────────────────────────────────┐
 │  semantic boundary — your job       │  "should my agent follow
 │  choose what to enable              │   these instructions?"
 └─────────────────┬───────────────────┘
                   ▼
         your agent executes it
```

## Adding a catalog is a trust decision

**Adding a catalog is trusting it — exactly like `npm install` or running a
script someone handed you.** Tome will defend the mechanics below, but it
cannot — and does not claim to — vet the *content* a catalog ships. Only add
catalogs you trust, and treat "add this catalog" in a README with the same
suspicion you'd give "pipe this to `sh`".

## What Tome defends — the mechanical boundary

Each of these is a real, implemented defence in the CLI, not an aspiration:

- **Symlink-refusing writes into harness config.** Before Tome writes into a
  harness's config tree, it refuses symlinked path components. A plugin can't
  plant a symlink that quietly redirects Tome's write somewhere else on your
  machine.
- **Path validation on third-party names.** Plugin- and entry-supplied names
  that become file names are validated as single safe path segments — no
  `../`, no absolute paths, no escaping the directory the write was aimed at.
- **Bounded reads of third-party files.** Manifests, frontmatter, and skill
  bodies are read under size caps, so a hostile or simply broken file can't
  balloon memory.
- **Managed-marker collision refusal.** Where third-party prose is copied
  verbatim into a marker-delimited region of a file Tome manages, content that
  contains Tome's own markers is refused outright — it can't break out of its
  region or corrupt the surrounding file.
- **Credential scrubbing in errors.** Tokens embedded in git remotes and
  download URLs are scrubbed before any error message or log line is emitted.
- **Everything local.** The index, the embeddings, and the reranker all run on
  your machine. Tome phones nothing home; there is no telemetry.

The net effect: a hostile catalog cannot escape Tome's target directories,
corrupt the files Tome manages, or leak your credentials through error output.

:::note
These refusals fail honestly. A refused harness write exits with its sink's
own code — `44` (hooks), `45` (agents), `46` (rules/guardrails) — rather than
a generic I/O error, so scripts can tell "blocked a suspicious write" apart
from "disk problem". See [Exit codes](./exit-codes.md).
:::

## What Tome does not defend — the semantic boundary

A catalog's skills, commands, and agents are **instructions your AI agent
executes**. Tome delivers them faithfully; it cannot judge whether they are
benign. A hostile `SKILL.md` can tell your agent to exfiltrate secrets or run
destructive commands — and it won't look like "code". It will look like
helpful prose.

The defence here is the same one you already use for dependencies: provenance.
Enable plugins from authors you trust, and read what you're shelving before
you read from it.

## A note for catalog authors

If you publish a catalog, you are asking readers for exactly this trust. Make
it easy to grant: keep your source public, describe what each plugin does, and
don't ship anything you wouldn't want quoted back to you in an incident
report. See [Distributing your catalog](../authoring/distributing.md).

## Reporting a vulnerability

See `SECURITY.md` in the Tome repository.
