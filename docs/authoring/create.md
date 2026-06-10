---
title: Creating
sidebar_position: 2
---

# Creating

A blank `SKILL.md` invites two mistakes before you've written a word:
frontmatter the parser rejects and structure the linter flags. `create`
scaffolds skills, plugins, and whole catalogs that are lint-clean by
construction — you start from a passing state and edit downhill.

## Scaffold a skill

The fastest start is a bare skill — one directory, one `SKILL.md`, no plugin
wrapper:

```console
$ tome skill create demo-skill --bare --output /tmp/tome-cap
Created skill `demo-skill` at /private/tmp/tome-cap/demo-skill
  SKILL.md
```

(macOS resolves `/tmp` to `/private/tmp` — same place.) What landed:

```console
$ ls /tmp/tome-cap
demo-skill
```

Open `demo-skill/SKILL.md`, fill in the frontmatter, and write the body. The
`when_to_use` frontmatter field is indexed for
[semantic search](../using-tome/search.md), so spend a sentence on it — it is
how agents find the skill later.

## Scaffold a plugin or a catalog

The same verb works one level up:

```bash
tome plugin create my-plugin
tome catalog create my-catalog
```

`plugin create` scaffolds the plugin directory with its strict
[`tome-plugin.toml`](./overview.md#tome-plugintoml) manifest; `catalog create`
scaffolds a repo-shaped directory with `tome-catalog.toml` at the root, ready
for plugins.

## Flags that matter

| Flag | Applies to | Effect |
| --- | --- | --- |
| `--bare` | `skill create` | The naked form: `<name>/SKILL.md`, no plugin wrapper. |
| `--plugin-name <name>` | `skill create` | Wrap the new skill in a plugin with that name. |
| `--into <dir>` | `skill`, `plugin` | Scaffold into an existing parent — a skill into an existing plugin, a plugin into an existing catalog. Mutually exclusive with `--output`. |
| `--output <dir>` | all | The parent directory the new artifact lands in. Mutually exclusive with `--into`. |
| `--template <name>` | all | Pick a built-in template. Built-ins only today — anything else exits `82`. |
| `--force` | all | Overwrite an existing target instead of refusing with exit `81`. |

## Pitfalls

- **Exit `81` (`output_exists`)** — the target path already exists, and
  `create` refuses to clobber it. Pass `--force` if you mean it.
- **Exit `82` (`template_invalid`)** — `--template` accepts built-in templates
  only today; pointing it at a path or URL exits `82` rather than fetching.

The full table lives in [Exit codes](../reference/exit-codes.md).

## Next steps

- Validate what you wrote: [Linting](./lint.md).
- Already have plugins in another harness's format? [Convert](./convert.md)
  instead of retyping.
- Ready to share it: [Distributing](./distributing.md).
