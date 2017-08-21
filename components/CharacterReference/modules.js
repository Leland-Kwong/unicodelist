import ls from 'local-storage';
import stringHash from 'string-hash';

export const entityID = (entityMetadata) => stringHash(entityMetadata.hex);

export const getBookmarks = () => ls.get('copyHistory') || {};
export const setBookmarks = (entityID) => {
  const bookmarks = getBookmarks();
  bookmarks[entityID] = (bookmarks[entityID] || 0) + 1;
  ls.set('copyHistory', bookmarks);
};

export const views = {
  list: 'list',
  detail: 'detail'
};
