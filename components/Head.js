import React from 'react';
import NextHead from 'next/head';
import siteConfig from '../site.config';
import styles from '../styles/index.scss';

const iconVersion = '?v3';

export const Head = ({ title }) => {
  const { name: siteName, description } = siteConfig;
  const fullTitle = `${siteName} | ${description}`;
  return (
    <NextHead>
      <title>{fullTitle}</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name="theme-color" content="#fff" />
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <link
        rel='stylesheet'
        // href='//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css'
        href='//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-light.min.css'
        // href='//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-dark.min.css'
      />
      <link rel='icon' type='image/png' href={`/static/favicons/favicon-16x16.png${iconVersion}`} sizes='16x16' />
      <link rel='icon' type='image/png' href={`/static/favicons/favicon-32x32.png${iconVersion}`} sizes='32x32' />
      <link rel='icon' type='image/png' href={`/static/favicons/favicon-96x96.png${iconVersion}`} sizes='96x96' />
    </NextHead>
  );
};
