# 23 - Prettier - 格式化程式碼工具

制定程式碼格式規範對於可讀性來說是必須的，如果開發者寫程式時都有各自的格式規範，那整個專案的程式碼會十分混亂。

另一方面，為了取得開發者們對於格式的一致認同，我們必須花許多時間在討論與 review 這些格式規範上，進而浪費許多寶貴的開發時間。

## 不需要自己設定的格式化工具 - Prettier

Prettier 會幫助我們自動地格式化檔案內容，藉以減少在開發時還需自己手動格式化的麻煩。

Prettier 以[自己認為的最適解](https://prettier.io/docs/en/rationale.html)產生出一套格式規範，這個規範是預設的，要修改必須明確設定於配置檔上，這樣的設計是希望開發者們採用預設的規範，來減少對於格式規範討論所花費的時間。

Prettier 是一個 npm 套件，在執行 CLI 指令後使用配置檔中的設定對於指定檔案進行格式化。

Prettier 支援的語言十分豐富，有 JavaScript 、 CSS 、 HTML 與 Markdown 等（支援的語言列表請參照 [What is Prettier?](https://prettier.io/docs/en/index.html)），如果使用插件擴充，則可以支援更多其他的語言（插件列表請參照 [Plugins](https://prettier.io/docs/en/plugins.html#official-plugins) ）。

## 安裝 Prettier

Prettier 是個 npm 套件，要先安裝：

```bash
npm install prettier --save-dev --save-exact
```

> 由於 Prettier 的每個 release 版本都會對格式化的方式進行變動，因此要使用 `--save-exact` 避免更新版本。

## 使用 Prettier

要變更格式化規則時可以在專案根目錄中建立配置檔 `.prettierrc.js` ：

```js
module.exports = {
  singleQuote: true,
  htmlWhitespaceSensitivity: 'strict',
};
```

將不需要格式化的檔案或是目錄加入 `.prettierignore` 中：

```shell
package-lock.json
```

都設定完成後執行 Prettier 指令做格式化的動作：

```bash
npx prettier --write .
```

這個指令會將當前目錄與其子目錄中所有 Prettier 支援的檔案做格式化。

### 指令

`prettier` 有[多個指令](https://prettier.io/docs/en/cli.html)，其中常用的指令有 `--write` 與 `--check` 。

指令 `--write` 會執行格式化後直接複寫檔案，通常會在開發時與要 commit 前使用。

指令 `--check` 會執行格式是否與規範一致，不會做複寫的動作，通常是在 CI 檢查程式碼時使用。

### 指定檔案

針對指令的目標檔案的設定可以使用檔名、目錄名與 [glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) ，其判斷方式與順序如下：

1. 判斷是否為存在的檔案，如果是則將其視為處理對象。
2. 判斷是否為存在的目錄，如果存在則將目錄內 Prettier 所支援格式的檔案視為處理對象。
3. 其餘的都歸類為 glob ，用 [`fast-glob`](https://github.com/mrmlnc/fast-glob) 解析。

### 設定規則

Prettier 預設規範，不需要自行設定。

但如果想要修改預設規則時， Prettier 提供[許多規則供使用者配置](https://prettier.io/docs/en/options.html)。

配置的方式有配置檔與 CLI 參數兩種。

#### 配置檔

Prettier 使用 [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) 處理配置檔，有[多種配置格式可以選擇](https://prettier.io/docs/en/configuration.html)，使用者可以依照專案的習慣做設定。

每個規則設定都是一對規則名稱與設定值組合而成，以例子來說：

```js
module.exports = {
  singleQuote: true,
  htmlWhitespaceSensitivity: 'strict',
};
```

`singleQuote` 與 `htmlWhitespaceSensitivity` 為規則名稱， `true` 與 `'strict'` 為設定值。

#### CLI 參數

在執行 `prettier` 指令時，以參數帶入各個規則設定：

```bash
prettier --single-quote --html-whitespace-sensitivity strict --write .
```

範例中設定 `--single-quote` 與 `--html-whitespace-sensitivity` 參數以改變預設的格式規範。

### 排除特定對象

Prettier 預設不會處理 `node_modules` 目錄下的檔案，如果要將其他的檔案或是目錄排除的話，可以在專案的根目錄下建立名為 `.prettierignore` 檔案：

```shell
package-lock.json
```

`.prettierignore` 採用 [gitignore](https://git-scm.com/docs/gitignore#_pattern_format) 設定方式。

> 如果想要格式化 `node_modules` 目錄的內容，可以使用 `--with-node-modules` CLI 參數。

## 本文重點整理

- 每個人對於程式碼格式都有自己的偏好與習慣，如果格式不統一的話，可讀性會降低，而要統一格式又要花大量的時間討論，使開發的量能減弱。
- Prettier 作為一個程式碼格式化工具，它預設了一套最適解的格式規範，使用者不用去討論各種格式相關的規範，只要使用 Prettier 即可達成格式化的目的。
- 除了預設規範，使用者也可以藉由配置自行修改規則，並加上 `.prettierignore` 排除不需格式化的檔案。
- 設定完成後使用 npm 安裝 Prettier ，並使用 CLI 指令即可對程式碼做格式化的處理。
- Prettier 專注在格式化的作業上，給予使用者輕鬆格式化多種程式碼的能力，是個能使開發效率增加的便利工具。

## 參考資料

- [Prettier: What is Prettier?](https://prettier.io/docs/en/index.html)
- [Prettier: Why Prettier?](https://prettier.io/docs/en/why-prettier.html)
- [Prettier: Rationale](https://prettier.io/docs/en/rationale.html)
- [Prettier: Install](https://prettier.io/docs/en/install.html)
- [Prettier: Ignoring Code](https://prettier.io/docs/en/ignore.html)
- [Prettier: CLI](https://prettier.io/docs/en/cli.html)
- [Prettier: Options](https://prettier.io/docs/en/options.html)
- [Prettier: Configuration File](https://prettier.io/docs/en/configuration.html)
