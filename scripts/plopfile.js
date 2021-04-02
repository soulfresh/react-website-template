const fs = require('fs');
const path = require('path');
const colors = require('colors');

function makeFolderPath(...args) {
  return path.normalize(args.filter(f => !!f).join('/'));
}

/**
 * @param {string} type - Whether to generate a page or a generic component.
 * @param {boolean} pageSpecific - If true, then this component is specific to a page
 *   and should be created in the page package.
 * @param {string} fullName - The component name including subpackage folders.
 */
function makeComponentActions(
  type,
  pageSpecific,
  fullName
) {
  const root = pageSpecific ? 'page' : 'component';
  let name;
  let subPackage = [];
  const p = fullName.split('/');
  if (p.length > 0) name = p[p.length - 1];
  if (p.length > 1) subPackage = p.slice(0, p.length - 1);

  const src = makeFolderPath(process.cwd(), 'src');
  const rootDir = `${root}s`;
  const dir = makeFolderPath(src, rootDir, ...subPackage);

  const data = {name, subPackage, type};

  const actions = [
    {
      // Name.jsx
      type: 'add',
      data: data,
      // Plop will create directories for us if they do not exist
      // so it's okay to add files in nested locations.
      path        : `${dir}/{{dashCase '${name}'}}/{{pascalCase '${name}'}}.jsx`,
      templateFile: `plop-templates/component/{{pascalCase '${type}'}}.jsx.hbs`,
    },
    {
      // Name.module.scss
      type        : 'add',
      data        : data,
      path        : `${dir}/{{dashCase '${name}'}}/{{pascalCase '${name}'}}.module.scss`,
      templateFile: `plop-templates/component/Component.module.scss.hbs`,
    },
    {
      // Name.test.jsx
      type        : 'add',
      data        : data,
      path        : `${dir}/{{dashCase '${name}'}}/{{pascalCase '${name}'}}.test.jsx`,
      templateFile: `plop-templates/component/Component.test.jsx.hbs`,
    },
    {
      // Name.stories.mdx
      type        : 'add',
      data        : data,
      path        : `${dir}/{{dashCase '${name}'}}/{{pascalCase '${name}'}}.stories.mdx`,
      templateFile: `plop-templates/component/Component.stories.mdx.hbs`,
    },
    {
      // components/name/index.js
      type        : 'add',
      data        : data,
      path        : `${dir}/{{dashCase '${name}'}}/index.js`,
      templateFile: `plop-templates/component/component-index.js.hbs`,
    },
  ];

  const appendIfUnique = (actions, file, template, data) => {
    // Unfortunately the unique parameter does not seemt to be working.
    // I tried reading the file but I would need to be able to handle
    // the handlebars casing for this to work.
    actions.push({
      type    : 'append',
      data,
      path    : file,
      template: template,
      pattern : `/* PLOP_INJECT_EXPORT */`,
      unique  : true,
    });
  }

  // If there are sub packages, update the index file in each of them
  // to include the new component.
  subPackage?.forEach((current, i, folders) => {
    const currentPackageFolders = folders.slice(0, i + 1);
    const currentDirectory = makeFolderPath(src, rootDir, ...currentPackageFolders);
    const nextImport = i === folders.length - 1
      ? `{{dashCase '${ name }'}}`
      : `{{dashCase '${folders[i + 1]}'}}`;

    // Adds an index.js file to the current subpackage if it does not already exist
    actions.push({
      type        : 'add',
      data        : data,
      path        : `${currentDirectory}/index.js`,
      templateFile: `plop-templates/injectable-index.js.hbs`,
      // If index.js already exists in this location, skip this action
      skipIfExists: true,
    });

    // Append to the current sub package index file.
    appendIfUnique(
      actions,
      `${currentDirectory}/index.js`,
      `export * from './${nextImport}';`,
      data
    );
  });

  const componentTypeFolder = makeFolderPath(src, rootDir);
  let rootImport = subPackage?.length
    ? `{{dashCase '${subPackage[0]}'}}`
    : `{{dashCase '${ name }'}}`;

  // Append to the root package index file.
  appendIfUnique(
    actions,
    `${componentTypeFolder}/index.js`,
    `export * from './${rootImport}';`,
    data,
  );

  return actions;
};


module.exports = plop => {
  // Create generic components under either the `components/` or `pages/` folder.
  plop.setGenerator('component', {
    description: 'Create a reusable component in the "components/" folder',
    prompts: [{
      name: 'fullName',
      message: `What is your component name? This can include the subpackage name (ex. ${colors.green('foo/bar/my-component')})`,
      type: 'input',
    }, {
      name: 'type',
      message: 'Is this a page specific component?' + ' If yes, then it will be created in the page package'.green,
      type: 'confirm',
      default: false,
    }],
    actions: data => makeComponentActions(
      'component',
      data.type,
      data.fullName,
    ),
  });

  // Create Page components in the `pages/` folder.
  plop.setGenerator('page', {
    description: 'Create a page component in the "pages/" folder',
    prompts: [{
      name: 'fullName',
      message: 'What is your page name?',
      type: 'input',
    }],
    actions: data => makeComponentActions(
      'page',
      true,
      data.fullName
    ),
  });
}
