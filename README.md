## 抽离于 @ant-design/pro-components

> 适用于公司组件开发

## 开发模式

1. `yarn` 安装依赖
2. `yarn bootstrap foo` 创建模版内容
3. `yarn start` 开发预览
4. `yarn build` 手动打包
5. `yarn release` 发布到 npm organize 下,举例. 创建私有组织 love , 发布之后会注册到@love/pro-foo 下,必要条件 npm login 登录,通过 npm whoami 查看状态,git commit 完毕
6. `yarn test&release` 先执行测试案例是否通过,再发版

## 效果

![image.png](https://i.loli.net/2020/11/27/nsZzFBovVjJm6e5.png)

![image.png](https://i.loli.net/2020/11/27/hy7DWTGFaIncq6H.png)

## 目录结构

```bash
.
├── CONTRIBUTING.md
├── README.md
├── docs
│   ├── components.md # 组件概览
│   ├── getting-started.md # 开始使用
│   ├── index.md # 文档首页
│   ├── intro.md # 文档介绍
│   └── pro-foo.changelog.md # 手动添加前缀,每个组件
├── jest.config.js
├── lerna-debug.log
├── lerna.json
├── package.json
├── packages
│   ├── boo
│   │   ├── CHANGELOG.md
│   │   ├── README.md
│   │   ├── demos
│   │   │   └── base.tsx
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── boo.md
│   │   │   ├── components
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   └── typings.d.ts
│   ├── foo # 组件开发处
│   │   ├── CHANGELOG.md
│   │   ├── README.md
│   │   ├── demos
│   │   │   └── base.tsx
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── components
│   │   │   ├── foo.md
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   └── typings.d.ts
│   └── list
│       ├── CHANGELOG.md
│       ├── README.md
│       ├── demos
│       │   └── base.tsx
│       ├── package.json
│       ├── src
│       │   ├── components
│       │   ├── index.less
│       │   ├── index.tsx
│       │   └── list.md
│       └── typings.d.ts
├── public
│   ├── CNAME
│   ├── favicon.ico
│   └── icon.png
├── scripts
│   ├── bootstrap.js
│   ├── createRelease.js
│   ├── generateSizeLimit.js
│   ├── release.js
│   ├── syncTNPM.js
│   ├── utils
│   │   ├── exec.js
│   │   ├── getPackages.js
│   │   └── isNextVersion.js
│   └── verifyCommit.js
├── tests # 测试删除了部分组件文件夹
│   ├── demo.tsx
│   ├── no-duplicated.ts
│   ├── setupTests.js
│   ├── tsconfig.duplicate.json
│   └── util.ts
├── tsconfig.json
├── webpack.config.js
├── yarn-error.log
└── yarn.lock

```
