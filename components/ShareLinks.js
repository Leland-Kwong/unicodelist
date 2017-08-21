import React from 'react';
import { Icon } from './Icon';

export const ShareLinks = ({ url, title }) => {
  return (
    <div className='ShareLinks'>
      Share:&nbsp; <ShareLinks.Twitter {...{ url, title }} /> <ShareLinks.Facebook url={url} />
    </div>
  );
};

ShareLinks.Twitter = ({ url, title }) => {
  const twitterLink = `https://twitter.com/intent/tweet?text=?status=${encodeURIComponent(title)} ${encodeURIComponent(url)} @leland_kwong`;
  return <a href={twitterLink}><Icon name='twitter' /></a>;
};

ShareLinks.Facebook = ({ url }) => {
  const fbLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  return <a href={fbLink}><Icon name='facebook2' /></a>;
};
