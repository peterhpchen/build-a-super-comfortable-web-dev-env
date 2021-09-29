# Node Version Manager(nvm)

使用 nvm （全名： Node Version Manager）管理 Node.js 版本。

## 介紹 nvm

nvm 讓我們可以在系統中安裝多個 Node.js 版本，藉由 CLI 任意地切換與安裝各種版本的 Node.js ，以便匹配各式專案。

## nvm 解決的問題

Node.js 版本間的差異使得有些專案需要使用特定的版本才能正常運作，因此各專案間需要來回的切換 Node.js 的版本。要切換 Node.js 版本意味著要重複做安裝的動作，這樣會使得切換版本浪費太多的時間。

nvm 作為 Node.js 的版本管理工具，可以通過 CLI 指令快速的下載、安裝與切換各個不同的版本，大幅減少轉換版本所耗費的時間。

## 使用 nvm

使用 cURL 或 Wget 安裝 nvm ：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

> 腳本的版本請使用最新的（目前是 v0.38.0 ） 可以到 [nvm 的 GitHub 中取得最新版本號](https://github.com/nvm-sh/nvm/releases)。

安裝腳本會將 nvm 的程式建立在 `~/.nvm` 中，並會變更 profile 檔案內容讓 nvm 載入。

> nvm 只支援 unix 、 macOS 與 windows WSL ，要在 Windows 上執行則要使用 [`nvm-windows`](https://github.com/coreybutler/nvm-windows) 。

安裝完成後，執行 `nvm ls` ：

```bash
> nvm ls
         v4.9.1
->     v14.17.4
         system
default -> stable (-> v14.17.4)
iojs -> N/A (default)
unstable -> N/A (default)
node -> stable (-> v14.17.4) (default)
stable -> 14.17 (-> v14.17.4) (default)
lts/* -> lts/fermium (-> v14.17.4)
lts/argon -> v4.9.1
lts/boron -> v6.17.1 (-> N/A)
lts/carbon -> v8.17.0 (-> N/A)
lts/dubnium -> v10.24.1 (-> N/A)
lts/erbium -> v12.22.4 (-> N/A)
lts/fermium -> v14.17.4
```

`nvm ls` 會顯示目前的狀態。

### 使用 nvm 指令

在安裝 Node.js 前，先使用 `nvm ls-remote` 找尋所有 Node.js 的版本：

```bash
nvm ls-remote
```

如果只想要找 LTS （全名： Long Term Support ）版本：

```bash
nvm ls-remote --lts
```

選定版本後進行安裝：

```bash
nvm install v10.24.1
```

一般來說，我們不會需要指定到特定的版本，而且版本號也不利於記憶，因此 nvm 提供了 alias 功能：

```bash
nvm install node
```

Alias `node` 會指到最新的 Node.js 版本，因此上面的指令表示要安裝最新的版本。

我們可以藉由 `alias` 指令設定自己的別名：

```bash
nvm alias project1 14.17.4
```

也可以使用 `unalias` 刪除別名：

```bash
nvm unalias project1
```

每次開啟 Shell 時， nvm 會抓取 alias 為 `default` 的版本，因此要改變預設的版本，可以修改 `default` alias ：

```bash
nvm alias default 14.17.4
```

要切換 Node.js 版本時，可以使用：

```bash
nvm use 14.17.4
```

要瀏覽當前的狀態，可以使用：

```bash
nvm ls
```

`ls` 會顯示已安裝的版本、目前使用版本及各 alias 的資訊。

如果只要知道檔前使用的 Node.js 版本：

```bash
nvm version
```

### 使用 `.nvmrc` 檔案預設 Node.js 版本

nvm 提供使用者 `.nvmrc` 檔案來配置專案預設的 Node.js 版本：

```shell
lts/*
```

`.nvmrc` 的內容為要使用的版本號或是 alias 。

當專案下有這個檔案時，可以不用指定版本直接使用 `nvm use` 或是 `nvm install` ， nvm 會依照 `.nvmrc` 的版本處理。

## 總結

Node.js 的版本差異大，更新速度快，因此專案間常常都會存在版本的差異，如果同時開發多個專案或是要更新專案時，這些安裝流程都會浪費許多時間。

nvm 提供使用者以 CLI 指令控制與切換 Node.js 版本，在安裝細節都處理掉的情況下，使用者可以很輕鬆的指定要使用的 Node.js 版本，將精力放於開發上。

## 參考資料

- [GitHub: nvm-sh/nvm](https://github.com/nvm-sh/nvm)
- [sitepoint: Installing Multiple Versions of Node.js Using nvm](https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/)
