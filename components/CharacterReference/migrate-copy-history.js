import { getBookmarks } from './modules';
import ls from 'local-storage';

const padHexCode = (hex = String) => {
  let newHex = `${hex}`;
  while (newHex.length < 4) {
    newHex = '0' + newHex;
  }
  return newHex;
};

/*
  In version 1.0.0 all hexcodes were at 5 digits. We've since normalized all
  codes down to four characters if the code started with zeroes, so that `000a0`
  would be come `00a0`.

  This function is meant to migrate any stored history from 1.0.0 to the new
  4-digit codes.
*/
export const migrateCopyHistory = () => {
  const frequentlyUsed = getBookmarks();
  if (frequentlyUsed.version > '1.0.0') {
    return;
  }
  const newHistory = Object.keys(frequentlyUsed).reduce((newBookmarks, key) => {
    if (key === 'version') {
      newBookmarks.version = frequentlyUsed.version;
      return newBookmarks;
    }
    const oHexCode = key;
    const decimal = parseInt(oHexCode.slice(3, -1), 16);
    const newHexCode = '&#x' + padHexCode(decimal.toString(16)).toUpperCase() + ';';
    newBookmarks[newHexCode] = frequentlyUsed[oHexCode];
    return newBookmarks;
  }, {});
  ls.set('copyHistory', newHistory);
};
