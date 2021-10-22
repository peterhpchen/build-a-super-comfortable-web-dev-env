# Extra06 - TypeScript - 型別檢查工具

> 此篇為番外，未收入在本篇的原因是 TypeScript 會直接影響開發，使撰寫的程式語法與原本不同，因此需看專案或使用者的需求決定是否使用，因此放入番外作為補充。

JavaScript 本身的語言特性，使其的變數並不會受到型別的約束，這雖然使 JavaScript 具有高度的彈性，但缺乏型別會導致在撰寫程式時遭受型別錯誤的問題而困擾。

## 具有型別的 JavaScript - TypeScript

TypeScript 是個 JavaScript 的超集語言，使用 TypeScript 的語法所寫出的代碼，會具有型別，藉由 TypeScript 提供的編譯器，可以在原本的 JavaScript 語法上提供型別的支援，藉由變數的定義去推斷型別，並進一步提醒開發者注意型別問題。

除了推斷的功能外， TypeScript 最強大的功能在於可以利用自身的語法**定義**型別，藉以將型別的約束力帶入 JavaScript 中，並且可以利用這些型別的定義為編輯器帶來自動完成、提示等功能，改善開發體驗。

## 安裝 TypeScript

TypeScript 為 npm 套件，須要先安裝：

```bash
npm install typescript --save-dev
```

## 使用 TypeScript 開發

TypeScript 預設的編譯目標為 `ts` 的檔案，如果是在已有的 JavaScript 專案中加入 TypeScript 的話，我們可以將 `allowJs` 設定打開，讓 TypeScript 可以解析 JavaScript 。

因此我們下面的 `js` 程式碼：

```js
function greeter(person) {
  return 'Hello, ' + person;
}

let user = 'Jane User';
let theOtherUser = 'Peter User';

document.body.textContent = greeter(user, theOtherUser);
```

在使用 `npx tsc` 由 TypeScript 解析後，取得的結果如下：

```bash
% npx tsc
examples/greeter.js:7:43 - error TS2554: Expected 0-1 arguments, but got 2.

7 document.body.textContent = greeter(user, user);
                                            ~~~~

Found 1 error.
```

TypeScript 會判斷出參數的數量有誤，不過這並不會中斷建置，依然會產生目標代碼。

由於 TypeScript 是 JavaScript 的超集語言，所以其實可以直接將 `.js` 的副檔名改為 `.ts` ，這樣就可以不需要設定 `allowJs` ，也不需要轉換代碼，就可以使用 TypeScript 。

現在我們可以為變數加上型別：

```ts
function greeter(person: string) {
  return 'Hello, ' + person;
}

let user = [0, 1, 2];

document.body.textContent = greeter(user);
```

在參數（或變數）後加上 `: string` ，可以將其定義為字串型別，上面的例子中，由於變數 `user` 是個陣列，因此會被 TypeScript 認定為錯誤的型別。

## 本文重點整理

- TypeScript 在原本 JavaScript 的語法上增加了型別的定義，為原本無型別的 JavaScript 帶來型別的嚴謹性，增加撰寫程式碼時的安全性。

## 參考資料

- [TypeScript](https://www.typescriptlang.org/)
