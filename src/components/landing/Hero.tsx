import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './landing.module.css';

export default function Hero(): React.JSX.Element {
  const img = useBaseUrl('/img/tome-exploded.png');
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.status}>
          <div><span className={styles.dot}>●</span> TOME&nbsp;&nbsp;<b>v0.6.0</b>&nbsp;/&nbsp;beta</div>
          <div>FIG. 001 — HERO</div>
        </div>
        <div className={styles.hero}>
          <div>
            <div className={styles.kicker}>// cross-harness plugin manager for AI coding agents</div>
            <h1 className={styles.h1}>Tome</h1>
            <p className={styles.tagline}>One catalog, <span className={styles.hi}>every coding agent</span>.</p>
            <p className={styles.lede}>
              Manage your <b>skills, commands, agents &amp; hooks</b> in one place — then{' '}
              <b>search and load them on demand</b>, protecting the context window and cutting token
              spend, across <b>Claude Code, Cursor, Codex, Gemini &amp; OpenCode</b>.
            </p>
            <div className={styles.ctas}>
              <a className={`${styles.btn} ${styles.btnSolid}`} href="/docs/getting-started/install">▸ Install Tome</a>
              <a className={styles.btn} href="https://github.com/devrelaicom/tome">View on GitHub</a>
            </div>
          </div>
          <div className={styles.plate}>
            <span className={`${styles.crop} ${styles.tl}`}>+</span><span className={`${styles.crop} ${styles.tr}`}>+</span>
            <span className={`${styles.crop} ${styles.bl}`}>+</span><span className={`${styles.crop} ${styles.br}`}>+</span>
            <img className={styles.illo} src={img} alt="Tome — exploded view of the manual" />
            <div className={styles.platecap}><span>FIG. 001 — <b>Tome</b>, exploded view</span><span>DWG <b>TOME-001</b></span></div>
          </div>
        </div>
        <div className={styles.works}>
          <span className={styles.lbl}>Works with</span>
          <span className={styles.h}>Claude&nbsp;Code</span><span className={styles.x}>/</span>
          <span className={styles.h}>Cursor</span><span className={styles.x}>/</span>
          <span className={styles.h}>Codex</span><span className={styles.x}>/</span>
          <span className={styles.h}>Gemini&nbsp;CLI</span><span className={styles.x}>/</span>
          <span className={styles.h}>OpenCode</span>
        </div>
      </div>
    </section>
  );
}
