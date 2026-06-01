import React from 'react';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/landing/Hero';
import Highlights from '@site/src/components/landing/Highlights';
import HowItWorks from '@site/src/components/landing/HowItWorks';
import SpecSheet from '@site/src/components/landing/SpecSheet';
import FeaturedCatalog from '@site/src/components/landing/FeaturedCatalog';
import GetStarted from '@site/src/components/landing/GetStarted';
import AuthorOnramp from '@site/src/components/landing/AuthorOnramp';

export default function Home(): React.JSX.Element {
  return (
    <Layout title="Tome — One catalog, every coding agent" description="Cross-harness plugin manager for AI coding agents. Manage skills, commands, agents & hooks once; search and load them on demand across Claude Code, Cursor, Codex, Gemini & OpenCode.">
      <main>
        <Hero />
        <Highlights />
        <HowItWorks />
        <SpecSheet />
        <FeaturedCatalog />
        <GetStarted />
        <AuthorOnramp />
      </main>
    </Layout>
  );
}
