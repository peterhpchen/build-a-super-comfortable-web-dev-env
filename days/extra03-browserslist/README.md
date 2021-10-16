# Browserslist

使用 Browserslist 設定執行的環境並將設定共享給不同的工具。

## 介紹 Browserslist

Browserslist  的配置被各類工具用來判斷目標執行環境。

Browserslist 的配置為多個 query ，除了明確設定各瀏覽器或是 Node.js 環境的版本清單外，也可以採用 Browserslist 制定的規則來描述版本資訊：

```shell
> 1%
last 2 versions
```

上例的 queries 有 `> 1%` 與 `last 2 versions` ，所選定的範圍為此環境版本的市占率要大於 1% 或是要是最新的兩個版本。

Browserslist 會藉由 [`caniuse-lite`](https://github.com/ben-eb/caniuse-lite) 獲取 [Can I Use](https://caniuse.com/) 的資料來判斷各個支援的環境與版本。

以上面的設定舉例，它會被轉為下面的清單：

```shell
and_chr 92
and_ff 90
and_qq 10.4
and_uc 12.12
android 92
baidu 7.12
bb 10
bb 7
chrome 92
chrome 91
chrome 90
edge 92
edge 91
firefox 90
firefox 89
ie 11
ie 10
ie_mob 11
ie_mob 10
ios_saf 14.5-14.7
ios_saf 14.0-14.4
kaios 2.5
op_mini all
op_mob 64
op_mob 12.1
opera 77
opera 76
safari 14.1
safari 14
samsung 14.0
samsung 13.0
```

各類工具就可以使用這些資訊決定要處理的方式。

## Browserslist 的 query

使用 Browserslist 前需要先以 query 設定目標環境。

在配置檔中不同行視為不同的 query ， query 間是以 `or` 組成， 如果在同一行設定多個 query 則會以下列規則合併：

- 使用 `,` 或是 `or` 分隔 query ，則結果為兩個 query 的聯集。
- 使用 `and` 分隔 query ，則結果為兩個 query 的交集。
- `,` 、 `or` 或 `and` 後面接 `not` ，則結果為第一個 query 的範圍扣除第二個 query 的範圍。

各個 query 的效果可以參考 [query 的列表](https://github.com/browserslist/browserslist#full-list) 。

## 配置 Browserslist

Browserslist 可以將配置設定於 `package.json` 中的 `browserslist` 屬性，或是獨立一個配置檔 `.browserslistrc` 。

### `package.json`

`package.json` 中的 `browserslist` 屬性可以設定 query ：

```json
{
  "browserslist": ["> 1%", "last 2 versions"]
}
```

### `.browserslistrc`

`.browserslistrc` 是個配置檔，每一行表示一個 query ：

```shell
> 1%
last 2 versions
```

## 總結

如果工具在匹配環境時需要一個個設定支援的環境，那會造成配置複雜，而且每次環境更新版本時，需要再次修改配置以符合最新的環境，使工作量增加。

Browserslist 幫助使用者更容易設定目標環境的範圍，避免使用特定的環境版本設定，改以 query 以各種範圍配置來設定目標執行環境，以減輕開發的負擔。

## 參考資料

- [GitHub: browserslist/browserslist](https://github.com/browserslist/browserslist)
