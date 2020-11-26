---
title: 快速开始
order: 2
group:
  path: /
nav:
  title: 文档
  path: /docs
---

## 安装

当前 ProComponents 每一个组件都是一个独立的包，你需要在你的项目中安装对应的 npm 包并使用。

```shell
$ npm i @lekp/pro-foo --save
```

当前 ProComponents 提供了如下组件可直接使用：

- `npm i @lekp/pro-foo --save`

## 在项目中使用

每一个包都是一个独立的组件包，使用示例如下 ：

```jsx
import React from 'react';
import Foo from '@lekp/pro-foo';

export default () => {
  return (
    <>
      <Foo size={300} />
    </>
  );
};
```

我们所有的包都使用 less 来进行样式管理，方便进行主题的自定义。如果你没有 less-loader 可以尝试从 `dist` 中导入 css。

```tsx | pure
import '@lekp/pro-foo/dist/form.css';
```

建议还是使用 less，可以方便进行主题自定义，来可以做到按需加载。
