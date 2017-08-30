import ls from 'local-storage';
import stringHash from 'string-hash';

export const entityID = (entityMetadata) => stringHash(entityMetadata.hex);
export const version = () => window.__appVersion__;
export const getBookmarks = () => {
  const history =
    ls.get('copyHistory')
    || { __version__: version() };
  // this is for the initial version of our app where there was no
  // version set for the history
  if (!history.__version__) {
    history.__version__ = '1.0.0';
    ls.set('copyHistory', history);
  }
  return history;
};
export const setBookmarks = (hexCode) => {
  const bookmarks = getBookmarks();
  bookmarks[hexCode] = (bookmarks[hexCode] || 0) + 1;
  ls.set('copyHistory', bookmarks);
};

export const views = {
  list: 'list',
  detail: 'detail'
};
