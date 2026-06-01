---
title: Security model
sidebar_position: 1
---

# Security model

Tome treats catalog content as untrusted **input** and defends the *mechanical* boundary. It cannot — and does not claim to — vet the *content* a catalog ships.

## What Tome defends (the mechanical boundary)

- Bounded reads (no out-of-memory from a hostile manifest)
- Path-segment validation (no path traversal)
- Symlink-safe writes (no escaping target directories)
- Managed-marker collision refusal (no corrupting your config files)
- Credential scrubbing on every git/network/log boundary

A hostile catalog cannot crash Tome, escape its target directories, or corrupt your files.

## What Tome cannot defend (the semantic boundary)

A catalog's skills, commands, and agents are **instructions your AI agent executes**. Tome delivers them faithfully; it cannot judge whether they are benign. A hostile `SKILL.md` can tell your agent to exfiltrate secrets or run destructive commands — and it won't look like "code."

**Adding a catalog is trusting it — exactly like `npm install` or running a script. Only add catalogs you trust.**

## Reporting a vulnerability

See `SECURITY.md` in the Tome repository.
