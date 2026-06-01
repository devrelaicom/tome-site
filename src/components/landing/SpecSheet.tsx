import React from 'react';
import styles from './landing.module.css';

const ROWS = [
  ['catalog', 'Add, remove, list & update catalogs of plugins', 'sources'],
  ['plugin', 'Enable, disable & inspect plugins and their entries', 'lifecycle'],
  ['query', 'Semantic search across skills & commands (KNN + rerank)', 'retrieval'],
  ['mcp', 'MCP server — search_skills, get_skill, prompts', 'serve'],
  ['harness', 'Configure Claude Code, Cursor, Codex, Gemini, OpenCode', 'targets'],
  ['workspace', 'Per-project scopes & composition', 'scope'],
  ['models', 'Manage local embedding & rerank models', 'inference'],
  ['doctor', 'Diagnose & repair every subsystem', 'health'],
];

export default function SpecSheet(): React.JSX.Element {
  return (
    <section className={styles.section}><div className={`${styles.wrap} ${styles.pad}`}>
      <div className={styles.marker}><span className={styles.n}>§ 04</span>&nbsp;/&nbsp;Specifications</div>
      <h2 className={styles.secTitle}>What you get</h2>
      <table className={styles.spec}>
        <thead><tr><th style={{width: '18%'}}>Command</th><th>Function</th><th style={{width: '16%'}}>Class</th></tr></thead>
        <tbody>
          {ROWS.map(([c, f, t]) => (
            <tr key={c}><td className={styles.specCmd}>{c}</td><td>{f}</td><td className={styles.specTag}>{t}</td></tr>
          ))}
        </tbody>
      </table>
    </div></section>
  );
}
