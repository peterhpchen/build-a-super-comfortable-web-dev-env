# lint-staged

使用 lint-staged 對 Git 暫存（ Staged ）檔案執行程序。

## 介紹 lint-staged

lint-staged 是個 npm 套件，它會依照配置將符合規則（ glob ）的 Git 暫存檔案路徑帶入設定的程序中並執行。

## 使用 lint-staged 的原因

做 lint 、 format 或是通過測試，對於程式碼的品質維護有很大的幫助，因此在提交代碼時，我們會使用 Git hooks 確保這些優化程序有被執行。

但是在 Git hooks 執行這些優化時，程序處理的範圍會包含整個專案的程式碼，就算是未提交的檔案，依然會被作為優化對象，這樣一來會浪費許多時間。

lint-staged 的目的就是讓這些優化程序只作用於提交的程式碼上，進而減少花費的時間。

## 使用 lint-staged

用 npm 安裝 lint-staged ：

```bash
npm install lint-staged --save-dev
```

接著要建立配置檔 `lint-staged.config.js` ：

```js
module.exports = {
  '*': ['echo'],
};
```

為了解說 lint-staged 的功能，將所有提交的檔案都以 `echo` 輸出參數資訊。

接著將檔案加入暫存區中：

```bash
git add package.json package-lock.json
```

然後執行 `lint-staged` 指令：

```bash
npx lint-staged -v
```

lint-staged 預設不輸出程序的訊息，為了觀看 lint-staged 的功能，要加上參數 `-v` ，它會顯示程序所輸出的訊息。

執行的結果如下：

```bash
> lint-staged -v

✔ Preparing...
✔ Running tasks...
✔ Applying modifications...
✔ Cleaning up...

ℹ echo:
/Users/PeterChen/Documents/code/build-a-super-comfortable-web-dev-env/days/11-lint-staged/examples/example-lint-staged/package-lock.json /Users/PeterChen/Documents/code/build-a-super-comfortable-web-dev-env/days/11-lint-staged/examples/example-lint-staged/package.json
```

進入暫存的的檔案 `package.json` 與 `package-lock.json` 被作為參數傳入程序中，並被 `echo` 輸出。

### 不同檔案執行不同程序

lint-staged 設定的每個規則的鍵值為 glob 的字串， lint-staged 會將包含在內的檔案轉為絕對路徑（ absolute path ）並作為參數傳入各個指令內。

例如下面這個例子：

```js
module.exports = {
  '*.js': ['echo'],
};
```

這樣的配置會只讓 JS 檔案被 `echo` 輸出路徑，例如 `lint-staged.config.js` 就會被包含，但是 `package.json` 因為不是 `.js` 的檔案，所以就算提交了還是不會被 `echo` 輸出。

### 複數指令

有時在同個檔案上，我們不只要使用 linter 檢查語法的問題，還要使用 formatter 格式化，甚至執行測試確認通過。

lint-staged 可以設置陣列，讓複數指令作用於相同的檔案上。

以下面的例子來說：

```js
module.exports = {
  '*': ['echo', 'cat'],
};
```

它會對所有的提交的檔案執行 `echo` 與 `cat` 。

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
> 這樣一來，每當我們提交代碼時，就會叫用 `npx lint-staged` 把提交的檔案路徑送去給 lint-staged 中設定指令做處理。

## 在 lint-staged 中依照檔案類型設置對應的工具

為了讓 lint-staged 可以對於各類型的檔案提供合適的工具做處理，我們需要設定 `lint-staged.config.js` ：

```js
module.exports = {
  'package.json': ['prettier --write'],
  '*.js': ['npx eslint --fix', 'prettier --write'],
  '*.css': ['stylelint --fix', 'prettier --write'],
  '*.md': ['markdownlint', 'prettier --write'],
};
```

藉由 glob 設定各個檔案類型應該被哪些工具檢查，藉以避免不必要的花費與衝突產生。

## 本文重點整理

- 在每次提交時，對專案中所有檔案做優化的處理是沒必要的，只會浪費更多的資源。
- lint-staged 讓優化的程序可以聚焦於暫存檔案上，只有那些這次提交的檔案會作用這些優化程序，並且可以利用 glob 指示要使用不同指令。
- 藉由 lint-staged 與 husky 的搭配，我們可以在 `git commit` 的時候叫用 lint-staged ，接著在 lint-staged 中針對各種不同的檔案類型設置對應的處理工具，如此一來，可以減少工具因不符合的檔案而進行無用的處理，也可以降低衝突的產生。

## 參考資料

- [GitHub: okonet/lint-staged](https://github.com/okonet/lint-staged)
