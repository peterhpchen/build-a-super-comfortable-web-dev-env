import { defineUserConfig } from 'vuepress';
import { defaultTheme } from 'vuepress';

import { redirectPlugin } from 'vuepress-plugin-redirect';

export default defineUserConfig({
  base: '/build-a-super-comfortable-web-dev-env/',
  lang: 'zh-TW',
  title: '尋覓網站開發的神兵利器',
  description:
    '介紹網站開發時的各式工具，藉由這些工具的幫助，提高自身的生產力。',
  theme: defaultTheme({
    home: '/00-preface/README.md',
    navbar: [
      {
        text: 'iThome 鐵人賽',
        link: 'https://ithelp.ithome.com.tw/users/20107789/ironman/3893',
      },
    ],
    repo: 'peterhpchen/build-a-super-comfortable-web-dev-env',
    sidebar: [
      '/00-preface/README.md',
      '/01-homebrew/README.md',
      '/02-rectangle/README.md',
      '/03-alacritty/README.md',
      '/04-tmux/README.md',
      '/05-tmuxinator/README.md',
      '/06-tpm-and-plugins/README.md',
      '/07-zimfw-and-plugins/README.md',
      '/08-fd/README.md',
      '/09-ripgrep/README.md',
      '/10-bat/README.md',
      '/11-exa/README.md',
      '/12-fzf/README.md',
      '/13-cheat-sh/README.md',
      '/14-tig/README.md',
      '/15-nvm/README.md',
      '/16-editor-config/README.md',
      '/17-vscode-and-extensions/README.md',
      '/18-vscode-restclient/README.md',
      '/19-vscode-remote-containers/README.md',
      '/20-husky/README.md',
      '/21-commitlint/README.md',
      '/22-commitizen/README.md',
      '/23-prettier/README.md',
      '/24-eslint/README.md',
      '/25-stylelint/README.md',
      '/26-markdownlint/README.md',
      '/27-combo-all-you-can-lint/README.md',
      '/28-lint-staged/README.md',
      '/29-hygen/README.md',
      '/99-summary/README.md',
      '/extra01-glob/README.md',
      '/extra02-ignore/README.md',
      '/extra03-browserslist/README.md',
      '/extra04-git/README.md',
      '/extra05-docker/README.md',
      '/extra06-typescript/README.md',
      '/extra07-jest/README.md',
      '/extra08-cypress/README.md',
      '/extra09-storybook/README.md',
    ],
    sidebarDepth: 0,
    docsDir: 'days',
  }),
  plugins: [
    redirectPlugin({
      config: {
        '/index.html': '/00-preface/',
      },
    }),
  ],
});
