# Commitizen

使用 Commitizen 的交互問答方式完成 commit 訊息的編輯。

## 介紹 Commitizen

Commitizen 是個指令式的工具，藉由 npm 安裝，使用 Commitizen 來 commit 程式時會啟動使用者所設定的 adapter ，使用 adapter 提供的問題一一詢問開發者，每個問題都會確認一部分的 commit 訊息，到最後將所有的回答組合起來，變成一個完整並符合規範的 commit 訊息。

## 使用 Commitizen 的原因

針對 commit 訊息的規範，最為人熟知的是 [Angular 的 Commit Message Format](https://github.com/angular/angular/blob/9fb79d38aade67f6f3bcdac0ffa93b8806baa215/CONTRIBUTING.md#commit) ，此規則將訊息分為 **header** 、 **body** 與 **footer** 三個部分，分別又有不同的規則，這使得要寫出符合規範的訊息變成了一件不簡單的事情。

為了避免寫出不符規範的 commit 訊息而遭到退回， commitizen  使用問答的方式，讓使用者在完成問答時就可以邊寫出符合規範的訊息，以減少來回的次數。

## 使用 Commitizen

 要使用 Commitizen 前，請先安裝：

```bash
npm install commitizen --save-dev
```

接著將 commitizen 的指令 `cz` 加入 `package.json` 的 `scripts` ：

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

 接著要配置 Commitizen 的 adapter 設定：

```json
{
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

`config.commitizen.path` 的路徑會被 [require.resolve](https://nodejs.org/api/globals.html#globals_require_resolve) 解析，因此可以直接寫模組名稱，它可以被對應至 `node_modules` 下的真正路徑。

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

## 總結

commit 訊息規範複雜，為了避免不符規範的 commit 遭退回， Commitizen 使用交互問答的方式，讓使用者在回答問題的過程中迅速且精準的完成訊息的編輯，以避免錯誤發生。

## 參考資料

- [GitHub: commitizen/cz-cli](https://github.com/commitizen/cz-cli)
- [GitHub: angular/angular Commit Message Guidelines](https://github.com/angular/angular/blob/9fb79d38aade67f6f3bcdac0ffa93b8806baa215/CONTRIBUTING.md#commit)
