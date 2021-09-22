# 06 - TPM - Tmux Plugin Manager 與它的插件

使用 Tmux 的插件管理工具來載入各式插件，可以為使用者減少配置的麻煩。如果不使用插件，使用者必須要自己在 `.tmux.config` 配置檔中一一設定配置或撰寫程式。使用插件後，只要在配置檔中引入，就可以使用各種便利的功能。

TPM 全名為 Tmux Plugin Manager ，藉由 TPM 的幫助，我們可以引入各式各樣有用的插件，來增進使用 Tmux 的便利性與開發時的產能。

> Tmux 的 `prefix` 預設是 `Control B` ，如果有自行修改 `prefix` ，請自己將下面說明的 `prefix` 替換為自己的設定。

## 安裝 TPM

> 在安裝 TPM 前，請先確認已經安裝 Tmux 、 Git 與 Bash 。

要安裝 TPM ，需要先 `clone` 它的程式碼至本機中。

```shell
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

如果已經啟動 Tmux 的話，需要重新載入 Tmux 的設定，讓 TPM 的安裝生效。

```shell
tmux source ~/.tmux.conf
```

## 使用 TPM

要使用 TPM 的方式有兩種，一種是在 Tmux 中使用快捷鍵，另一種是藉由指令操作，接下來會以這兩個方式分別操作 TPM 執行特定的動作。

### 安裝插件

在 Tmux 配置檔（ `~/.tmux.conf` ）中加上插件：

```shell
set -g @plugin 'plugin name'
```

在 Tmux 中可以使用快捷鍵 `prefix` + `I` （大寫 I ）執行安裝， TPM 會將設定的插件下載至 `~/.tmux/plugins/` 並且載入，完成安裝。

也可以直接使用指令：

```shell
~/.tmux/plugins/tpm/bin/install_plugins
```

### 更新插件

在 Tmux 中可以使用快捷鍵 `prefix` + `U` （大寫 U ）執行更新，按照 TPM 給予的提示做對應的更新。

```shell
Installed plugins:
  tpm
  tmux-sensible
Type plugin name to update it.
- "all" - updates all plugins
- ENTER - cancels
```

- 更新特定插件：輸入插件名稱。
- 更新全部插件：輸入 `all` 。
- 離開：直接按 Return 鍵。

也可以直接使用指令，更新全部的插件：

```shell
~/.tmux/plugins/tpm/bin/update_plugins all
```

另外指定插件名稱，可以更新特定插件：

```shell
~/.tmux/plugins/tpm/bin/update_plugins tmux-sensible
```

## 刪除插件

在 Tmux 配置檔（ `~/.tmux.conf` ）中刪除想要解安裝的插件：

```shell
# 註解掉想要刪除的插件
# set -g @plugin 'tmux-plugins/tmux-sensible'
```

在 Tmux 中可以使用快捷鍵 `prefix` + `alt u` （小寫 u ）執行刪除，它會將不在配置檔內的插件從 `~/.tmux/plugins/` 目錄中刪除。

> Mac 中的 `alt` 鍵需要設定，請參考 [Alt key binding not great from Mac. :(](https://github.com/tmux-plugins/tpm/issues/70) 。

另外可以直接使用指令：

```shell
~/.tmux/plugins/tpm/bin/clean_plugins
```

## 插件介紹

### tmux-sensible

由於 Tmux 預設的設定對於使用者來說不太合理，因此我們可以藉由 [tmux-sensible](https://github.com/tmux-plugins/tmux-sensible) 的幫助，將 Tmux 的設定配置的合乎使用者的需求。

### tmux-yank

[tmux-yank](https://github.com/tmux-plugins/tmux-yank) 可以將 Tmux 中複製的字串貼至作業系統的剪貼簿上。

在一般模式下：

- `prefix` + `y` ：複製當前的指令。
- `prefix` + `Y` ：複製當前的所在路徑。

在複製模式下：

- `y` ：複製選取的字串。
- `Y` ：複製選取的字串並貼至命令列。

### tmux-copycat

[tmux-copycat](https://github.com/tmux-plugins/tmux-copycat) 是個 Tmux 的搜尋工具，利用快捷鍵，可以快速搜索出目標字串。

| 快捷鍵                 | 動作                               |
| ---------------------- | ---------------------------------- |
| `prefix` + `/`         | 使用 Regex 語法搜尋                |
| `prefix` + `control-f` | 在視窗內容中找尋檔案路徑           |
| `prefix` + `control-g` | 在視窗內容中尋找 Git status 的檔案 |
| `prefix` + `control-u` | 在視窗內容中尋找 Url               |

當找尋的目標結果有多個時，可以使用：

- `n` ：移至下個結果
- `N` ：移至上個結果

> 與 `tmux-yank` 搭配使用，會得到更好的效果。

### tmux-open

[tmux-open](https://github.com/tmux-plugins/tmux-open) 可以使用特定方式開啟選取的檔案。

在複製模式下：

- `o` ：使用預設的程式開啟選取得的路徑。
- `Control-o` ：使用 `$EDITOR` 設定的編輯器開啟路徑。
- `Shift-s` ：使用搜尋引擎將選取字串作為搜尋目標。

### tmux-resurrect

[tmux-resurrect](https://github.com/tmux-plugins/tmux-resurrect) 可以儲存當前 Tmux 的狀態，並在重新啟動 Tmux 後再次載入。

它有兩個指令：

- `prefix` + `Control s` ：儲存 Tmux 狀態。
- `prefix` + `Control r` ：載入 Tmux 狀態。

### tmux-continuum

[tmux-continuum](https://github.com/tmux-plugins/tmux-continuum) 在 tmux-resurrect 上實現了自動保存的功能。

預設自動保存是每 15 分鐘執行一次，可以使用 `continuum-save-interval` 參數修改此規則：

```shell
set -g @continuum-save-interval '60'
```

> `continuum-save-interval` 單位是分鐘。

### nord-tmux

[nord-tmux](https://github.com/arcticicestudio/nord-tmux) 是個 tmux 的主題。

## 本文重點整理

- 藉由 Tmux 插件管理工具 TPM 的幫助，我們可以對 Tmux 引入新的功能及配置。
- TPM 可以安裝、更新以及刪除各式插件，每個動作都可以藉由快捷鍵或是指令達成。
  - 安裝：
    - 1. 將插件加入配置檔中。
    - 2. 使用 `prefix` + `I` 或是 `~/.tmux/plugins/tpm/bin/install_plugins` 安裝。
  - 更新：使用 `prefix` + `U` 或是 `~/.tmux/plugins/tpm/bin/update_plugins all` 更新。
  - 刪除：
    - 1. 將插件從配置檔中刪除。
    - 2. 使用 `prefix` + `alt-u` 或是 `~/.tmux/plugins/tpm/bin/clean_plugins` 刪除。
- 介紹各式插件
  - 瀏覽類： `tmux-yank` 、 `tmux-copycat` 、 `tmux-open` 。
  - 保存類： `tmux-resurrect` 、 `tmux-continuum` 。
  - 主題類： `nord-tmux` 。

## 參考資料

- [GitHub ： tmux-plugins/tpm](https://github.com/tmux-plugins/tpm)
- [Managing plugins via the command line](https://github.com/tmux-plugins/tpm/blob/693e5a2a0f6acfd2666882655d5dfd32e8c6c50b/docs/managing_plugins_via_cmd_line.md)
