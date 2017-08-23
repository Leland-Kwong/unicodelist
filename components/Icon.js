import React from 'react';
import classnames from 'classnames';

export const IconsSvg = ({ svgContent = '' }) => {
  return (
    <div
      style={{ display: 'none' }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export const Icon = ({ name, className, ...rest }) => {
  return (
    <svg className={classnames('icon', `icon-${name}`, className)} {...rest}>
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
};

const SVG = /* @html */`
<svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>
<symbol id="icon-logo" viewBox="0 0 32 32">
<title>logo</title>
<path fill="#ededed" style="fill: var(--color1, #ededed)" d="M-60-44h118v96h-118v-96z"></path>
<path fill="#000" style="fill: var(--color2, #000)" d="M22 18c0 3.314-2.686 6-6 6s-6-2.686-6-6v-10h4v10c0 1.105 0.895 2 2 2s2-0.895 2-2v-10h4v10z"></path>
<path fill="#18b3a4" style="fill: var(--color3, #18b3a4)" d="M4 0h24c2.209 0 4 1.791 4 4v24c0 2.209-1.791 4-4 4h-24c-2.209 0-4-1.791-4-4v-24c0-2.209 1.791-4 4-4z"></path>
<path fill="#fff" style="fill: var(--color4, #fff)" d="M16 24c4.418 0 8-3.582 8-8s-3.582-8-8-8c-4.418 0-8 3.582-8 8s3.582 8 8 8zM16 28c-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12s-5.373 12-12 12z"></path>
<path fill="#fff" style="fill: var(--color4, #fff)" d="M20 16c0 2.209-1.791 4-4 4s-4-1.791-4-4c0-2.209 1.791-4 4-4s4 1.791 4 4z"></path>
</symbol>
<symbol id="icon-search" viewBox="0 0 32 32">
<title>search</title>
<path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>
</symbol>
<symbol id="icon-external-link" viewBox="0 0 32 32">
<title>external-link</title>
<path d="M8 20c0 0 1.838-6 12-6v6l12-8-12-8v6c-8 0-12 4.99-12 10zM22 24h-18v-12h3.934c0.315-0.372 0.654-0.729 1.015-1.068 1.374-1.287 3.018-2.27 4.879-2.932h-13.827v20h26v-8.395l-4 2.667v1.728z"></path>
</symbol>
<symbol id="icon-facebook2" viewBox="0 0 32 32">
<title>facebook2</title>
<path d="M29 0h-26c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h13v-14h-4v-4h4v-2c0-3.306 2.694-6 6-6h4v4h-4c-1.1 0-2 0.9-2 2v2h6l-1 4h-5v14h9c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3z"></path>
</symbol>
<symbol id="icon-twitter" viewBox="0 0 32 32">
<title>twitter</title>
<path d="M32 7.075c-1.175 0.525-2.444 0.875-3.769 1.031 1.356-0.813 2.394-2.1 2.887-3.631-1.269 0.75-2.675 1.3-4.169 1.594-1.2-1.275-2.906-2.069-4.794-2.069-3.625 0-6.563 2.938-6.563 6.563 0 0.512 0.056 1.012 0.169 1.494-5.456-0.275-10.294-2.888-13.531-6.862-0.563 0.969-0.887 2.1-0.887 3.3 0 2.275 1.156 4.287 2.919 5.463-1.075-0.031-2.087-0.331-2.975-0.819 0 0.025 0 0.056 0 0.081 0 3.181 2.263 5.838 5.269 6.437-0.55 0.15-1.131 0.231-1.731 0.231-0.425 0-0.831-0.044-1.237-0.119 0.838 2.606 3.263 4.506 6.131 4.563-2.25 1.762-5.075 2.813-8.156 2.813-0.531 0-1.050-0.031-1.569-0.094 2.913 1.869 6.362 2.95 10.069 2.95 12.075 0 18.681-10.006 18.681-18.681 0-0.287-0.006-0.569-0.019-0.85 1.281-0.919 2.394-2.075 3.275-3.394z"></path>
</symbol>
</defs>
</svg>
`;

export const IconsCore = () => (
  <IconsSvg svgContent={SVG} />
);
