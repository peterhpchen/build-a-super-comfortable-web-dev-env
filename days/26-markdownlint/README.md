# 26 - MarkdownLint - Lint Markdown 文件

Markdown 格式不需要編輯器添加任何的支援就可以撰寫，利用簡單的語法就可以定義各種樣式，是現今在寫技術文件時的主流文件格式。

但是自由的寫作方式卻十分容易造成樣式不一致的問題。

## 使 Markdown 的格式一致化 - Markdownlint

![markdownlint](./assets/markdownlint-128.png)

Markdownlint 是個用以規範 Markdown 寫法的工具，最初是由 [Ruby 開發](https://github.com/markdownlint/markdownlint)而成，現在也有了 [Node.js 的版本](https://github.com/DavidAnson/markdownlint)，這裡會使用 Node.js 版本做說明。

Node.js 版本的 Markdownlint 所提供的 API [被許多工具使用](https://github.com/DavidAnson/markdownlint#related)， 我們使用 [markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli) 作為執行的媒介。

它會使用其內建的規則加以限制來達到一致的寫法規範。

## 安裝 Markdownlint

markdownlint-cli 是個 npm 套件，需要先行安裝：

```bash
npm install markdownlint-cli --save-dev
```

## 使用 Markdownlint

使用配置檔 `.markdownlint.js` 決定要使用哪些規則：

```js
module.exports = {
  default: false, // excludes all rules
  MD001: true, // enables rule MD001
  MD003: { style: 'atx_closed' }, // set parameter style of rule MD003 to atx_closed
  'first-line-heading': true, // enables alias first-line-heading
  atx_closed: true, // enables tag atx-closed
};
```

在 `.markdownlintignore` 中加入想要排除的檔案或目錄：

```shell
node_modules
```

設定完成後執行 Markdownlint ：

```bash
npx markdownlint --config .markdownlint.js --fix .
```

這個指令會依照 `.markdownlint.js` 所設定的方式規範專案下所有的 Markdown 檔案。

### 指令

`markdownlint` 使用 `--fix` 時，會將所有可以修正的問題複寫至原檔案，對於無法修正的則會輸出訊息。

### 指定檔案

`markdownlint` 在指令後可以帶入檔名、目錄名或是 [glob](https://github.com/isaacs/node-glob/blob/master/README.md#glob-primer) 作為作用範圍的設定。

使用 glob 時請用引號夾住，因在 Bash 中，會將 glob 轉為多個檔案並以空白區隔，例如 `*.md` 會被轉為 `a.md b.md ...` ，對於只讀取單一參數的選項或是指令會導致錯誤發生，這時使用 `'*.md'` 則可以避免問題。

### 設定規則

`markdownlint-cli` 預設情況下會採用所有規則。

想要自己修改規則時可以使用配置檔來設定，配置檔的[支援格式有許多種](https://github.com/igorshubovych/markdownlint-cli#configuration)，依照專案習慣使用即可。

`markdownlint-cli` 預設會找尋當前目錄中是否有 `.markdownlint.json` 、 `.markdownlint.yaml` 或 `.markdownlint.yml` ，或是在當前目錄以及父目錄中尋找 `.markdownlintrc` 作為配置檔。除了這些外其他任何合法的 JSON 、 JSONC 、 JS （使用 `module.exports` 導出配置）或 YAML 格式的檔案都可以透過 `--config` 設定為配置檔。

每個規則都為一對名稱與值組成：

```js
module.exports = {
  default: false, // excludes all rules
  MD001: true, // enables rule MD001
  MD003: { style: 'atx_closed' }, // set parameter style of rule MD003 to atx_closed
  'first-line-heading': true, // enables alias first-line-heading
  atx_closed: true, // enables tag atx-closed
};
```

名稱可以是 `default` 、 rule 、 alias 或 tags ：

- `default` ：特殊屬性，設為 `true` 會啟用所有規則，反之設為 `false` 則關閉所有規則
- rule ：規則名稱，對應至[各個規則](https://github.com/DavidAnson/markdownlint#rules--aliases)，像是範例中的 `MD001` 與 `MD003`
- alias ：規則別稱，對應至各個規則的別名，例如範例中的 `first-line-heading` 是[規則 `MD041` 的別名](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md041)
- tags ：作用的標籤，對應至[各規則的所屬標籤](https://github.com/DavidAnson/markdownlint#tags)，可以將其視為規則的群組，例如範例中的 `atx_closed` 包括了 `MD020` 與 `MD021` 兩個規則

規則的值可以是布林或是物件：

- 布林：是否啟用此規則
- 物件：配置規則設定

### 排除檔案

`markdownlint-cli` 採用 `.gitignore` 的設定來排除檔案，它會檢查當前目錄是否有 `.markdownlintignore` 以用作排除檔案的依據。

## 與 VS Code 整合

首先，安裝 Markdownlint 插件：

```bash
code --install-extension davidanson.vscode-markdownlint
```

如此一來， Markdownlint 插件會使用設定檔 `.markdownlint.js` 的配置，在編輯器上顯示各種提示。

接著我們要調整配置，使得檔案在儲存時執行 Markdownlint 修復檔案內容：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.markdownlint": true
  }
}
```

### 將設定存於專案中

為了讓每次新開此專案的使用者都可以使用到 Markdownlint ，我們可以將設定配置在 `.vscode` 目錄中。

首先，我們需要紀錄要安裝的插件，在 `.vscode/extensions.json` 中：

```json
{
  "recommendations": ["davidanson.vscode-markdownlint"]
}
```

另外相關的設定也可以在 `.vscode/settings.json` 中紀錄：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

這樣一來，開啟此專案的新使用者就可以使用插件推薦清單安裝 Markdownlint ，並將相關的配置做設定。

## 本文重點整理

- Markdown 作為文件格式，提供了許多語法來設定各種豐富的樣式，但由於其極高的自由度，使得每個人在使用 Markdown 寫文件時總會有自己的一套方法，這造成了寫法不一致的問題。
- Markdownlint 作為 Markdown 格式的規範工具，提供了許多有用的規則，使用者利用這些規則來確保不同 Markdown 文件的一致性。
- 如果想要自己設定規則也可以建立配置檔做相關的設定，並利用 `.markdownlintignore` 檔案的設定排除特定的檔案。
- 使用 VS Code 的 Markdownlint 插件，可以在儲存時啟動 Markdownlint 對 Markdown 做 lint。

## 參考資料

- [GitHub: markdownlint/markdownlint](https://github.com/markdownlint/markdownlint)
- [GitHub: markdownlint/markdownlint Rules](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md)
- [GitHub: DavidAnson/markdownlint](https://github.com/DavidAnson/markdownlint)
- [GitHub: igorshubovych/markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli)
