# Cypress

使用 Cypress 做 E2E 測試。

## 介紹 Cypress

Cypress 是個 npm 套件，它幫助使用者直接使用瀏覽器來做前端相關的測試。

藉由使用者所撰寫的腳本， Cypress 會依照腳本的內容開啟瀏覽器，針對特定的頁面照著腳本中的設定執行動作，藉以驗證整個系統的正確性。

為了方便使用者檢視結果與除錯， Cypress 所提供的 Dashboard 可以讓使用者操作想要執行的測試，以及 Time Travel 的功能，讓使用者可以退回任何動作之前，也可以藉由截圖與錄影的功能來紀錄測試的過程，使除錯更加容易。

在腳本的撰寫上，使用者可以配合測試需求，使用 Cypress 提供的 mock 方法，來避免現實的情況影響到測試的結果。

## 使用 Cypress 的原因

與單元測試的單一目標導向不同， E2E （端對端）測試著重於整個系統的使用，我們會使用 E2E 測試來確保使用者的需求被**合理的實現** ，因此一個 E2E 測試中，會包含多個元件、多個模組、甚至是多個系統的合作。

E2E 測試可以直接以人為操作的方式進行，系統的開發者會撰寫測試手冊，交由測試人員，直接以人工操作系統的方式驗證項目的正確性。當然，這是個不切實際的測試方式，其所耗費的人力與時間都是很可怕的。

為了解決測試花費巨大的問題，基於 E2E 測試的框架誕生了，使用這些框架時，開發者只要將原本測試手冊上的步驟轉化為測試腳本，測試框架就可以藉由腳本去執行各種不同的測試，並以此判斷系統的運作是否正常。

與其他 E2E 測試框架（例如： Selenium ）將測試跑在獨立的程序上不同， Cypress 直接將測試跑在瀏覽器上，這樣的做法使測試者可以更直接的觀測到應用程式實際執行的模樣，而且由於 Cypress 可以直接控制瀏覽器，所以可以達到更佳細部的測試效果。

## 安裝 Cypress

在使用前，需要使用 npm 安裝 Cypress ：

```bash
npm install cypress --save-dev
```

## 使用 Cypress

在撰寫測試時，可以開啟 GUI ，讓我們可以更直覺地看到測試的狀態：

```bash
npx cypress open
```

> 如果下指令時還沒有設定 Cypress ，它會自動把範例程式碼給建立起來，供使用者參考。

 這時 Cypress 會開啟一個視窗，上面會顯示所有的測試項目，使用者可以決定要執行哪個測試。

點擊想要執行的測試後， Cypress 會進入執行測試的畫面，這時左邊會是各個測試的列表，按進去後，會顯示各步驟，我們可以藉由點擊測試中的不同步驟，來檢視當時的畫面。

在撰寫測試時，使用 GUI 是方便的，但如果是在提交前的驗證測試的時候，我們就只要確認測試通過即可，不需要看到畫面，這時可以使用 `run` 指令在不開啟 GUI 的情況下執行測試：

```bash
npx cypress run
```

## 撰寫測試腳本

Cypress 使用 Mocha 作為測試框架，因此在撰寫測試的執行時，會使用到 Mocha 相關的方法。

```js
describe('example to-do app', () => {
  beforeEach(() => {
    // ...
  });

  it('displays two todo items by default', () => {
    // ...
  });

  it('can add new todo items', () => {
    // ...
  });

  context('with a checked task', () => {
    beforeEach(() => {
      // ...
    });

    it('can filter for uncompleted tasks', () => {
      // ...
    });

    it('can filter for completed tasks', () => {
      // ...
    });
  });
});
```

- `describe()` ：數個測試的 Group ，與 `context()` 功能相同。
- `beforeEach()` ：在各測試開始前執行的程式，如果在 `describe()` 或 `context()` 內部，則只會對內部的測試有用。
- `it()` ：測試的內容。

> 其他 Mocha 的方法可以參考 Cypress 的[官網說明](https://docs.cypress.io/guides/references/bundled-tools#Mocha)。

腳本的寫法圍繞在一個名為 `cy` 的全域物件上，它囊括了全部的腳本方法。由於 `cy` 的方法很多，我們使用一個測試情境來說  明測試的撰寫方式。

我們要測試 ToDo 應用程式（ <https://example.cypress.io/todo> ），確認系統的增加項目功能正常，因此我們會得到下面的步驟：

1. 開啟 ToDo 應用程式
2. 在建立項目的輸入框中輸入項目名稱並送出
3. 確認項目已經新增至列表中

這項測試只有三個步驟，腳本的寫法如下：

```js
it('can add new todo items', () => {
  const newItem = 'Feed the cat';

  // 1. 開啟 ToDo 應用程式
  cy.visit('https://example.cypress.io/todo');

  // 2. 在建立項目的輸入框中輸入項目名稱並送出
  cy.get('[data-test=new-todo]').type(`${newItem}{enter}`);

  // 3. 確認項目已經新增至列表中
  cy.get('.todo-list li')
    .should('have.length', 3)
    .last()
    .should('have.text', newItem);
});
```

腳本中出現的方法說明如下：

- `visit` ：開啟 URL 。
- `get` ：取得 DOM 元素。
- `type` ：在 DOM 元素中輸入資料。
- `should` ：判斷斷言結果
- `last` ：最後一個 DOM 元素。

> 如果同一個頁面有多個測試項目時，可以將 `visit` 放於 `beforeEach()` ，減少撰寫的程式碼。

## 自定義方法

有時會有重複的腳本一直出現，例如**登入**就是大部分的後台在進入前需要執行的動作，為了避免重複的程式碼， Cypress 提供了自定義的功能，我們可以將一個個腳本定義為方法，並在需要使用時叫用。

自定義的方法撰寫在 `cypress/support/commands.js` 中：

```js
Cypress.Commands.add('typeLogin', (user) => {
  cy.get('input[name=email]').type(user.email);

  cy.get('input[name=password]').type(user.password);
});
```

上面的例子新增了 `typeLogin` 的方法，在測試中直接使用 `cy.typeLogin()` 執行自訂方法：

```js
cy.typeLogin({ email: 'fake@email.com', password: 'Secret1' });
```

## 總結

E2E 測試確保使用者在操作系統時的正確性， Cypress 提供了一套完整的測試方式，並且額外增加如截圖、錄影與 Time Travel 等便於除錯的功能，讓開發者可以很輕鬆的撰寫出期望的測試。

## 參考資料

- [Cypress Guides](https://docs.cypress.io/guides/overview/why-cypress)
- [Cypress API](https://docs.cypress.io/api/table-of-contents)
