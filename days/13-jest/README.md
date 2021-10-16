# Jest

使用 Jest 做單元測試。

## 介紹 Jest

Jest 是個 JavaScript 的測試框架，它提供了完整的單元測試環境，只要使用 Jest ，不用安裝其他工具，就可以有許多豐富的功能，例如：多樣的判斷方法、分析測試涵蓋率、 mock 功能與良好的錯誤提示訊息等。

Jest 可以測試的範圍涵蓋了 JavaScript 相關的技術，包含後端的 Node.js 與前端的 Vue 、 Angular 或 React ，是個完善的測試框架。

## 使用 Jest 的原因

隨著 TDD 的流行，單元測試在現在的程式開發中扮演著重要的角色，因此每個專案中都需要有個測試框架供開發者撰寫測試。

在 Jest 之前， JavaScript 要做測試時會需要合併多個工具（例如： Karma （執行器）+ Chai （斷言（ assertion ））+ Mocha （測試框架）+ Sinon （ Mock 工具） + Istanbul （測試覆蓋率）），需要花時間在各工具間的整合上。

Jest 作為完整的測試工具，涵蓋了所有測試相關的功能，因此只要使用 Jest 一套測試框架，就可以應付一個專案所需的測試需求，大幅減少配置時間。

## 使用 Jest

在使用 Jest 前需要先使用 npm 安裝：

```bash
npm install jest --save-dev
```

假設要測試的程式碼 `sum.js` 如下：

```js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

我們撰寫的測試 `sum.test.js` 如下：

```js
const sum = require('./sum');

it('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

執行 Jest ：

```bash
npx jest
```

Jest 預設會找出專案中與 `.test` 相符的檔案，並將其視為測試腳本執行，結果如下：

```bash
 PASS  ./sum.test.js
  ✓ adds 1 + 2 to equal 3 (1 ms)
```

Jest 會顯示出執行的測試名稱以及結果。

## Jest 的配置

Jest 所提供的預設配置，可以讓使用者不用自己設定就可以直接使用（ Zero Config ）。

如果想要自己配置的話，可以在配置檔 `jest.config.js` 中作配置：

```js
module.exports = {
  testMatch: ['**/(*.)unit.js']
}
```

上面的例子會將 Jest 找尋測試檔名的方式改為與 `unit.js` 相符的檔案。

Jest 的配置項可以在[官網中找到詳細的說明](https://jestjs.io/docs/configuration)。

## Jest 的指令

`jest` 指令是作為執行測試的方式：

```bash
# Run tests
npx jest
```

它有許多的選項可以讓使用者配置，例如下列的例子：

```bash
# Run tests related with minus.js
npx jest --findRelatedTests minus.js

# Watch files for changes and rerun tests related to changed files
npx jest --watch

# Output coverage
npx jest --coverage
```

全部的選項可以在[官網中找到詳細的說明](https://jestjs.io/docs/cli)。

## 測試的架構

Jest 的測試是使用全域方法 `it` （也可以使用 `test` ）來撰寫：

```js
const sum = require('./sum');

it('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

除了 `it` 外， Jest 還提供了[其他的全域方法](https://jestjs.io/docs/api)讓開發者使用，像是 `afterAll` 、 `beforeEach` 、 `describe` 等。

> 如果不想要隱性相依全域方法，可以使用 `import {describe, expect, test} from '@jest/globals'` 來導入。

### `beforeAll` 與 `afterAll`

`beforeAll` 與 `afterAll` 會在**所有測試**開始前與結束前叫用，可以在此設定測試時所需的資源（例如測試資料）。

### `beforeEach` 與 `afterEach`

除了 `All` 外， Jest 還提供了 `Each` 的方法， `beforeEach` 會在**每個測試**開始前叫用，而 `afterEach` 則會在結束前叫用。

### `describe`

`describe` 方法可以將多個測試視為同一個群組，讓 `after` 與 `before` 的觸發會限制在群組的內部。

以下面的例子為例：

```js
const { sum, minus } = require('./math');

beforeEach(() => {
  console.log('beforeEach')
})

afterEach(() => {
  console.log('afterEach')
})

describe('sum', () => {
  beforeEach(() => {
    console.log('sum beforeEach')
  })

  afterEach(() => {
    console.log('sum afterEach')
  })

  it('adds 1 + 2 to equal 3', () => {
    console.log('sum test')
    expect(sum(1, 2)).toBe(3);
  });
})

describe('minus', () => {
  beforeEach(() => {
    console.log('minus beforeEach')
  })

  afterEach(() => {
    console.log('minus afterEach')
  })

  it('minus 2 - 1 to equal 1', () => {
    console.log('minus test')
    expect(minus(2, 1)).toBe(1);
  });
})
```

在 `describe` 外側與內側個別設置了 `afterEach` 與 `beforeEach` ， `describe` 內側的只會在內部的測試叫用時觸發，外部的在不同的 `describe` 中都會觸發。

## 測試的斷言

測試的斷言是判斷一個測試是否正確的依據， Jest 提供了許多斷言的方式。

以下面的測試為例：

```js
it('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

- `expect(sum(1, 2))` ：將 `sum(1, 2)` 作為要判斷的值
- `toBe(3) ：值應該要是 3

所以當 `sum(1, 2)` 等於 3 的時候，測試通過，反之則失敗。

各個判斷方法可以在[官網中找到詳細的說明](https://jestjs.io/docs/expect)。

## Mock

當測試的對象有相依於其他套件時，我們的測試會因為其他套件而產生不確定性，如果其他套件更新，我們的測試可能不會通過，但這並不是我們測試對象的問題，因此應該將這個變因排除。

Jest 提供多樣的 mock 方式供使用者使用，下面舉幾個例子來說明。

我們有兩個模組 `join.js` 與 `combineString.js` ， `join.js` 內容如下：

```js
const _ = require('lodash')

function join(array, separator) {
  return _.join(array, separator)
}

module.exports = join
```

它引入了第三方庫 `lodash` ，並使用它的 `_.join` 方法實作本身的功能。

接著是 `combineString.js` ：

```js
const join = require('./join')

function combineString(array) {
  return join(array, ' ')
}

module.exports = combineString
```

`combineString.js` 使用 `join.js` 提供的 `join` 方法來合併字串。

寫完功能，我們來做測試，為了避免外部套件影響測試結果，必須要：

- Mock `join.js` 中的 `lodash`
- Mock `combineString.js` 中的 `join`

`join.test.js` 內容如下：

```js
const { it } = require('@jest/globals')
const _ = require('lodash')
const join  = require('./join')

jest.mock('lodash')

it('join by ,', () => {
  join(['a', 'b'], ',')
  expect(_.join.mock.calls.length).toBe(1)
  expect(_.join.mock.calls[0][0]).toEqual(['a', 'b'])
  expect(_.join.mock.calls[0][1]).toBe(',')
})
```

由於 `join` 的實作是由 `lodash` 來做的，因此測試時，我們只需要確認 `join` 的確有叫用 `_.join` ，並確保傳入的參數正確就行，因此採用的 Jest 的自動 mock 功能，在 `lodash` 的各個物件中插上可供判斷的資訊，並用這些資訊判斷叫用是否正確。

接著我們還看 `combineString.test.js` ：

```js
const { it } = require('@jest/globals')
const join = require('./join')
const combineString = require('./combineString')

jest.mock('./join')


it('combine string', () => {
  join.mockImplementationOnce(() => 'a b')
  const result = combineString(['a', 'b'])
  expect(result).toBe('a b')
})
```

`combineString` 使用 `join` 作為實作的方式，我們在測試時，不需要驗證 `join` 是否正確，只需要知道叫用 `join` 後會輸出期望的結果就行，因此使用 `mockImplementationOnce` 來定義期望的結果，並判斷是否在取得時有相同的結果。

Mock 是門大學問，要如何使用必須依照各種情境與測試目標來決定， Jest 的[官網提供了 Mock API 的詳細說明](https://jestjs.io/docs/mock-function-api)，同時也依照各種使用方式提供了[對應的 Guides](https://jestjs.io/docs/timer-mocks)，想要深入瞭解的可以參考這些資源。

## 總結

撰寫測試對於開發已經是不可或缺的一部分，它不僅可以確保程式運行的正確性，還可以作為規格給予共同開發者一個參考，因此，為專案選擇一個測試框架就是個必要的工作。

Jest 作為一個完整的 JavaScript 測試框架，它提供了單元測試會運用到的各式功能，為使用者提供便利又簡單的測試環境，以確保開發的品質。

## 參考資料

- [Jest](https://jestjs.io/)
