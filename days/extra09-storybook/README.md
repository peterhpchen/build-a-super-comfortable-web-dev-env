# Extra09 - Storybook - 元件開發框架

隨著 [Component Driven](https://www.componentdriven.org/) 興起，元件化變為不可逆的趨勢，在元件化後的可替換性與重複利用性上有了很大的幫助，但如果直接在系統上開發，則會被其他的元件影響，讓開發元件變得麻煩，另外也需要增加撰寫文件的時間，使得需要較多的時間做元件化動作。

## 展示與開發元件的工具 - Storybook

Storybook 是個 npm 套件，它可以為單一 UI 元件撰寫名為 **story** 的程式碼段，每個 story 都代表一個元件的使用情境，我們也可以為一個元件撰寫多個 story 。這些 story 會被 Storybook 解析並產生一個文件，使用者可以參考這文件，並在文件中試用並改變元件的各個參數。

Storybook 作為元件開發的框架，解決了在開發元件時會遇到的問題，藉由在 Storybook 中所撰寫的 story ，對於開發或是想要使用元件的開發者來說有下列的好處：

- 避免在系統中對元件除錯：因為系統中的各個元件都會互相影響，因此在系統中的元件行為通常會牽涉其他的元件或模組，這些都會影響除錯的走向，導致難以辨別問題。
- 撰寫測試：元件除了運作邏輯需要正常外，顯示的效果與功能也需要被驗證，使用 Storybook 來撰寫各種情境下的 story ，開發者可以同時理清元件的需求是否符合。
- 供使用者參考：再多的文件說明，都不比一段實際的程式碼來得明瞭， 每個 story 中撰寫的是真正的代碼，使用者可以參考這些 story 藉以了解如何使用元件。
- 產出文件：在 Storybook 中的元件會被解析，利用元件本身的參數及事件產生一個完全反映程式本身的文件，這樣一來我們既不需要自己在寫一次文件，又可以確保文件與程式碼一定一致。

## 安裝 Storybook

Storybook 為 npm 套件，須要先安裝：

```bash
npx sb init
```

> 如果不是在已存在的專案中執行指令的話，它會詢問要用何種專案模式建立，像是 react 、 vue 等。

安裝完後，使用 `npm run storybook` 執行。

## 撰寫 Story

Storybook 使用 Component Story Format 撰寫 story ，這是個 ES2015 模組，藉由導出的物件定義各個 story 。

下面是個 `button` 元件的 stories ：

```js
import { createButton } from './Button';

// 1. 基本配置
export default {
  title: 'Example/Button',
  argTypes: {
    // Controls
    label: { control: 'text' },
    primary: { control: 'boolean' },
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    // Actions
    onClick: { action: 'onClick' },
  },
};

// 2. 共用模板
const Template = ({ label, ...args }) => {
  return createButton({ label, ...args });
};

// 3. 各個 story
export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
```

1. 基本配置： `export default` 的物件定義 Storybook 的基本配置，例如要放置的位置、元件對象或是預設參數...等。
2. 共用模板： 不同的 story 如果對象是同個元件，則可以定義共用的模板以減少重複的程式碼。
3. 各個 story ： `export` 有名稱的函式，它們會變為一個個不同的 story ，可以藉由修改 `args` 讓使用者看到不同的參數對於元件的變化。

## 使用 Storybook

Storybook 有兩個 tab ， Canvas 與 Docs ：

- Canvas ：聚焦於元件本身，可以觀察元件的各個行為，例如參數變化造成的改變或是元件觸發的事件。
- Docs ：聚焦於元件的文件，藉由 story 的定義，將所有的 story 轉換為文件，讓開發者可以參照。

Canvas 中的 Controls 可以控制各個 `args` ，去改變預設的參數，藉以更了解元件的效果。而 Actions 則可以看到各種事件在觸發時的時機與其所帶的參數。

## 本文重點整理

- Storybook 是個在開發 UI 元件時不可或缺的工具，它不僅使開發變得更加順暢，也因為撰寫的 story 反映各種場合的需求，藉以提升了可靠度，也讓工程師可以使用 Storybook 展示效果給設計師或是使用者，讓雙方認知的差異降到最低。

## 參考資料

- [Storybook](https://storybook.js.org/)
