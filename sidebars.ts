import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {type: 'category', label: 'Getting started', collapsed: false, items: [
      'getting-started/install', 'getting-started/quickstart', 'getting-started/concepts']},
    {type: 'category', label: 'Using Tome', items: [
      'using-tome/harnesses', 'using-tome/search', 'using-tome/mcp-server', 'using-tome/workspaces', 'using-tome/troubleshooting']},
    {type: 'category', label: 'Commands', items: ['commands/reference']},
    {type: 'category', label: 'Catalogs', items: ['catalogs/midnight-expert', 'catalogs/authoring']},
    {type: 'category', label: 'Reference', items: ['reference/security-model', 'reference/exit-codes', 'reference/config']},
  ],
};

export default sidebars;
