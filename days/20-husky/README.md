# 20 - Husky - Git Hooks 工具

為了維護專案程式碼的品質，我們需要對提交的代碼做各式的檢查（例如： Lint 、 Format 、 Unit Testing 等），而檢查的時機點就位於各個 Git hooks 上。

Git hooks 讓開發者可以在對應的 hook 註冊腳本， Git 觸發這些 hooks 時就會執行這些腳本去做對應的處理。

## Node.js 的 Git Hooks 工具 - Husky

Husky 是個 npm 套件，它讓使用者可以用直覺的操作方式註冊各式 hooks 事件，將各式的處理配置於各個 hooks 中。

在安裝完成後於 `.husky` 目錄下設定對應的 Git hook 名稱檔案（例如： `pre-commit` 、 `commit-msg` ），在 Git hooks 觸發時就會執行對應的指令。

## 安裝 Husky

Husky 提供了一個初始化的指令 `husky-init` ，在專案的 `package.json` 目錄下指令：

```bash
npx husky-init && npm install
```

`husky-init` 會修改 `package.json` ：

```json
{
  "devDependencies": {
    "husky": "^7.0.0"
  },
  "scripts": {
    "prepare": "husky install"
  }
}
```

它會加上 Husky 的相依並在 `prepare` script 中加上 `husky install` ，這樣一來在 `npm install` 運行時就會執行 Husky 的安裝程序。

## 使用 Husky

Husky 的使用方式是為各個 Git Hooks 腳本加入想要執行的指令， Husky 就會在對應的時機觸發此腳本執行。

要在特定 Git Hook 加入指令時可以下 `husky add` 指令：

```bash
npx husky add .husky/pre-commit 'echo "hello"'
```

上面的指令會在 `.husky` 目錄中建立一個名為 `pre-commit` 的檔案，其內容為：

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "hello"
```

當名為 `pre-commit` 的 Git hook 觸發時，這個檔案的指令就會被執行，它會在畫面上顯示字串 `hello` ：

```bash
> git commit -m 'add husky script pre-commit'
hello
# ...
```

> 也可以直接在 `.husky` 目錄中加上對應的 Git Hook 腳本，但要記得加上 `. "$(dirname "$0")/_/husky.sh"` 。

各 Git Hooks 的名稱可以在 「[Git Documentation: Customizing Git - Git Hooks](https://git-scm.com/book/zh-tw/v2/Customizing-Git-Git-Hooks)」 中找到，依照需求對特定的 Hooks 增加指令。

## 客製目錄

Husky 的預設配置目錄為 `.husky` ，如果要客製配置目錄（例如： `.config/husky` ）的話，會需要給予 `husky install` 配置目錄的路徑：

```json
{
  "scripts": {
    "prepare": "husky install .config/husky"
  }
}
```

另外因為 Husky 預設執行 `husky install` 的目錄要與 `.git` 相同，所以當 `.git` 與 `package.json` 的目錄不同時，需要先使用 `cd` 指令移動當前位置再執行 `husky install` 。

以下面的例子來說：

```plaintext
project
|- .git
|- /front
  |- .husky
  |- package.json
```

`project/front/package.json` 的 `prepare` script 應該要如下：

```json
{
  "scripts": {
    "prepare": "cd .. && husky install front/.husky"
  }
}
```

指令要先向上移一層，並且由於配置目錄 `.husky` 在 `project/front/.husky` ，對上移一層再執行的 `husky install` 指令來說並非預設的目錄，因此要特別指定 `front/.husky` 。

非預設的配置目錄，其執行的腳本都需要重新設定當前的位置：

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

cd front
echo "hello"
```

上面的範例是腳本 `project/front/.husky/pre-commit` ，由於當前目錄位於 `project` ，因此需要重新指到 `.husky` 所在的目錄 `front` 中。

為了讓修改生效，在編輯完 `husky install` 相關的設定後，請重新執行 `npm install` ：

```bash
npm install
```

這會執行 `husky install` 並將修改後的配置註冊至 Git hooks 中。

## 本文重點整理

- 為了維護程式碼品質，我們需要使用工具檢查程式碼的方方面面，例如：執行測試、格式化等。但是人工執行既花費時間也不能保證各個程序都有走完，因此使用 Git hooks 配置相關的處理是最好的方式，既可以節省人力，也可以確保進入代碼庫的都是已經通過相關檢查的程式碼。
- Husky 套件幫助開發者可以直覺地配置 Git hooks 相關的腳本，讓整個配置過程更加地簡單，藉此增加專案配置相關檢查的意願，提高程式碼的品質。
- 使用官方提供的初始化指令安裝 Husky 。
- 使用 `husky add` 對特定的 Git Hook 加入執行腳本。
- 如果有客製腳本放置目錄的需求，在 `prepare` 時要指定目錄，並在腳本執行時移動至此目錄。

## 參考資料

- [Husky Documentation](https://typicode.github.io/husky/#/)
- [GitHub: typicode/husky](https://github.com/typicode/husky)
