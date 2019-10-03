const shell = require('shelljs');

shell.cd('node_modules');
shell.rm('-rf', 'fivenations');
shell.exec('git clone --progress --depth 1 -b mapeditor https://github.com/vbence86/fivenations.git');
shell.cd('fivenations');
shell.exec('npm install');
shell.exec('npm run build-library');

shell.cp('lib/fivenations.lib.js', '../../lib/');

shell.cd('../../');

shell.echo('----------------------------------------------');
shell.echo('   Five Nations is successfully installed!');
shell.echo('----------------------------------------------');
