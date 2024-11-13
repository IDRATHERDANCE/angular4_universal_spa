const { root } = require('./helpers');
const { AngularWebpackPlugin } = require('@ngtools/webpack');

const tsconfigs = {
  client: root('./src/tsconfig.browser.json'),
  server: root('./src/tsconfig.server.json')
};


function getAotPlugin(platform, aot) {
  return new AngularWebpackPlugin({
    tsconfig: tsconfigs[platform]
  });
}

module.exports = {
  getAotPlugin: getAotPlugin
};
