import React from 'react';
import styles from './landing.module.css';

const STEPS = [
  {n: '01', h: 'Add a catalog', p: 'Point Tome at a git repo of plugins. It clones, parses and indexes everything.', cmd: 'tome catalog add <repo>'},
  {n: '02', h: 'Enable plugins', p: 'Turn on the plugins you want. Skills, commands, agents and hooks become available.', cmd: 'tome plugin enable <name>'},
  {n: '03', h: 'Use any harness', p: 'Tome writes native config for each harness and serves search over MCP.', cmd: 'tome harness use cursor'},
];

export default function HowItWorks(): React.JSX.Element {
  return (
    <section className={styles.section}><div className={`${styles.wrap} ${styles.pad}`}>
      <div className={styles.marker}><span className={styles.n}>§ 03</span>&nbsp;/&nbsp;Procedure</div>
      <h2 className={styles.secTitle}>How it works</h2>
      <div className={styles.steps}>
        {STEPS.map((s) => (
          <div key={s.n} className={styles.step}>
            <div className={styles.num}>{s.n}</div>
            <h3>{s.h}</h3>
            <p>{s.p}</p>
            <span className={styles.cmd}>{s.cmd}</span>
          </div>
        ))}
      </div>
    </div></section>
  );
}
