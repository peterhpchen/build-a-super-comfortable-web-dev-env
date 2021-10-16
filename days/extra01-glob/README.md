# Extra01 - glob - 配置目標檔案與目錄

> 此為番外，此篇選入番外的原因是 glob 並不是個工具，但是是個會常被各種工具採用的一種配置方式。

glob 是使用萬用字元來匹配複數檔案的表示法。

## 介紹 glob

glob 以萬用字元來表示檔案群集，被大量的用於各種電腦相關的技術上。

以 Bash 為例，當使用的指令需要指定檔案時，使用者就可以 glob 來表示此指令作用的檔案，例如 `ls *.js` 會列出當前目錄下所有以 `.js` 結尾的檔案：

```bash
> ls *.js
babel.config.js jest.config.js  vue.config.js
```

## glob 的語法

這裡介紹幾個常用的語法：

| 語法      | 作用                                                    | 範例                   | 取得的檔案                                   | 排除的檔案                         |
| --------- | ------------------------------------------------------- | ---------------------- | -------------------------------------------- | ---------------------------------- |
| `*`       | 於單階層目錄下匹配 0 至多字元                           | `*.js`                 | `search.js`                                  | `search.md` 、 `samples/search.js` |
| `?`       | 匹配 1 個字元                                           | `samples/?.md`         | `samples/b.md`                               | `samples/sample.md`                |
| `**`      | 設定於獨立的階層目錄時，則會匹配 0 至多個目錄層中的檔案 | `samples/**/sample.md` | `samples/sample.md` 、 `samples/a/sample.md` | `samples/a/a.md`                   |
| `{a,b}`   | 匹配 `a` 或 `b`                                         | `*.{js,md}`            | `search.js` 、 `search.md`                   | `search.json`                      |
| `!(a\|b)` | 排除匹配 `a` 或 `b` 的結果                              | `samples/!(*.js)`      | `samples/b.md` 、 `samples/sample.md`        | `samples/search.js`                |

> 因為 glob 只是個技術名詞，所以各家在實作時，於語法上多少會有些差距，本文以 [`node-glob`](https://github.com/isaacs/node-glob) 的語法來做說明。

## 本文重點整理

- 如果要一個一個輸入實際的檔案路徑來表示檔案群集的話，勢必在每次設定時要花費大量的時間，不僅沒有效率，可讀性還會因為過長的參數而被破壞。
- glob 可以以通用字符來匹配多個檔案，這使得使用者可以用簡短的字串來表示複雜的檔案群集，其簡單的語法對於可讀性也有很大的提升。
- glob 作為表示檔案的方式，被大量的用在各類工具中，像是在各種 ignore 設定（例如： gitignore ）中排除匹配的檔案或是各類 CLI 指令（例如： `ls` 、 `mv` ）用來匹配檔案等，因此學習 glob 幾乎就了解大部分電腦技術選取檔案的技術，對於各類工具也可以有更精細的操作。

## 參考資料

- [Wiki: glob (programming)](<https://en.wikipedia.org/wiki/Glob_(programming)>)
- [Wiki: Wildcard character](https://en.wikipedia.org/wiki/Wildcard_character)
- [GitHub: isaacs/node-glob](https://github.com/isaacs/node-glob)
