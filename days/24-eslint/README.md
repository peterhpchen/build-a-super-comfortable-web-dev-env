# 24 - ESLint - Lint JavaScript 程式碼

使用程式語言實作功能時，一百個人寫就會有一百種不同的程式碼，雖然都可以正常運作，但有些寫法（例如全域變數）會使系統結構脆弱，容易造成錯誤。

為了避免這些錯誤，開發團隊會在開發的過程中導入 Code Review 以減少問題的產生，但是對於程式碼量龐大的大型專案來說， Code Review 所花費的時間巨大，間接影響了開發的進度，使得有些團隊為了趕時間而犧牲了 Code Review 的時間，這使得程式碼的品質日益衰退，最後無可挽回。

## 讓 JavaScript 代碼更漂亮 - ESLint

![favicon](./assets/favicon.512x512.png)

ESLint 會依照使用者配置的設定靜態分析 JavaScript 程式碼，並將可能的問題輸出讓使用者可以予以修正。

為了減少 Code Review 的時間， ESLint 使用靜態分析程式碼，將可能的問題抓出，可以自動修復的就覆寫，不能的就輸出訊息提示開發者，開發者可以依照提示做對應的討論及修改。

ESLint 除了本身的規範外，它可以用插件的方式擴充功能，使它辨識客製的規範，也可以將其擴充至不同的語言（例如： TypeScript 、 Vue ）。

撇開商業邏輯的錯誤，程式碼中關於語意及語法的問題大部分都是可以被 ESLint 獲取的，因此使用此類工具可以減少大量的 Code Review 時間，讓團隊可以針對商務邏輯做討論。

## 安裝 ESLint

ESLint 為 npm 套件，因此要使用 npm 安裝：

```bash
npm install eslint --save-dev
```

> ESLint 也可以裝於 global ，但是為了與各個 plugins 與配置版本匹配，建議安裝於 local 。

## 使用 ESLint

安裝完成後，可以初始化 ESLint ：

```bash
> npx eslint --init
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript
Checking peerDependencies of eslint-config-airbnb-base@latest
The config that you've selected requires the following dependencies:

eslint-config-airbnb-base@latest eslint@^5.16.0 || ^6.8.0 || ^7.2.0 eslint-plugin-import@^2.22.1
✔ Would you like to install them now with npm? · No / Yes
Installing eslint-config-airbnb-base@latest, eslint@^5.16.0 || ^6.8.0 || ^7.2.0, eslint-plugin-import@^2.22.1

added 75 packages, and audited 191 packages in 4s

43 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Successfully created .eslintrc.js file in /Users/PeterChen/Documents/code/build-a-super-comfortable-web-dev-env/days/05-eslint/examples/example-eslint
```

ESLint 的初始程序會採問答的方式取得使用者期望的配置方式，然後將相關套件安裝並產生對應的配置檔 `.eslint.{js,yml,json}` （配置檔格式依照選擇產生）供使用者使用。

初始完成後，我們使用下面的程式測試 ESLint ：

```js
var foo = 'foo';

console.log(foo);
```

執行 ESLint ：

```bash
> npx eslint samples/sample.js

/Users/PeterChen/Documents/code/build-a-super-comfortable-web-dev-env/days/05-eslint/examples/example-eslint/samples/sample.js
  1:1  error    Unexpected var, use let or const instead  no-var
  3:1  warning  Unexpected console statement              no-console

✖ 2 problems (1 error, 1 warning)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

ESLint 會輸出程式碼的優化訊息提示開發者改進寫法，另外 ESLint 也提供了自動修正的指令：

```bash
npx eslint samples/sample.js --fix
```

這個指令會將可以自動修復的問題覆寫至原檔中。

想要客製化規則時需要在配置檔中的 `rules` 屬性做設定，例如我們想要將上例的規則做調整：

```js
module.exports = {
  // ...
  rules: {
    'no-var': 'warn',
    quotes: ['error', 'double'],
  },
};
```

- `no-var` ：層級調整為 `warn`
- `quotes` ：層級調整為 `error` ，並改為雙引號（ `double` ）

依照規則的調整， ESLint 檢查的規則也會隨之變化：

```js
> npx eslint samples/sample.js

/Users/PeterChen/Documents/code/build-a-super-comfortable-web-dev-env/days/05-eslint/examples/example-eslint/samples/sample.js
  1:1   warning  Unexpected var, use let or const instead  no-var
  1:11  error    Strings must use doublequote              quotes
  3:1   warning  Unexpected console statement              no-console

✖ 3 problems (1 error, 2 warnings)
  1 error and 1 warning potentially fixable with the `--fix` option.
```

### 規則的設定

ESLint 對於規則的設定有兩種方式，字串及陣列。

字串的設定是改變規則的層級：

```js
module.exports = {
  // ...
  rules: {
    'no-var': 'warn',
  },
};
```

層級分為：

- `off` 或 `0` ：關閉此規則
- `warn` 或 `1` ：將此規則設為警告層級
- `error` 或 `2` ：將此規則設為錯誤層級

當設定為陣列時，可以設定兩個元素 `[層級, 選項]` ：

```js
module.exports = {
  // ...
  rules: {
    quotes: ['error', 'double'],
  },
};
```

- 第一個元素為層級設定，與字串設定方式相同
- 第二個元素為選項設定，依照各個 `rule` 的設定方式配置，以 [`quotes`](https://eslint.org/docs/rules/quotes#options) 為例，可以設定字串值 `double` 、 `single` 與 `backtick` 來決定引號

### 規則

ESLint 提供[許多的規則](https://eslint.org/docs/rules/)，如果要使用者自己一個個規則做設定會十分麻煩，因此 ESLint 設計了預配置的規則包，讓各家規範可以將其設定的規則放於 npm 套件上供使用者下載，以 [airbnb 規範](https://github.com/airbnb/javascript)為例，它提供名為 `eslint-config-airbnb-base` 的套件，在 ESLint 的配置檔中就可以用 `extends` 引入此規則包：

```js
module.exports = {
  extends: ['airbnb-base'],
};
```

這樣一來 `airbnb` 的相關規範都會被 ESLint 識別並運行，使用者依然可以使用 `rules` 修改預設的規則。

## 本文重點整理

- 在開發時，為了確保程式碼的質量而需要引入 Code Review 來檢討與優化程式碼，以避免發生錯誤，而在語言的寫法方面，大部分的問題都是不斷重複卻很容易識別的，這使得 Code Review 的時間會浪費在這些問題上。
- ESLint 作為規範 JavaScript 語言寫法的規範工具，提供自動化的靜態掃描，以檢查出各種語法相關的問題以及進行修正，大量地節省時間與問題發生的頻率，對於開發來說是不可或缺的工具。
- 使用初始化的指令，可以依照問答完成 ESLint 的配置檔設定。
- 依據專案的需求，可以自己配置設定以符合專案的運作。

## 參考資料

- [ESLint: Getting Started with ESLint](https://eslint.org/docs/user-guide/getting-started)
- [ESLint: Configuration Files](https://eslint.org/docs/user-guide/configuring/configuration-files#extending-configuration-files)
- [ESLint: Rules](https://eslint.org/docs/user-guide/configuring/rules)
