# 25 - Stylelint - Lint CSS 程式碼

樣式表雖然較 JavaScript 單純，但隨著規則定義越來越多，樣式表還是會因複雜的結構與繁雜的規則配置而使得可讀性降低，甚至造成錯誤。

## 讓 CSS 代碼更漂亮 - stylelint

stylelint 使開發者可以規範樣式寫法，除了增加可讀性外，也可以避免部分在運行中可能發生的錯誤。

除了純樣式表（ `.css` ）外， stylelint 也可以作用於內嵌在 HTML 、 markdown 的樣式或是 CSS-in-JS 中。而除了標準的 CSS 外，透過 Plugins 也可以支援 SCSS 、 Sass 、 Less 或是 SugarSS 等不同的樣式語言。

stylelint 利用靜態分析解析樣式並將可能的問題拋出，並修復部分的問題，如此一來可以降低錯誤的發生也可以減少 code review 所花費的時間。

## 安裝 stylelint

stylelint 為 npm 套件，須要先安裝：

```bash
npm install stylelint --save-dev
```

## 使用 stylelint

安裝完成後，由於 stylelint 一定要配置設定檔，因此要建立檔案 `stylelint.config.js` ：

```js
module.exports = {
  rules: {
    'declaration-block-single-line-max-declarations': 1,
    'block-opening-brace-space-before': 'always',
  },
};
```

> 配置檔除了可以是 `.js` 外，還可以是 `.json` 、 `.yaml` 等。

stylelint 預設不設定任何規則，需要自己手動配置，因此要加上 `rules` 設定才會依照設定的規則做檢查。

現在使用下面這個範例檢驗 stylelint 效果：

```style
a{top:0;--height:10px;color:pink; }
```

執行 stylelint ：

```bash
> npx stylelint samples/style.css

samples/style.css
 1:1  ✖  Expected single space before "{"      block-opening-brace-space-before
 1:2  ✖  Expected no more than 1 declaration   declaration-block-single-line-max-declarations
```

依照規則每一行只能有一個樣式定義，並且至少要在 `{` 留有一格空白，由於範例違反了規則，因此 stylelint 會輸出訊息。

而有些規則是可以被 stylelint 自動修復的，例如 `block-opening-brace-space-before` ，像這類規則可以使用 `--fix` 來覆寫原檔直接修復問題：

```bash
npx stylelint --fix samples/style.css
```

詳細的規則說明可以在 [stylelint 的 User guide 中](https://stylelint.io/user-guide/rules/list)找到。

### 使用預置的規則包

stylelint 的規則眾多，一個一個設定十分耗時，因此 stylelint 在配置中提供 `extends` 屬性讓使用者設定已經預設規則設定的規則包，可以此為基準再使用 `rules` 客制規則。

規則包為 npm 套件，需要先行安裝，以 `stylelint-config-standard` 為例：

```bash
npm install stylelint-config-standard --save-dev
```

安裝完成後使用 `extends` 設定：

```js
module.exports = {
  extends: 'stylelint-config-standard',
  // ...
};
```

如此以來就可以直接使用 `stylelint-config-standard` 中配置的規則了。

### 擴充 stylelint 的規則

stylelint 提供了許多的規則，但有時我們會需要增加自己所需的規則，為了這個需求， stylelint 提供 plugin 的設計，讓我們可以藉由 plugin 讓 stylelint 擁有擴充規則的能力。

以 `stylelint-order` 為例，它讓我們可以排序樣式表中的規則。

plugin 也都是 npm 套件，因此先安裝：

```bash
npm install stylelint-order --save-dev
```

然後使用 `plugins` 設定：

```js
module.exports = {
  plugins: ['stylelint-order'],
  rules: {
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'rules',
      'at-rules',
    ],
    // ...
  },
  // ...
};
```

可以看到 `stylelint-order` 讓 stylelint 多了 `order/order` 的規則，並且可以做相關的設定。

### 規則的設定

stylelint 的規則設定會是字串或是陣列，分為 primary 與 secondary 兩個選項。

primary 選項是必要的，它用來設定規則的定義，其值對應規則的設定參數：

```js
module.exports = {
  rules: {
    'declaration-block-single-line-max-declarations': 1,
    'block-opening-brace-space-before': 'always',
  },
};
```

`declaration-block-single-line-max-declarations` 的 `1` 與 `block-opening-brace-space-before` 的 `always` 都是 primary 選項。

在有些規則中，需要設定額外的配置， stylelint 提供陣列的方式讓使用者可以設定 secondary 選項：

```js
module.exports = {
  rules: {
    'selector-max-type': [0, { ignore: ['child', 'descendant', 'compounded'] }],
  },
};
```

例子中的 `{ ignore: ['child', 'descendant', 'compounded'] }` 就是 secondary 選項。

## 本文重點整理

- 隨著專案規模的擴大，樣式表會越趨龐大，許多的規則混雜在列表中，造成開發時的可讀性降低，在各個設定的影響下也可能造成樣式的錯誤。
- stylelint 利用靜態分析，幫助使用者在開發時就找出問題，並優化可讀性，使得開發效率增加，在生產環境下也可以減少錯誤的產生。
- 設定預設的規則包來減少配置的花費。
- 可以在配置檔中覆寫原本的設定，達到客製的效果。

## 參考資料

- [stylelint: Getting Started](https://stylelint.io/user-guide/get-started)
- [stylelint: Configuration](https://stylelint.io/user-guide/configure)
- [stylelint: About rules](https://stylelint.io/user-guide/rules/about)
