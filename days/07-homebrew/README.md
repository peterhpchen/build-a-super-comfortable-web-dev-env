# Homebrew

使用 Homebrew 管理 Mac OS 的套件。

## 介紹 Homebrew

Homebrew 使用 CLI 指令安裝各式的套件，這其中包含 CLI 與 GUI 應用程式（藉由 [Homebrew Cask](https://github.com/Homebrew/homebrew-cask)）。

Homebrew 在使用者下達安裝指令時，會去找尋對應的 formula （Homebrew Cask 的腳本稱為 cask ）， formula 是個 Ruby 腳本，在 formula 中定義了這個套件的安裝細節， Homebrew 藉由這個腳本執行對應的安裝。

## Homebrew 解決的問題

不同的應用程式都有不一樣的安裝方式，有的需要下載安裝包，有些則是下指令安裝，還有些可以藉由 App Store 安裝。除了第一次的安裝外，各式套件的更新或刪除的方式也是千奇百怪，增加了管理套件的難度。

Homebrew 旨在以單一窗口管理各式套件，藉以降低管理的難度，以提高效率。

## 使用 Homebrew

 在使用 Homebrew 前需要做安裝的動作：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

執行 Homebrew 提供的安裝指令即可完成安裝。

接著執行 `brew` 確認安裝是否成功：

```bash
> brew --version
Homebrew 3.2.3
Homebrew/homebrew-core (git revision be6f2f8376; last commit 2021-07-23)
Homebrew/homebrew-cask (git revision f6fc400cf5; last commit 2021-07-23)
```

### Homebrew 的常用指令

在終端機上輸入 `brew` 即可開始使用 Homebrew ， Homebrew 有多個指令以管理作業系統上的套件，下面會介紹幾個常用的指令。

### 搜尋套件

使用 `search` 指令搜尋套件。

```sh
brew search [text]
```

`text` 是套件的 substring 。

以 git 為例：

```sh
brew search git
```

上面的指令會將所有名稱中包含 git 的 formula 列出來。

> 搜尋結果可能會有多個相似名稱的 formula ，可以使用 `info` 查詢 formula 的詳細資訊，以確定要安裝那一個 formula 。

以 `/` 斜線包住 `text` 的話， Homebrew 會解析為 regular expression 。

因此如果要只搜尋 git 的話可以使用：

```sh
brew search /^git$/
```

> `search` 指令也能查詢 Cask 的套件。

如果要列出所有可安裝的套件，可以使用：

```bash
brew formulae
```

> 除了使用指令外， formula 清單也可以在 [Homebrew Fomulae](https://formulae.brew.sh/formula/) 找到。

### 查詢套件資訊

使用 `info` 查詢 formula 的資訊。

```sh
brew info [formula]
```

以 git 為例：

```sh
brew info git
```

### 安裝套件

使用 `install` 指令執行套件的 formula 進行安裝。

```sh
brew install <formula>
```

舉例來說，要安裝 git 的話，可以像下面這樣：

```sh
brew install git
```

### 查詢已安裝的套件

使用 `list` 可以查詢目前已安裝的套件。

```sh
brew list
```

### 更新套件

使用 `upgrade` 指令更新套件。

```sh
brew upgrade [formula]
```

以 git 為例：

```sh
brew upgrade git
```

formula 是可選參數，如果想要更新所有套件，只要不輸入 formula 參數就行了。

```sh
brew upgrade
```

> 執行 `upgrade` 時，在更新套件前會先執行 `update` 指令更新 Homebrew 。

### 刪除套件

使用 `uninstall` 刪除指定 formula 的套件。

```sh
brew uninstall <formula>
```

以 git 為例：

```sh
brew uninstall git
```

### 刪除過期版本

安裝過程中會產生暫存檔，使用 `cleanup` 刪除過期的暫存檔。

```sh
brew cleanup
```

`cleanup` 指令會清理 Cask 套件。

### 更新 Homebrew

使用 `update` 指令更新 Homebrew 至最新版本。

```sh
brew update
```

## Homebrew Cask

Homebrew Cask 是 Homebrew 擴充，原本的 Homebrew 是管理 Command Line 軟體，而 Cask 是管理 GUI 軟體的部分。

Homebrew Cask 的安裝腳本稱為 cask ，與 Homebrew 的 formula 相等。

在安裝 Homebrew 時就會一起安裝 Homebrew Cask ，指令也與 Homebrew 相同：

```sh
brew [command]
```

下面列出幾個常用的指令：

```sh
# 查詢套件資訊
brew info [cask]
# 安裝對應 cask 的套件
brew install <cask>
# 列出所有已安裝的套件
brew list
# 更新對應 cask 的套件
brew upgrade [cask]
# 刪除對應 cask 的套件
brew uninstall [cask]
```

## 參考資料

- [Homebrew](https://brew.sh/)
- [GitHub: Homebrew/brew](https://github.com/Homebrew/brew)
- [GitHub: Homebrew/homebrew-cask](https://github.com/Homebrew/homebrew-cask)
- [Zell Liew: Understanding Homebrew](https://zellwk.com/blog/homebrew/)
