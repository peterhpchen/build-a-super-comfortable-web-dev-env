# 組合技： commitlint + commitizen + husky

將 commitlint 、 commitizen 與 husky 整合於專案中，讓開發者可以：

- commitlint 與 commitizen 使用相同的配置。
- 在 `git commit` 時啟動 commitizen 輸入訊息。
- 提交時使用 commitlint 檢查提交訊息的正確性。

接著會說明如何統整這三個工具使專案具有上述的功能。

## 前置條件

在開始整合前，我們需要先安裝 commitlint 、 commitizen 與 husky ：

```bash
# Install commitlint
npm install @commitlint/cli @commitlint/config-conventional --save-dev

# Install commitizen
npm install commitizen cz-conventional-changelog --save-dev

# Install husky
npx husky-init && npm install
```

配置 `package.json` 的屬性 `config.commitizen.path` 與 `commit` script ：

```json
{
  "scripts": {
    "commit": "cz"
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

配置 `commitlint.config.js` ：

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

這裡依照各工具的安裝與配置方式做前置的設定，目前每個工具都還是獨立運作的，還未做整合，接下來就讓我們來看看如何整合這些工具吧。

## 整合 commitlint 與 commitizen

commitlint 和 commitizen 的配置不一致[^diff-config]，可能導致使用 commitizen 建立的訊息，不能通過 commitlint 的檢查。

[^diff-config]: 以 `package.json` 中的配置為例， commitlint 為 `commitlint` ，而 `commitizen` 為 `config.commitizen` 。

要解決這個問題，我們需要調整設定，讓這兩個工具使用**同一個配置**。

### 方法一： `@commitlint/prompt`

[`@commitlint/prompt`](https://github.com/conventional-changelog/commitlint/blob/fc1ee0b0af4167f2e2c8f79ffcf03d0e51a5d045/@commitlint/prompt/README.md) 是個 commitizen 的 adapter ，它可以讓 commitizen 使用 commitlint 的配置。

首先安裝 `@commitlint/prompt` ：

```bash
npm install @commitlint/prompt --save-dev
```

然後修改 `package.json` 中 commitizen 的 adapter 路徑：

```json
{
  "config": {
    "commitizen": {
      "path": "@commitlint/prompt"
    }
  }
}
```

> 如果有安裝 adapter `cz-conventional-changelog` ，請將它解安裝。

這樣一來執行 `npm run commit` 的時候， commitizen 就會使用 commitlint 的配置作為提示的依據。

### 方法二： `@commitlint/prompt-cli`

[`@commitlint/prompt-cli`](https://github.com/conventional-changelog/commitlint/blob/fc1ee0b0af4167f2e2c8f79ffcf03d0e51a5d045/@commitlint/prompt-cli/README.md) 是個獨立的訊息提示工具，它並不依賴於 commitizen [^still-dependent]，並使用 commitlint 的配置作為設定。

[^still-dependent]: 雖然使用者不用操作 commitizen ，但是 `@commitlint/prompt-cli` 使用了 `@commitlint/prompt` 實作，因此內部依然與 commitizen 相依。

首先安裝 `@commitlint/prompt-cli` ：

```bash
npm install @commitlint/prompt-cli --save-dev
```

然後  修改 `package.json` 中的 `commit` script ：

```bash
{
  "scripts": {
    "commit": "commit"
  },
}
```

> 由於已經不相依於 commitizen ，可以刪除 `package.json` 中的 `config.commitizen` 設定與解安裝 `commitizen` 和 `cz-conventional-changelog` 兩個套件。

這樣一來執行 `npm run commit` 的時候，就會執行 `@commitlint/prompt-cli` 提示使用者輸入正確的訊息。

### 方法三： `@commitlint/cz-commitlint`

前兩個方法都採用輸入的方式建立訊息，其互動的方式與原本使用 commitizen 的 `cz-conventional-changelog` 時有差別。

如果想要使用原本 `cz-conventional-changelog` 的互動方式，可以使用 `@commitlint/cz-commitlint` 作為 commitizen 的 adapter ，它不僅可以使用 commitlint 的配置，還有與 `cz-conventional-changelog` 相同的互動方式。

首先安裝 `@commitlint/cz-commitlint` ：

```bash
npm install @commitlint/cz-commitlint --save-dev
```

然後修改 `package.json` 中 commitizen 的 adapter 路徑：

```json
{
  "config": {
    "commitizen": {
      "path": "@commitlint/cz-commitlint"
    }
  }
}
```

> 如果有安裝 adapter `cz-conventional-changelog` ，請將它解安裝。

這樣一來執行 `npm run commit` 時，就可以使用 `cz-conventional-changelog` 的互動方式與 commitlint 的配置檔做設定了。

### 最終採用 `@commitlint/cz-commitlint` 整合 commitlint 與 commitizen

我們採用方法三的 `@commitlint/cz-commitlint` 作為整合方案，因為 `@commitlint/cz-commitlint` 的互動方式較 `@commitlint/prompt` 與 `@commitlint/prompt-cli` 更為人性化，也更為易用。

## 使用 husky 為 commitlint 與 commitizen 註冊 Git hooks

到目前為止，我們都必須自己去叫用 commitlint 與 commitizen 才能作用這些工具，使用起來的步驟較原本多，也更不直覺，容易被忽略。

接下來我們藉由 husky 的幫助，將 commitlint 與 commitizen 融入 Git flow 中，讓其更加的易用。

使用 `husky add` 將指令加入 Git hooks ：

```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
npx husky add .husky/prepare-commit-msg 'exec < /dev/tty && node_modules/.bin/cz --hook || true'
```

由於我們已經將 commitizen 加入 Git hooks 中了，因此可以刪除 `package.json` 中的 `commit` script ：

```diff
{
  "scripts": {
-    "commit": "cz"
  },
}
```

修改完後，要重新註冊 Git hooks ：

```bash
npm install
```

`npm install` 會觸發在執行 `husky-init` 時建立的 `prepare` script ，去做相關的初始化工作。

> 如果需要 husky 相關的使用說明，請看[本系列的 husky 一文]()的介紹。

完成設定後，當你輸入指令 `git commit` ，就會啟動 commitizen 來編輯訊息，並在完成編輯後啟動 commitlint 檢查訊息。

## 總結

要整合 commitlint 、 commitizen 與 husky 的話，會分為兩個部分：

- 整合設定：使用 `@commitlint/cz-commitlint` 作為 commitizen 的 adapter ，讓我們可以用 commitlint 的配置設定 commitizen ，並採用 `cz-conventional-changelog` 的互動方式建立訊息。
- 設定 Git hooks ：在 Git hooks 中加入 commitlint 與 commitizen 兩個指令，讓我們在使用 Git 時可以直接叫用這些工具。

整合完成後，專案就有了各方面對於 commit 訊息的控制能力，避免非正規的訊息跑入 repository 中。

## 參考資料

- [GitHub: conventional-changelog/commitlint](https://github.com/conventional-changelog/commitlint)
- [GitHub: commitizen/cz-cli](https://github.com/commitizen/cz-cli)
