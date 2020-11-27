import { readdirSync } from 'fs';
import chalk from 'chalk';
import { join } from 'path';

const headPkgList = [];
// utils must build before core
// runtime must build before renderer-react
const pkgList = readdirSync(join(__dirname, 'packages')).filter(
    (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);

const alias = pkgList.reduce((pre, pkg) => {
    pre[`@lekp/pro-${pkg}`] = join(__dirname, 'packages', pkg, 'src');
    return {
        ...pre,
    };
}, {});

console.log(`🌼 alias list \n${chalk.blue(Object.keys(alias).join('\n'))}`);

const tailPkgList = pkgList
    .map((path) => [join('packages', path, 'src')])
    .reduce((acc, val) => acc.concat(val), []);

const isProduction = process.env.NODE_ENV === 'production';

export default {
    title: 'LekpComponents',
    mode: 'site',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Firefox_Logo%2C_2017.svg',
    extraBabelPlugins: [
        [
            'import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true,
            },
        ],
    ],
    publicPath: process.env.NODE_ENV === 'production' ? '/pro-components/' : '/pro-components/',
    metas: [{
            property: 'og:site_name',
            content: 'LekpComponents',
        },
        {
            'data-rh': 'keywords',
            property: 'og:image',
            content: '',
        },
        {
            property: 'og:description',
            content: '描述',
        },
        {
            name: 'keywords',
            content: '关键字 关键字1 关键字2',
        },
        {
            name: 'description',
            content: '介绍文字',
        },
        {
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
        },
        {
            name: 'apple-mobile-web-app-status-bar-style"',
            content: 'black-translucent',
        },
    ],
    alias,
    // 用于切换 antd 暗黑模式
    // antd: {
    //   dark: true,
    // },
    resolve: { includes: [...tailPkgList, 'docs'] },
    navs: [
        null,
        {
            title: 'GitHub',
            path: 'https://github.com/lgoweb/pro-components',
        },
    ],
    // 统计访问量
    // analytics: isProduction ?
    //     {
    //         ga: 'UA-173569162-1',
    //     } :
    //     false,
    hash: true,
    exportStatic: {},
    ssr: {
        devServerRender: false,
    },
    exportStatic: {},
    // cdn挂载
    externals: process.env.NODE_ENV === 'development' ?
        {
            react: 'window.React',
            'react-dom': 'window.ReactDOM',
            moment: 'window.moment',
            antd: 'window.antd',
        } :
        {},
    targets: {
        chrome: 80,
        firefox: false,
        safari: false,
        edge: false,
        ios: false,
    },

    theme: {
        '@s-site-menu-width': '208px',
    },
    // 开发模式下线上依赖 link
    links: process.env.NODE_ENV === 'development' ?
        ['https://gw.alipayobjects.com/os/lib/antd/4.6.6/dist/antd.css'] :
        [],
    scripts: process.env.NODE_ENV === 'development' ?
        [
            'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.development.js',
            'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.development.js',
            'https://gw.alipayobjects.com/os/lib/moment/2.29.0/min/moment-with-locales.js',
            'https://gw.alipayobjects.com/os/lib/antd/4.6.6/dist/antd-with-locales.js',
        ] :
        [],
};
