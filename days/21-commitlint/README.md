# 21 - Commitlint - Lint Commit 訊息

git 的 commit 訊息是個隨意格式的純文字文件，使用者可以使用 commit 的訊息快速理解各個 commit 的用途。

但由於 commit 訊息本身並沒有限制相關的寫法，因此常會造成不同人對於 commit 訊息編輯方式有所差異，這樣隨意的訊息所提供的資訊有些多、有些少，使得其幾乎沒有參考的價值。

## Commit 訊息的 Linter - Commitlint

![icon](./assets/icon.png)

Commitlint 是個 npm 套件，它使用 [commit conventions](https://www.conventionalcommits.org/en/v1.0.0/) 規範來檢查 commit 的訊息是否符合使用者所設定之規則。

透過配置檔 `commitlint.config.js` 的設定， commitlint 可以知道要使用哪些規則規範 commit 訊息，並輸出相對的提示供使用者作為修改的依據。

使用 commitlint 規範專案的 commit 訊息，可以讓所有人的訊息保持一致的格式，這樣做會有下列好處：

- 容易檢索：利用定義的關鍵字及模組名稱可以輕鬆地找到想要找的 commit
- 自動輸出 Changelog ：固定的訊息格式可以藉由[工具](https://github.com/conventional-changelog/conventional-changelog)的幫助輸出 Changelog

## 安裝 Commitlint

首先使用 `npm` 安裝 Commitlint ：

```bash
npm install @commitlint/cli --save-dev
```

## 使用 Commitlint

安裝完成後，由於 commitlint 的配置檔是必要的，因此要建立配置檔 `commitlint.config.js` ：

```js
module.exports = {
  rules: {
    'header-min-length': [2, 'always', 10],
  },
};
```

配置檔中的屬性 `rules` 可以設定各式的規則，規則列表請參考 [commitlint 的官方頁面](https://commitlint.js.org/#/reference-rules)。

範例中設定訊息標頭的最小長度要大於 `10` 。

接著執行 `commitlint` ：

```bash
> echo 'foo' | npx commitlint
⧗   input: foo
✖   header must not be shorter than 10 characters, current length is 3 [header-min-length]

✖   found 1 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
```

當訊息為 `foo` 時，由於長度只有 `3` ，因此 commitlint 會視為違規而輸出錯誤訊息。

### 預設規則包

為了節省使用者配置規則的時間， commitlint 可以使用預先配置的規則包來設定多項規則。

在使用前須要先安裝：

```bash
npm install @commitlint/config-conventional --save-dev
```

這裡使用 `@commitlint/config-conventional` 是 commitlint 提供的規則包。

安裝完成後，要在配置檔中設定使用規則包：

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  // ...
};
```

這樣一來 commitlint 就會將 [`@commitlint/config-conventional` 所配置的規則](https://github.com/conventional-changelog/commitlint/blob/5403f0b5bcab43803708997c482a44a7d1151480/@commitlint/config-conventional/index.js)都納入並對訊息做相應的檢查。

## 使用 Husky 為 Commitlint 註冊 Git Hooks

到目前為止，我們都必須自己去叫用 commitlint 才能作用，使用起來的步驟較原本多，也更不直覺，容易被忽略。

接下來我們藉由 Husky 的幫助，將 commitlint 融入 Git flow 中，讓其更加的易用。

使用 `husky add` 將指令加入 Git hooks ：

```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

修改完後，要重新註冊 Git hooks ：

```bash
npm install
```

`npm install` 會觸發在執行 `husky-init` 時建立的 `prepare` script ，去做相關的初始化工作。

> 如果需要 Husky 相關的使用說明，請看本系列的「[20 - Husky - Git Hooks 工具](../20-husky/README.md)」一文的介紹。

完成設定後，當你輸入指令 `git commit` ，在完成編輯訊息後會啟動 commitlint 檢查訊息。

## 本文重點整理

- commit 訊息是開發者識別 commit 內容的重要資訊，如果 commit 訊息不能清楚表示 commit 的用途時，開發者就必須直接看程式碼修改的內容來確認 commit ，會造成時間上的花費。
- 好的 commit 訊息不僅能增加查找的速度，在發布時還可以藉由訂定的結構自動產生 Changelog ，就不需要每次發布時還要人工編輯 Changelog 。
- 以自動化發布為目標的專案來說， commitlint 是不可或缺的工具。
- 在使用 Commitlint 前，需要設定配置檔才能使 Linter 產生效用。
- 可以使用預設的規則包來減少配置時所需的時間。
- 與 Husky 一起使用，可以在提交訊息時啟動 Commitlint 檢查。

## 參考資料

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [GitHub: conventional-changelog/commitlint](https://github.com/conventional-changelog/commitlint)
