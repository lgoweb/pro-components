const { existsSync, writeFileSync, readdirSync, mkdirSync, readFile } = require('fs');
const { join } = require('path');
const { yParser } = require('@umijs/utils');
const firstUpperCaseShortName = ([first, ...rest]) => first.toUpperCase() + rest.join('');

const args = process.argv.slice(2);
if (args[0]) {
  mkdirSync(join(__dirname, '..', 'packages', args[0]), function (err) {
    if (err) {
      console.log(err);
    }
  });
}
(async () => {
  const args = yParser(process.argv);
  const version = '1.0.0-beta.1';

  const pkgs = readdirSync(join(__dirname, '../packages')).filter((pkg) => pkg.charAt(0) !== '.');

  pkgs.forEach((shortName) => {
    const name = `@lekp/pro-${shortName}`;

    const pkgJSONPath = join(__dirname, '..', 'packages', shortName, 'package.json');
    const pkgJSONExists = existsSync(pkgJSONPath);
    let json;
    if (args.force || !pkgJSONExists) {
      json = {
        name,
        version,
        description: name,
        module: 'es/index.js',
        main: 'lib/index.js',
        types: 'lib/index.d.ts',
        files: ['lib', 'src', 'dist', 'es'],
        repository: {
          type: 'git',
          url: 'https://github.com/lgoweb/pro-components',
        },
        browserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
        keywords: ['antd', 'admin', 'ant-design', 'ant-design-pro'],
        authors: ['ChenYCL <aa34913@gmail.com> (https://github.com/ChenYCL)'],
        license: 'MIT',
        // bugs: 'http://github.com/umijs/plugins/issues',
        // homepage: `https://github.com/ant-design/pro-components/tree/master/packages/${shortName}#readme`,
        peerDependencies: {
          umi: '3.x',
        },
        publishConfig: {
          access: 'public',
        },
      };
      if (pkgJSONExists) {
        const pkg = require(pkgJSONPath);
        [
          'dependencies',
          'devDependencies',
          'peerDependencies',
          'bin',
          'version',
          'files',
          'authors',
          'types',
          'sideEffects',
          'main',
          'module',
          'description',
        ].forEach((key) => {
          if (pkg[key]) json[key] = pkg[key];
        });
      }
      writeFileSync(pkgJSONPath, `${JSON.stringify(json, null, 2)}\n`);
    }

    const readmePath = join(__dirname, '..', 'packages', shortName, 'README.md');
    if (args.force || !existsSync(readmePath)) {
      writeFileSync(
        readmePath,
        `# ${name}

> ${json.description}.


## Install

Using npm:

\`\`\`bash
$ npm install --save ${name}
\`\`\`

or using yarn:

\`\`\`bash
$ yarn add ${name}
\`\`\`
`,
      );
    }

    // init 补充 demos文件夹,src文件夹,CHANGELOG.md
    const typingsPath = join(__dirname, '..', 'packages', shortName, 'typings.d.ts');
    if (args.force || !existsSync(typingsPath)) {
      writeFileSync(
        typingsPath,
        `
declare module '*.less';
declare module '*.css';
declare module '*.svg';
        `,
      );
    }

    const changelogPath = join(__dirname, '..', 'packages', shortName, 'CHANGELOG.md');
    if (args.force || !existsSync(changelogPath)) {
      writeFileSync(changelogPath, ``);
    }

    const srcDir = join(__dirname, '..', 'packages', shortName, 'src');
    if (args.force || !existsSync(srcDir)) {
      // mkdir src dir
      mkdirSync(srcDir);
      // src/components
      mkdirSync(srcDir + '/components');

      writeFileSync(
        join(__dirname, '..', 'packages', shortName, 'src', 'index.tsx'),
        `
import React from 'react';
import './index.less';

const prefixCls = \`${shortName}-bg\`;
/**
 * 属性定义
 */
interface Props {
  /** 文字大小 */
  size: number;
}
const App: React.FC<Props> = ({ size = 50 }) => {
  return (
    <div className={prefixCls} style={{ fontSize:\`\${size}px\`  }}>
      <span role="img" aria-label="w">
        🦟
      </span>
    </div>
  );
};
export default App;
                    
                    `,
      );
      writeFileSync(
        join(__dirname, '..', 'packages', shortName, 'src', 'index.less'),
        `
@popupPrefix: ${shortName}-bg;

.@{popupPrefix} {
  background-color: lightblue;
  text-align: center;
}

                    `,
      );
      writeFileSync(
        join(__dirname, '..', 'packages', shortName, 'src', `${shortName}.md`),

        `---
title: ${shortName}演示组件
order: 0
group:
  path: /
nav:
  title: 组件
  path: /components
---

## 介绍

<code src="../demos/base.tsx" />

<API src="./index.tsx"></API>
`,
      );
    }

    const demosPath = join(__dirname, '..', 'packages', shortName, 'demos');
    if (args.force || !existsSync(demosPath)) {
      mkdirSync(`${demosPath}`);
      let componentName = firstUpperCaseShortName(shortName);
      writeFileSync(
        demosPath + '/base.tsx',
        `
import React from 'react';
//import ${componentName} from '@lekp/pro-${shortName}';
import ${componentName} from '../src/index';

export default () => {
  return (
    <>
      <${componentName} size={300} />
    </>
  );
};
  `,
      );
    }

    // 修改路径alias添加

    readFile(join(__dirname, '..', 'tsconfig.json'), 'utf-8', function (err, data) {
      if (err) throw err;
      // list the packages dir
      const paths = {};
      const temp = readdirSync(join(__dirname, '..', 'packages')).map((dirname) => {
        return [`@lekp/pro-${dirname}`, [`./packages/${dirname}/src/index.tsx`]];
      });
      temp.forEach(([key, value]) => {
        paths[`${key}`] = value;
      });
      const result = JSON.parse(data);
      result.compilerOptions.paths = paths;
      writeFileSync(
        join(__dirname, '..', 'tsconfig.json'),
        JSON.stringify(result),
        'utf8',
        function (err) {
          if (err) {
            console.log(err);
          }
        },
      );
    });
  });
})();
