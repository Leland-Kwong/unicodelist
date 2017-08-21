const fs = require('fs');
const chalk = require('chalk');
const notifier = require('node-notifier');

fs.watch('./live-js', (ev, file) => {
  if (file === 'watch.js') {
    return;
  }
  const path = `${process.cwd()}/live-js/${file}`;
  try {
    delete require.cache[require.resolve(path)];
    require(path);
  } catch(err) {
    console.log(chalk.red.bold(err));
    notifier.notify(err.message);
  }
});
