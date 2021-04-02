const fs = require('fs');
const path = require('path');
const {
  override,
  addWebpackAlias,
  addWebpackPlugin,
} = require('customize-cra');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');

function readFile(filepath) {
  return fs.readFileSync(path.resolve(__dirname, filepath), 'utf8');
}

// file types & file links
const resource = {
  css:  { loader: readFile('src/components/loader/icon/loader.css') },
  html: { loader: readFile('src/components/loader/icon/loader.svg') },
};

const tpl = {
  css: '<style>%s</style>',
  html: '%s',
};

module.exports = override(
  addWebpackAlias({
    '~': path.resolve(__dirname, 'src/'),
  }),

  addWebpackPlugin(
    // Replace html contents with string or regex patterns
    new HtmlReplaceWebpackPlugin([{
      pattern: /(<!--\s*|@@)(html|css):([\w-\/]+)(\s*-->)?/g,
      replacement: function(match, $1, type, file, $4, index, input) {
        // those formal parameters could be:
        // match: <-- css:bootstrap-->
        // type: css
        // file: bootstrap
        // Then fetch css link from some resource object
        // var url = resources['css']['bootstrap']

        var url = resource[type][file]

        // $1==='@@' <--EQ--> $4===undefined
        return $4 == undefined ? url : tpl[type].replace('%s', url)
      }
    }
  ])),
);

