import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Tome',
  tagline: 'One catalog, every coding agent.',
  favicon: 'img/favicon.ico',

  // Modern favicon set (provided assets live under static/img/, served at /img/).
  headTags: [
    {tagName: 'link', attributes: {rel: 'icon', type: 'image/png', href: '/img/favicon-96x96.png', sizes: '96x96'}},
    {tagName: 'link', attributes: {rel: 'icon', type: 'image/svg+xml', href: '/img/favicon.svg'}},
    {tagName: 'link', attributes: {rel: 'apple-touch-icon', sizes: '180x180', href: '/img/apple-touch-icon.png'}},
    {tagName: 'link', attributes: {rel: 'manifest', href: '/img/site.webmanifest'}},
  ],

  future: {v4: true},

  url: 'https://tome.midnightntwrk.expert',
  baseUrl: '/',

  organizationName: 'devrelaicom',
  projectName: 'tome-site',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {defaultLocale: 'en', locales: ['en']},

  presets: [
    [
      'classic',
      {
        docs: {sidebarPath: './sidebars.ts', routeBasePath: 'docs'},
        blog: {
          showReadingTime: true,
          blogTitle: 'Tome blog',
          blogDescription: 'News and notes on Tome',
          feedOptions: {type: ['rss', 'atom'], xslt: true},
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/tome-social-card.png',
    colorMode: {defaultMode: 'light', disableSwitch: true, respectPrefersColorScheme: false},
    navbar: {
      title: 'Tome',
      logo: {alt: 'Tome', src: 'img/tome-logo.svg'},
      items: [
        {to: '/docs/getting-started/install', label: 'Docs', position: 'left'},
        {to: '/docs/catalogs/midnight-expert', label: 'Catalogs', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {href: 'https://github.com/devrelaicom/tome', label: 'GitHub', position: 'right'},
        {to: '/docs/getting-started/install', label: 'Install', position: 'right', className: 'navbar-install-cta'},
      ],
    },
    footer: undefined, // replaced by the swizzled Footer (Task 6)
    prism: {theme: prismThemes.oneLight, darkTheme: prismThemes.oneLight},
  } satisfies Preset.ThemeConfig,
};

export default config;
