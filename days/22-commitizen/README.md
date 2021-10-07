# 22 - Commitizen - 產生合法的 Commit 訊息

針對 commit 訊息的規範，最為人熟知的是 [Angular 的 Commit Message Format](https://github.com/angular/angular/blob/9fb79d38aade67f6f3bcdac0ffa93b8806baa215/CONTRIBUTING.md#commit) ，此規則將訊息分為 **header** 、 **body** 與 **footer** 三個部分，分別又有不同的規則，這使得要寫出符合規範的訊息變成了一件不簡單的事情。

## 寫個好的 Commit 訊息 - Commitizen

為了避免寫出不符規範的 commit 訊息而遭到退回， Commitizen 使用問答的方式，讓使用者在完成問答時就可以邊寫出符合規範的訊息，以減少來回的次數。

Commitizen 是個指令式的工具，藉由 npm 安裝，使用 Commitizen 來 commit 程式時會啟動使用者所設定的 adapter ，使用 adapter 提供的問題一一詢問開發者，每個問題都會確認一部分的 commit 訊息，到最後將所有的回答組合起來，變成一個完整並符合規範的 commit 訊息。

## 安裝 Commitizen

要使用 Commitizen 前，請先安裝：

```bash
npm install commitizen --save-dev
```

## 使用 Commitizen

安裝完成後，將 Commitizen 的指令 `cz` 加入 `package.json` 的 `scripts` ：

```json
{
  "scripts": {
    "commit": "cz"
  }
}
```

這時如果執行指令的話，由於沒有設定 adapter ，所以會以預設的 `git commit` 執行。

加入 `cz-conventional-changelog` adapter 來執行 Commitizen ：

```bash
npm install cz-conventional-changelog --save-dev
```

接著要配置 Commitizen 的 adapter 設定：

```json
{
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

`config.commitizen.path` 的路徑會被 [require.resolve](https://nodejs.org/api/globals.html#globals_require_resolve) 解析，因此可以直接寫模組名稱，它可以被對應至 `node_modules` 下的真正路徑。

執行 `npm run commit` 後就可以看到終端跳出問題供使用者依照情境做選擇：

```bash
> cz

? Select the type of change that you're committing: feat:     A new feature
? What is the scope of this change (e.g. component or file name): (press enter to skip) test
? Write a short, imperative tense description of the change (max 88 chars):
 (11) add gitkeep
? Provide a longer description of the change: (press enter to skip)
 I added .gitkeep for folder examples
? Are there any breaking changes? No
? Does this change affect any open issues? No
```

全部都回答完成後， Commitizen 就會將程式用這個 commit 訊息提交，經由 `git log` 可以看到建立的訊息：

```bash
    feat(test): add gitkeep

    I added .gitkeep for folder examples
```

## 整合 Commitlint 與 Commitizen

Commitlint 和 Commitizen 的配置不一致（以 `package.json` 中的配置為例， Commitlint 的配置屬性為 `commitlint` ，而 Commitizen 的屬性為 `config.commitizen` ），可能導致使用 Commitizen 建立的訊息，不能通過 Commitlint 的檢查。

要解決這個問題，我們需要調整設定，讓這兩個工具使用**同一個配置**。

### 方法一： `@commitlint/prompt`

[`@commitlint/prompt`](https://github.com/conventional-changelog/commitlint/blob/fc1ee0b0af4167f2e2c8f79ffcf03d0e51a5d045/@commitlint/prompt/README.md) 是個 Commitizen 的 adapter ，它可以讓 Commitizen 使用 Commitlint 的配置。

首先安裝 `@commitlint/prompt` ：

```bash
npm install @commitlint/prompt --save-dev
```

然後修改 `package.json` 中 Commitizen 的 adapter 路徑：

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

這樣一來執行 `npm run commit` 的時候， Commitizen 就會使用 Commitlint 的配置作為提示的依據。

### 方法二： `@commitlint/prompt-cli`

[`@commitlint/prompt-cli`](https://github.com/conventional-changelog/commitlint/blob/fc1ee0b0af4167f2e2c8f79ffcf03d0e51a5d045/@commitlint/prompt-cli/README.md) 是個獨立的訊息提示工具，它並不依賴於 Commitizen （雖然使用者不用操作 Commitizen ，但是 `@commitlint/prompt-cli` 使用了 `@commitlint/prompt` 實作，因此內部依然與 Commitizen 相依。），並使用 Commitlint 的配置作為設定。

首先安裝 `@commitlint/prompt-cli` ：

```bash
npm install @commitlint/prompt-cli --save-dev
```

然後 修改 `package.json` 中的 `commit` script ：

```bash
{
  "scripts": {
    "commit": "commit"
  },
}
```

> 由於已經不相依於 Commitizen ，可以刪除 `package.json` 中的 `config.commitizen` 設定與解安裝 `commitizen` 和 `cz-conventional-changelog` 兩個套件。
> 這樣一來執行 `npm run commit` 的時候，就會執行 `@commitlint/prompt-cli` 提示使用者輸入正確的訊息。

### 方法三： `@commitlint/cz-commitlint`

前兩個方法都採用輸入的方式建立訊息，其互動的方式與原本使用 Commitizen 的 `cz-conventional-changelog` 時有差別。

如果想要使用原本 `cz-conventional-changelog` 的互動方式，可以使用 `@commitlint/cz-commitlint` 作為 Commitizen 的 adapter ，它不僅可以使用 Commitlint 的配置，還有與 `cz-conventional-changelog` 相同的互動方式。

首先安裝 `@commitlint/cz-commitlint` ：

```bash
npm install @commitlint/cz-commitlint --save-dev
```

然後修改 `package.json` 中 Commitizen 的 adapter 路徑：

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

這樣一來執行 `npm run commit` 時，就可以使用 `cz-conventional-changelog` 的互動方式與 Commitlint 的配置檔做設定了。

### 最終採用 `@commitlint/cz-commitlint` 整合 commitlint 與 Commitizen

我們採用方法三的 `@commitlint/cz-commitlint` 作為整合方案，因為 `@commitlint/cz-commitlint` 的互動方式較 `@commitlint/prompt` 與 `@commitlint/prompt-cli` 更為人性化，也更為易用。

## 使用 Husky 為 Commitizen 註冊 Git hooks

到目前為止，我們都必須自己去叫用 Commitizen 才能啟動，使用起來的步驟較原本多，也更不直覺，容易被忽略。

接下來我們藉由 husky 的幫助，將 Commitizen 融入 Git flow 中，讓其更加的易用。

使用 `husky add` 將指令加入 Git hooks ：

```bash
npx husky add .husky/prepare-commit-msg 'exec < /dev/tty && node_modules/.bin/cz --hook || true'
```

由於我們已經將 Commitizen 加入 Git hooks 中了，因此可以刪除 `package.json` 中的 `commit` script ：

```json
{
  "scripts": {
    // "commit": "cz"
  }
}
```

修改完後，要重新註冊 Git hooks ：

```bash
npm install
```

`npm install` 會觸發在執行 `husky-init` 時建立的 `prepare` script ，去做相關的初始化工作。

> 如果需要 Husky 相關的使用說明，請看本系列的「 [20 - Husky - Git Hooks 工具](../20-husky/README.md)」 一文的介紹。

完成設定後，當你輸入指令 `git commit` ，就會啟動 Commitizen 來編輯訊息。

## 本文重點整理

- commit 訊息規範複雜，為了避免不符規範的 commit 遭退回， Commitizen 使用交互問答的方式，讓使用者在回答問題的過程中迅速且精準的完成訊息的編輯，以避免錯誤發生。
- 在整合 Commitizen 與 Commitlint 時，使用 `@commitlint/cz-commitlint` 作為 Commitizen 的 adapter ，讓我們可以用 Commitlint 的配置設定 Commitizen ，並採用 `cz-conventional-changelog` 的互動方式建立訊息。
- 與 Husky 整合，可以讓我們在編輯 Commit 訊息時，可以啟動 Commitizen 。

## 參考資料

- [GitHub: commitizen/cz-cli](https://github.com/commitizen/cz-cli)
- [GitHub: angular/angular Commit Message Guidelines](https://github.com/angular/angular/blob/9fb79d38aade67f6f3bcdac0ffa93b8806baa215/CONTRIBUTING.md#commit)
- [GitHub: conventional-changelog/commitlint](https://github.com/conventional-changelog/commitlint)
