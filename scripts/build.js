const shell = require('shelljs');

const SOURCE = 'src';
const DIST = 'build';
const RESOURCES = 'resources';
const LIBRARIES = 'lib';
const ASSETS = 'assets';
const FIVENATIONS_ASSETS = 'node_modules/fivenations/src/assets';

shell.set('-e');

shell.env.NODE_ENV = 'production';

shell.rm('-rf', DIST);

shell.exec('webpack --config ./config/webpack.production.config.js -p --bail');

shell.mkdir('-p', DIST);

shell.cp('-r', RESOURCES, `${DIST}/${RESOURCES}`);
shell.cp('-r', LIBRARIES, `${DIST}/${LIBRARIES}`);
shell.cp('-r', FIVENATIONS_ASSETS, `${DIST}/${ASSETS}`);
shell.cp('-r', 'web/*', DIST);

shell.echo('----------------------------------------------');
shell.echo('             Build is successful!');
shell.echo('----------------------------------------------');
