import React from 'react';
import styles from './landing.module.css';

const FEATURES = [
  {n: 'FEAT.01', h: 'Cross-harness management', p: "Enable a plugin once; Tome serves it natively to every harness — hooks, agents, rules and all."},
  {n: 'FEAT.02', h: 'Search & load on demand', p: "Semantic search finds the right skill; the MCP server loads only what's needed. Protects context, cuts tokens, saves $$$."},
  {n: 'FEAT.03', h: 'Workspaces', p: 'Per-project composition — different catalogs and plugins enabled per workspace, bound to your projects.'},
  {n: 'FEAT.04', h: 'Local & private', p: 'Runs on your machine. No telemetry; the index and models stay local.'},
];

export default function Highlights(): React.JSX.Element {
  return (
    <section className={styles.section}><div className={`${styles.wrap} ${styles.pad}`}>
      <div className={styles.marker}><span className={styles.n}>§ 02</span>&nbsp;/&nbsp;Highlights</div>
      <h2 className={styles.secTitle}>Why Tome</h2>
      <div className={styles.cards}>
        {FEATURES.map((f) => (
          <div key={f.n} className={styles.card}>
            <div className={styles.fl}>{f.n}</div>
            <h3>{f.h}</h3>
            <p>{f.p}</p>
          </div>
        ))}
      </div>
    </div></section>
  );
}
