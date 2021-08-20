# Hygen

使用 Hygen 作為專案的程式碼產生器。

## 介紹 Hygen

Hygen 是個 npm 套件，它是個程式碼產生器，可以依照模板產生對應的程式碼檔案。

在使用 Hygen 作為產生器前，我們要編輯程式碼生成時參考的模板檔案，完成模板的編輯後，使用 Hygen 的 CLI 叫用對應的模板，並帶入模板所需的參數，藉此就可以完成程式碼的產生。

## 使用 Hygen 的原因

在開發時，我們總是需要為系統加入新的功能，這意味著專案中的檔案會逐漸增多，雖然依照要擴充的功能不同，要加入的檔案類型也會有些許的不同，但是對於檔案的命名以及檔案內部的大框架要盡量地保持一致，有了一致性，才能確保程式碼的品質。

依照習慣的不同，開發者會使用不一樣的方式去新增相同功能的檔案，使得同個專案中有多個寫法，造成維護的困難。

以程式碼產生器取代手動建立程式碼，不僅可以保證程式碼的一致性，也可以減少因手動建立所耗費的時間與錯誤的發生率。

## 使用 Hygen

Hygen 為 npm 套件，需要先使用 npm 安裝：

```bash
npm install hygen --save-dev
```

接著建立模板，在 `_template/generator/new` 中加入模板檔案 `hello.ejs.t` ：

```yaml
---
to: app/hello.js
---
const hello = `
Hello!
This is your first hygen template.

Learn what it can do here:

https://github.com/jondot/hygen
`

console.log(hello)
```

執行 hygen 指令建立程式碼：

```bash
> npx hygen generator new

Loaded templates: _templates
       added: app/hello.js
```

執行完成後，可以看到 `app` 目錄中多了一個以模板 `hello.ejs.t` 產出的檔案 `hello.js` 。

上述就是使用 Hygen 最簡單的範例，接著我們會依序介紹**指令使用方式**、**模板編輯方式**與**配置產生器**。

## 指令使用方式

Hygen 的指令圍繞在兩個概念， `GENERATOR` 與 `ACTION` ，以前面的例子來說：

```plaintext
npx hygen generator new
          ^         ^--- ACTION
          |------------- GENERATOR
```

- `GENERATOR` 對應 `_template` 目錄下的第一層（例子中的 `generator` 目錄）
- `ACTION` 對應 `_template` 目錄下的第二層（例子中的 `new` 目錄）

在執行指令後， Hygen 會將 `GENERATOR` 與 `ACTION` 對應的模板帶入參數執行建置程式碼。

### 指令參數

`hygen` 指令有個 `--dry` 參數：

```bash
> npx hygen generator new --dry
(dry mode)
Loaded templates: _templates
       added: app/hello.js
```

它會開啟 `dry mode` ，在此模式下， Hygen 依然會執行並產生程式碼，但是**不會儲存**，用在測試的時候使用。

除了 `--dry` 外，其他的參數會作為變數傳入模板內。

舉個例子，我們將 `hello.ejs.t` 修改成下面這樣：

```yaml
---
to: app/<%= name %>.js
---
const hello = `
Hello <%= name %>!
This is your <%= nth %> hygen template.

Learn what it can do here:

https://github.com/jondot/hygen
`

console.log(hello)
```

這模板引用了變數 `name` 與 `nth` ，現在我們在執行指令時帶入參數：

```bash
> npx hygen generator new world --nth second

Loaded templates: _templates
       added: app/world.js
```

- `world` ：與 `--name world` 有同樣的效果，由於參數 `name` 十分常用，因此 Hygen 讓我們可以少輸入 `--name` 。
- `--nth second` ：設定參數 `nth` 為 `second` 。

可以看到檔名依照參數的設定變為 `world.js` ，另外檔案也會依照參數來生成內容：

```js
const hello = `
Hello world!
This is your second hygen template.

Learn what it can do here:

https://github.com/jondot/hygen
`

console.log(hello)
```

## 模板編輯方式

Hygen 的模板分為 **frontmatter** 與 **body** 兩部分：

```yaml
---                                     <--- frontmatter
to: app/<%= name %>.js
---
const hello = `                         <--- body
Hello <%= name %>!
This is your <%= nth %> hygen template.

Learn what it can do here:

https://github.com/jondot/hygen
`

console.log(hello)
```

### Frontmatter

frontmatter 區塊上下的 `---` 與 ejs 區塊做區隔，使用者可以使用各屬性設置模板的 metadata 。

Hygen 提供[許多 frontmatter 屬性](http://www.hygen.io/docs/templates#all-frontmatter-properties)，上例的 `to` 就是其中一個 forntmatter 的屬性，它表示程式碼檔案要**放置的目標位置與檔名**。

frontmatter 區塊也可以使用參數來配置各種屬性：

```yaml
---
to: app/<%= name %>.js
---
```

上例就使用參數 `name` 來設定檔名，這樣的方式可以增加產生器的彈性，使其更符合需求。

### Body

Body 區塊設定程式碼的產生內容，它與前面的 frontmatter 區塊可以使用 [EJS 模板語法](https://ejs.co/)來設置，像是 `<%= name %>` 就屬於 EJS 的語法。

在經由 EJS 處理後， Body 區塊會變為實際的程式碼內容，並被存於目標檔案中。

## 配置產生器

產生程式碼的方式，除了前面說到的直**接輸入參數**外， Hygen 另外提供交互問答的方式讓我們建立程式碼。

### 使用交互問答設定程式碼內容

要設定交互問答，可以在 `ACTION` 目錄中建立 `prompt.js` ：

```js
module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Name:',
    validate(value) {
      if (!value.length) {
        return 'New must have a name.'
      }
      return true
    },
  },
]
```

這個由 COMMON.JS 模組導出的陣列，設定各步驟的問答方式， Hygen 使用 [Enquirer](https://github.com/enquirer/enquirer#prompt-options) 來提供問答的配置，屬性 `name` 表示此問答結果傳入的參數名稱，我們可以用這名稱的變數在模板內使用這個回答的值。

以下面的模板來說：

```yaml
---
to: <%= name %>/README.md
---

# <%= name %>
```

指令的執行過程如下：

```bash
✔ Name: · hello
```

對於 `name` 的問答輸入 `hello` ，模板內的 `name` 就會是 `hello` 。

> 如果有傳入參數，就算是有設定問答也會被忽略，以上面的例子來說，如果執行指令 `npx hygen generator new --name hello` ，那此問答就會被忽略。

## 總結

程式碼產生器既可以統一程式碼的架構與檔案名稱，也可以節省手動建檔的花費，讓開發更為輕鬆。

## 參考資料

- [Hygen](https://www.hygen.io/)
- [GitHub: jondot/hygen](https://github.com/jondot/hygen)
- [EJS](https://ejs.co/)
