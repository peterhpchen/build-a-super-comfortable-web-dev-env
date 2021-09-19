# 05 - Tmuxinator - Tmux sessions 管理工具

在針對各種不同的專案進行開發時，會需要在不同位置開啟終端，並執行不同的指令， Tmux 並不會紀錄每個專案要怎麼開啟各個專案，因此每次開始開發時，都需要重新開啟所有的終端，並一一下指令，才能開始開發。

這裡介紹一個可以幫使用者紀錄不同情境下所要開啟終端的工具， Tmuxinator 。

## Tmux 的 sessions 管理工具 Tmuxinator

Tmuxinator 可以使用 Yaml 配置檔設定 Tmux session 的內容，使用 Tmuxinator 開啟 Tmux 時，會藉由配置檔的設定，預設建立期望的配置視窗，藉以節省初次開啟 Tmux 時的時間與精神。

## 安裝 Tmuxinator

> 在安裝 Tmuxinator 前，請先確認 Tmux 已經安裝。

使用 Homebrew 安裝 Tmuxinator ：

```shell
brew install tmuxinator
```

安裝完成後，使用 `tmuxinator version` 檢查是否安裝成功。

```shell
% tmuxinator version
tmuxinator 3.0.1
```

另外， Tmuxinator 需要 `EDITOR` 環境變數來決定要如何開啟檔案，使用 `echo` 確認 `EDITOR` 變數是否有被設置：

```shell
echo $EDITOR
```

如果沒有設置的話，需要在 Shell 的配置檔中設定，以 `~/.zshrc` 為例：

```shell
export EDITOR='vim'
```

上例將 EDITOR 設為 `vim` ，表示 Tmuxinator 會使用 `vim` 作為編輯器。

## Tmuxinator 的專案

Tmuxinator 的專案設置檔為 `tmuxinator.yml` ，依照存放位置的不同，分為全局專案與本地專案。

全局存放在下列的路徑：

1. `$TMUXINATOR_CONFIG`
2. `$XDG_CONFIG_HOME/tmuxinator`
3. `~/.tmuxinator`

Tmuxinator 依照輸入的專案名稱，將上述順序的路徑查找一次，只要有符合的即為目標。

本地專案會放於 `./tmuxinator.yml` 。本地專案的好處在於它可以跟著專案決定不同的配置，並且可以與專案一起被版本控制。

## 建立新的專案

使用 `new` 建立或編輯專案：

```shell
tmuxinator new [project]
```

上面的命令會建立全域專案，使用 `--local` 建立本地專案：

```shell
tmuxniator new --local [project]
```

在下完指令後，如果 `EDITOR` 環境變數有設置的話， Tmuxinator 會幫我們將配置檔使用編輯器打開。

## 配置屬性

使用 `tmuxinator new` 建立專案後，會建立預設的配置檔，可以藉由預設配置檔中的說明來理解各種屬性的效果。

下面是個配置黨的內容：

```yaml
# /Users/PeterChen/.config/tmuxinator/gmi.yml

name: gmi
root: ~/Documents/gain-miles/

windows:
  - frontend:
      layout: main-horizontal
      panes:
        - cd ./gm-eb-proposal/frontend/vue-lbd-pro-html-v1.1.0
        - cd ./gm-eb-proposal/frontend/vue-lbd-pro-html-v1.1.0 && yarn storybook:serve
  - backend: cd ./gm-eb-proposal/ && gradle -p eb-proposal-server -D profile=dev clean build -x test
  - odoo-bridge: cd ./GM_ODOO_Interface/deployment/local && docker-compose ps
```

這個配置檔包含了主要的幾個屬性，接著以這個配置來說明屬性的配置方式。

- `name` ：專案名稱，用在指令中指定專案的手段。
- `root` ：專案的根目錄位置，會影響 `windows` 與 `panes` 屬性中指令的路徑。
- `windows` ：專案要開啟的 Tmux window 。
- `windows.[window name]` ：可以是字串或物件。
  - 字串：此 window 欲執行的指令。
  - 物件：此 window 的細部配置。
- `windows.[window name].panes` ： window 中的 pane 欲執行的指令。
- `windows.[window name].layout` ： panes 的顯示方式，有 `even-horizontal` 、 `even-vertical` 、 `main-horizontal` 、 `main-vertical` 與 `tiled` 五種，詳情可以參考 [Tmux 的說明](https://manpages.ubuntu.com/manpages/precise/en/man1/tmux.1.html#windows%20and%20panes)。

## 開啟 Tmuxinator 專案

設定完配置檔後，使用指令開啟專案：

```shell
# 全局專案
tmuxinator start [project]

# 本地專案
tmuxinator local
```

## 其他指令

```shell
# 建立 [EXISTING] 副本並命名為 [NEW]
tmuxinator copy [EXISTING] [NEW]

# 刪除專案
tmuxinator delete [PROJECT1] [PROJECT2]
```

## 本文重點整理

- 在關閉 Tmux 後， Tmux 不會儲存 Session 的狀態。
- 為了避免每次都需要重新開啟各個 Session 、 Window 與 Pane ，可以使用 Tmuxinator 。
- Tmuxinator 使用配置檔 `tmuxinator.yml` 設定不同的專案。
- 藉由讀取這些配置檔，使用者可以依照需求開啟一組設定好的 Tmux session 。

## 參考資料

- [GitHub ： tmuxinator/tmuxinator](https://github.com/tmuxinator/tmuxinator)
