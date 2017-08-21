import siteConfig from '../site.config';

export default (req) => {
  req && console.log(req.hostname);

  const isDev = process.env.NODE_ENV === 'development'
    || (req && req.hostname === siteConfig.testDomain);

  let pathname = '';
  const protocol = isDev ? 'http' : 'https';

  // server
  try {
    pathname = req.hostname;
  // client
  } catch(err) {
    pathname = window.location.hostname;
  }

  if (isDev) {
    pathname = `${pathname}:3000`;
  }

  return `${protocol}://${pathname}`;
};
