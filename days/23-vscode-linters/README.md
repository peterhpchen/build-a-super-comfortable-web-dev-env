# 組合技： Visual Studio Code + EditorConfig + Prettier + ESLint + Stylelint + Markdownlint

在 Visual Studio Code 中安裝插件，使得維護程式碼品質的各種工具在輸入與儲存時作動，給予使用者相關的建議與優化。

## 前置作業

- 安裝 Visual Studio Code ，可以參考[本系列 Visual Studio Code 一文]()。
- 完成 EditorConfig 、 Prettier 、 ESLint 、 Stylelint 與 Markdownlint 的設定，可以參考本系列[整合 Linters 一文]()。

## 配置理念

Lint 與格式化套件多為使用 command line 控制，在編輯器中修改檔案後，還需要再下指令，才能做處理，而且在編輯時，也不會有提示提醒寫法的問題。

為了解決這些問題，我們需要：

- 使用編輯器時，依照設定調整輸入方式。
- 在輸入時，於編輯器上顯示 linter 的提示。
- 在儲存時，執行 lint 與格式化。

這些目標，可以透過 Visual Studio Code 的各種插件來完成。

## 使用 EditorConfig 插件

配置過的 `.editorconfig` 需要搭配 EditorConfig 的插件才可以發揮作用：

```bash
code --install-extension editorconfig.editorconfig
```

Visual Studio Code 的 EditorConfig 插件並不是所有的設定都支援，目前支援下列的屬性：

- `indent_style`
- `indent_size`
- `tab_width`
- `end_of_line` （ on save ）
- `insert_final_newline` （ on save ）
- `trim_trailing_whitespace` （ on save ）

對於沒支援的屬性，就算在 `.editorconfig` 有設定，在 Visual Studio Code 中依然不會生效，但是我們可以保持這些不會生效的屬性，在其他支援的編輯器中使用，或是[藉由 Prettier 的幫助](https://prettier.io/docs/en/api.html#prettierresolveconfigfilepath--options)使這些設定可以在儲存時生效。

## 使用 Prettier 插件

首先，安裝 Prettier 插件：

```bash
code --install-extension esbenp.prettier-vscode
```

接著需要調整 Visual Studio Code 的設定，啟動**儲存時自動格式化**與將 **Prettier 設為預設的格式化工具**：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

設定完成後，每次儲存時， Visual Studio Code 都會依照專案中的 `.prettierrc.js` 設定啟動 Prettier 格式化檔案內容。

## 使用 ESLint 插件

首先，安裝 ESLint 插件：

```bash
code --install-extension dbaeumer.vscode-eslint
```

如此一來， ESLint 插件會使用設定檔 `.eslintrc.js` 的配置，在編輯器上顯示各種提示。

接著我們要調整配置，使得檔案在儲存時執行 ESLint 修復檔案內容：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 使用 Stylelint 插件

首先，安裝 Stylelint 插件：

```bash
code --install-extension stylelint.vscode-stylelint
```

如此一來， Stylelint 插件會使用設定檔 `stylelint.config.js` 的配置，在編輯器上顯示各種提示。

接著我們要調整配置，使得檔案在儲存時執行 ESLint 修復檔案內容：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  }
}
```

## 使用 Markdownlint 插件

首先，安裝 Markdownlint 插件：

```bash
code --install-extension davidanson.vscode-markdownlint
```

如此一來， Stylelint 插件會使用設定檔 `.markdownlint.js` 的配置，在編輯器上顯示各種提示。

接著我們要調整配置，使得檔案在儲存時執行 ESLint 修復檔案內容：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.markdownlint": true
  }
}
```

## 將設定記錄在專案中

用一般方式安裝插件時，專案並不會紀錄插件的安裝，因此在其他電腦上打開專案時，還是必須重新設定，為此 Visual Studio Code 讓使用者可以建立插件的推薦清單，讓我們在其他環境上可以依照清單安裝插件。

要建立插件推薦清單可以在根目錄中創建 `.vscode/extensions.json` ：

```json
{
  "recommendations": [
    "editorconfig.editorconfig",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "stylelint.vscode-stylelint",
    "davidanson.vscode-markdownlint"
  ]
}
```

另外相關的設定也可以在 `.vscode/settings.json` 中紀錄：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true,
    "source.fixAll.markdownlint": true
  }
}
```

## 總結

各式的 linter 與 formatter 搭配 Visual Studio Code 的插件，即時地在儲存時做優化的處理，並在編輯時直接檢查是否有可以修正之處，提高效率。

## 參考資料

- [Visual Studio Code Extension Marketplace](https://code.visualstudio.com/docs/editor/extension-marketplace)
