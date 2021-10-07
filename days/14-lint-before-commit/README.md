# 組合技： Linters + Jest + lint-staged + husky

藉由 lint-staged 與 husky 的幫助，在提交前確保程式碼的品質，讓開發者可以：

- 依提交的程式碼**種類**，對其做對應的 lint 、 format 與測試。
- 只針對**提交的程式碼**做相關的 lint 、 format 與測試，避免全局的執行處理。
- 在 `git commit` 時自動啟用 lint 、 format 與測試。

## 前置條件

在開始整合前，我們需要安裝各 Linters ，請依照[組合技： All you can lint]() 一文配置各種工具。

接著我們來安裝 Jest 、 lint-staged 與 husky ：

```bash
# Install Jest
npm install jest --save-dev

# Install lint-staged
npm install lint-staged --save-dev

# Install husky
npx husky-init && npm install
```

這樣一來，所有相關的工具都已經安裝好了，接著我們就來將這些工具整合起來使用。

## 在 husky 中設置 lint-staged

為了在提交代碼時可以觸發各種檢查工具，我們需要將 lint-staged 藉由 husky 配置到 Git hook 上：

```bash
npx husky add .husky/pre-commit 'npx lint-staged'
```

然後重新註冊 Git hooks ：

```bash
npm install
```

`npm install` 會觸發在執行 `husky-init` 時建立的 `prepare` script ，去做相關的初始化工作。

> 如果需要 husky 相關的使用說明，請看[本系列的 husky 一文]()的介紹。

這樣一來，每當我們提交代碼時，就會叫用 `npx lint-staged` 把提交的檔案路徑送去給 lint-staged 中設定指令做處理。

## 在 lint-staged 中依照檔案類型設置對應的工具

為了讓 lint-staged 可以對於各類型的檔案提供合適的工具做處理，我們需要設定 `lint-staged.config.js` ：

```js
module.exports = {
  'package.json': ['prettier --write'],
  '*.js': ['npx eslint --fix', 'prettier --write', 'jest --findRelatedTests'],
  '*.css': ['stylelint --fix', 'prettier --write'],
  '*.md': ['markdownlint', 'prettier --write'],
}
```

藉由 glob 設定各個檔案類型應該被哪些工具檢查，藉以避免不必要的花費與衝突產生。

## 總結

藉由 lint-staged 與 husky 的搭配，我們可以在 `git commit` 的時候叫用 lint-staged ，接著在 lint-staged 中針對各種不同的檔案類型設置對應的處理工具，如此一來，可以減少工具因不符合的檔案而進行無用的處理，也可以降低衝突的產生。

## 參考

- [GitHub: okonet/lint-staged](https://github.com/okonet/lint-staged)
- [Jest CLI Options](https://jestjs.io/docs/cli)
