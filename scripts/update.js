const shell = require('shelljs');

shell.rm('-rf', 'node_modules');
shell.exec('npm i');

shell.echo('----------------------------------------------');
shell.echo('   		  Dependencies are updated!');
shell.echo('----------------------------------------------');
