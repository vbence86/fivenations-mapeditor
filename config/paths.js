const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

// config after eject: we're in ./config/
module.exports = {
  appBuild: resolveApp('build'),
  appLib: resolveApp('lib'),
  appIndexJs: resolveApp('src/js/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: process.env.S3_PUBLIC_URL || '',
};
