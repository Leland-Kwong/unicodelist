import React, { Component } from 'react';
import { Head, Style, IconsCore, IconsSvg } from './allComponents';
import styles from '../styles/CharacterReference.scss';
import { name as pageTitle } from '../site.config';

const iconDefs = /* @html */`
<svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>
<symbol id="icon-star-full" viewBox="0 0 32 32">
<path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path>
</symbol>
<symbol id="icon-mail3" viewBox="0 0 32 32">
<title>mail3</title>
<path d="M26.667 0h-21.333c-2.934 0-5.334 2.4-5.334 5.334v21.332c0 2.936 2.4 5.334 5.334 5.334h21.333c2.934 0 5.333-2.398 5.333-5.334v-21.332c0-2.934-2.399-5.334-5.333-5.334zM5.707 27.707l-2.414-2.414 8-8 0.914 0.914-6.5 9.5zM4.793 6.207l0.914-0.914 10.293 8.293 10.293-8.293 0.914 0.914-11.207 13.207-11.207-13.207zM26.293 27.707l-6.5-9.5 0.914-0.914 8 8-2.414 2.414z"></path>
</symbol>
</defs>
</svg>
`;

export class Main extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className='SiteContainer'>
        <Head title={pageTitle} />
        <Style>{styles}</Style>
        <IconsCore />
        <IconsSvg svgContent={iconDefs} />
        {children}
      </div>
    );
  }
}
