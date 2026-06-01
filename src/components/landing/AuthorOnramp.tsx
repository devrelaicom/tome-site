import React from 'react';
import styles from './landing.module.css';

export default function AuthorOnramp(): React.JSX.Element {
  return (
    <section className={styles.section}><div className={`${styles.wrap} ${styles.band}`}>
      <div>
        <h2>Built something? Publish a catalog.</h2>
        <p>Any git repo of plugins becomes a Tome catalog. Share it across every harness.</p>
      </div>
      <a className={`${styles.btn} ${styles.btnSolid}`} href="/docs/catalogs/authoring">▸ Authoring guide</a>
    </div></section>
  );
}
