import React from 'react';
import styles from './landing.module.css';

export default function GetStarted(): React.JSX.Element {
  return (
    <section className={styles.section}><div className={`${styles.wrap} ${styles.pad}`}>
      <div className={styles.marker}><span className={styles.n}>§ 06</span>&nbsp;/&nbsp;Installation</div>
      <h2 className={styles.secTitle}>Get started in seconds</h2>
      <div className={styles.twocol}>
        <div className={styles.term}>
          <div className={styles.termBar}><i className={styles.dotR}/><i className={styles.dotY}/><i className={styles.dotG}/>&nbsp; install tome</div>
          <div className={styles.termBody}>
            <span className={styles.termC}># macOS · Homebrew</span><br/>
            <span className={styles.termP}>$</span> brew install aaronbassett/homebrew-tap/tome<br/><br/>
            <span className={styles.termC}># or with cargo</span><br/>
            <span className={styles.termP}>$</span> cargo install tome-mcp<br/><br/>
            <span className={styles.termC}># first run</span><br/>
            <span className={styles.termP}>$</span> tome catalog add devrelaicom/midnight-expert-tome<br/>
            <span className={styles.termP}>$</span> tome plugin enable midnight-expert
          </div>
        </div>
        <div className={styles.fblock}>
          <p>One self-contained binary — the semantic index, reranker and local models are built in. <b>No telemetry.</b></p>
          <p className={styles.mono} style={{fontSize: 13, color: 'var(--tome-ink-soft)'}}>Linux &amp; macOS (x86_64 / aarch64) · prebuilt binaries · crates.io</p>
          <div className={styles.ctas} style={{marginTop: 8}}>
            <a className={`${styles.btn} ${styles.btnSolid}`} href="/docs/getting-started/install">▸ Read the docs</a>
          </div>
        </div>
      </div>
    </div></section>
  );
}
