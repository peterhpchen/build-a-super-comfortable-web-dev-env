# Visual Studio Code

使用 Visual Studio Code 作為開發的程式碼編輯器。

## 介紹 Visual Studio Code

Visual Studio Code 是由 Microsoft 主導開發的[開源](https://github.com/Microsoft/vscode/)程式碼編輯器，在這個輕量的編輯器中包進了自動完成、 debug 、版本控制等功能，並藉由其豐富的外掛插件的幫助，實現了大部分語言的專用 IDE 所能做到的事情。

## 使用 Visual Studio Code 的原因

一般功能豐富的 IDE ，都會針對它所支援的語言提供許多強大的輔助功能，例如 PyCharm ，但它們所需的容量與資源會較單純的編輯器大上許多，並且因為只支援特定語言的關係，如果有其他語言的專案時，則需要另外安裝其他的 IDE 才能進行開發。

而所謂的 Editor （例如： Sublime Text ），雖然與 IDE 相比相當的輕量，但大部分都只支援語法高亮等簡單的開發輔助，在瀏覽文件或程式碼時較為適合，但真正到了開發時，還是必須藉由 IDE 才能提高產能。

> 作者以前是使用 Visual Studio 作為 IDE ， Notepad++ 作為 Editor （當時是 Windows 環境）。

作為一個免費的開源軟體， Visual Studio Code 在 IDE 與 Editor 間取得了一個微妙的平衡，就本身來說，它是一個優秀的 Editor ，它支援語法高亮、自動完成、縮排、程式碼片段等豐富的編輯功能，而當你安裝了特定語言的開發插件後，搭配它的 Debug 與任務執行器，使它可以接近（甚至超越）IDE 所給予的開發效率。

## 安裝 Visual Studio Code

使用 Homebrew 安裝 Visual Studio Code ：

```bash
brew install visual-studio-code
```

使用 `code` 指令，就可以開啟 Visual Studio Code 。

## 介面介紹

Visual Studio Code 介面分為：

- 編輯器：位於中間區塊，可以將檔案分群，放於不同的位置。
- 側邊欄：位於左邊區塊，顯示檔案瀏覽器、搜尋、 Git 等資訊。
-  狀態欄：位於最下方行，顯示當前檔案狀態，例如編碼、檔案格式、錯誤、警告等資訊。
- Panels ：位於下方區塊，顯示各套件 logs 、 terminal 等資訊。

## 設置

Visual Studio Code 的設定分為兩種：

- 使用者設定：此設定會影響所有 Visual Studio Code 所開啟的專案。
- 專案設定：此設定只會被特定專案使用。

專案設定是在專案的根目錄下建立 `.vscode` 的目錄，並在目錄內使用 `settings.json`  做設定：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.markdownlint": true
  }
}
```

Key 是設定的屬性，可以在官網中找到[屬性的說明以及它的預設值](https://code.visualstudio.com/docs/getstarted/settings#_default-settings) 。

## 總結

Visual Studio Code 作為一個輕量的程式碼編輯器，藉由插件的幫助，可以達到接近 IDE 的開發效率，在純編輯器與 IDE 之間取得一個平衡。

因為插件的彈性，開發者不需要再使用不同的 IDE ，只需要針對專案的語言，選擇適合的插件，就可以擁有與 IDE 相同的功能，減少需要安裝與適應複數個開發工具的麻煩。

## References

- [Visual Studio Code Docs](https://code.visualstudio.com/docs)
