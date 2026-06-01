import React from 'react';
import styles from './landing.module.css';

export default function FeaturedCatalog(): React.JSX.Element {
  return (
    <section className={styles.section}><div className={`${styles.wrap} ${styles.pad}`}>
      <div className={styles.marker}><span className={styles.n}>§ 05</span>&nbsp;/&nbsp;Featured catalog</div>
      <div className={styles.twocol}>
        <div className={styles.fblock}>
          <h2 className={styles.secTitle} style={{marginBottom: 14}}>Midnight&nbsp;Expert</h2>
          <p>The flagship catalog from the <b>Midnight Foundation</b>: AI plugins for building, testing and
            verifying <b>Compact</b> smart contracts — privacy patterns, formal verification, devnet tooling and
            more, available across every harness Tome supports.</p>
          {/* TODO(launch): replace placeholder counts with real values */}
          <div className={styles.pill}>CATALOG&nbsp;<b>midnight-expert-tome</b>&nbsp;·&nbsp;<b>12</b> plugins&nbsp;·&nbsp;<b>85</b> skills&nbsp;·&nbsp;<b>18</b> agents</div>
        </div>
        <div className={styles.term}>
          <div className={styles.termBar}><i className={styles.dotR}/><i className={styles.dotY}/><i className={styles.dotG}/>&nbsp; install midnight expert</div>
          <div className={styles.termBody}>
            <span className={styles.termC}># add the catalog</span><br/>
            <span className={styles.termP}>$</span> tome catalog add devrelaicom/midnight-expert-tome<br/>
            <span className={styles.termO}>&nbsp; Cloned · indexed 85 skills, 18 agents.</span><br/><br/>
            <span className={styles.termC}># enable it everywhere</span><br/>
            <span className={styles.termP}>$</span> tome plugin enable midnight-expert<br/>
            <span className={styles.termO}>&nbsp; Ready. ◉</span>
          </div>
        </div>
      </div>
    </div></section>
  );
}
