# Extra04 - Git - 程式碼版本控制

> 此篇為番外，未收入在本篇的原因是 Git 是個複雜但很基礎的工具，因此大部分的人都已經有個初步的認識，但是以本篇的篇幅又不足以說明整個 Git 的操作，因此放入番外作為補充。

如果沒有版本控制工具的幫助，在協作開發時會無法管理來自不同開發者的變動，不同開發者間的程式碼可能互相覆蓋，造成系統異常。在發布時，也會因為沒有版本的依據而難以確保版本更新的項目，造成麻煩。

## 版本控制的工具 - Git

Git 是個分散式的程式碼版本控制工具，存放程式碼的地方稱為 Repository ， Repository 分為 Server 與 Client 兩種， Server 是伺服器上存放的程式碼庫，而 Client 則是各個使用者自己機器上的程式碼庫。使用者可以任意修改 Client 的程式碼，並不需要理會伺服器或是其他使用者，當想要上傳至伺服器的程式碼庫時，需要做一個**合併**的動作，確保程式碼可以安全地更新至伺服器中，如果有同時修改的部分， Git 會提示**衝突**，使用者需要解決衝突後才能上傳。

Git 在不同的使用者的機器上可以是不同的程式碼內容，所以使用者可以自由地變更，當要上傳至伺服器時， Git 會檢視是否有衝突的問題，在修復後才能上傳，來確保專案的正確性。另外 Git 的 tag 功能，讓我們可以清楚地知道發佈版本中的程式碼狀態，藉以管理各個版本的程式碼。

## 安裝 Git

使用 Homebrew 安裝 Git ：

```bash
brew install git
```

## 使用 Git

### 初始 Git Repository

要使用 Git 前，需要將特定的目錄定為 Repository ，選好目錄後，使用 `git init` 指令：

```bash
mkdir git-test
cd git-test
git init

Initialized empty Git repository in /git-test/.git/
```

### 檢視 Repository 狀態

使用 `git status` 可以觀看目前程式碼庫的狀態：

```bash
% git status
On branch master

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

可以看到當前是在分支 `master` ，並且是還沒 commit 的狀態。

### 修改 Repository 的內容

現在在 `git-test` 目錄中新增 `README.md` 檔案：

```bash
% echo "# Hello Git" > README.md
% git status
# ...
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md
# ...
```

使用 `git status` 會發現 `README.md` 被歸為未追蹤的檔案。

### 將檔案加入暫存區

Git 的暫存區會存放待提交的檔案，因此如果要將檔案加入這次的提交前，需要先加入暫存區：

```bash
% git add README.md
% git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   README.md
```

使用 `git add README.md` 將 `README.md` 加入暫存區中。

> 如果要將檔案從暫存區移出的話，則需要下 `git rm` 的指令。

### Commit （提交節點）

在檔案被加入暫存區後，我們可以提交此次的修改至 Git 上：

```bash
% git commit -m 'add readme'
[master (root-commit) 31a3d69] add readme
 1 file changed, 1 insertion(+)
 create mode 100644 README.md
% git log
commit 31a3d69544f7247b8c8fd5ba59b54dbe8a8d6209 (HEAD -> master)
Author: peterhpchen <peterhsinpingchen@gmail.com>
Date:   Tue Sep 7 21:39:38 2021 +0800
```

使用 `git commit` 提交修改，並使用 `-m` 加入提交訊息。

在提交完成後，使用 `git log` 觀察節點。

### Branch （分支）

在 Git 內，在同一個 Repository 下，可以創建複數個分支，每個分支都可以想成是個不同內容的代碼庫，要創建一個新的分支，需要由原有的分支複製出來。

現在我們使用 `git branch dev` 創建名為 `dev` 的分支：

```bash
% git branch dev
% git branch
  dev
* master
```

建立完分支 `dev` 後，可以使用 `git branch` 觀看分支列表，可以看到除了原本的 `master` 外，已經多了一個 `dev` 的分支。

### 切換分支

建立分支後，可以使用 `git checkout` 切換分支：

```bash
% git checkout dev
Switched to branch 'dev'
% git status
On branch dev
nothing to commit, working tree clean
```

使用 `git status` 確認目前所在的分支。

## 遠端 Repository

### 設定 ssh

在與遠端 Repository 聯繫前，我們需要有個認證機制確保身份與權限，為此要建立 ssh ：

```bash
% ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/PeterChen/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /Users/PeterChen/.ssh/id_rsa.
Your public key has been saved in /Users/PeterChen/.ssh/id_rsa.pub.
The key fingerprint is:

% cat /Users/PeterChen/.ssh/id_rsa.pub
ssh-rsa ... PeterChen@GM-MacBook-Pro
```

使用 `ssh-keygen` 建立一組 ssh 公私鑰，名為 `id_rsa` ，後面有 `.pub` 結尾的為公鑰，將其複製至遠端的 ssh server 。

### 將遠端 Repository 加入 Git

使用 `git remote` 加入遠端 Repository ：

```bash
% git remote add origin git@github.com:peterhpchen/git-test.git
% git remote -v
origin  git@github.com:peterhpchen/git-test.git (fetch)
origin  git@github.com:peterhpchen/git-test.git (push)
```

使用 `git remote add` 加入新的遠端路徑，第一個參數是這個遠端路徑的名稱，第二個是遠端路徑。完成後可以使用 `git remote -v` 列出目前的遠端路徑。

### 將變更推至遠端

要將變更推至遠端，可以使用 `git push` ：

```bash
% git push origin dev
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 225 bytes | 225.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To github.com:peterhpchen/git-test.git
 * [new branch]      dev -> dev
```

`git push` 的第一個參數是遠端路徑名稱，第二個是要推送的分支。

> 使用 `git pull` 可以拉取遠端的程式碼。

## 本文重點整理

- 在現代的軟體開發中， Git 已經是版本控制工具的首選，藉由 GitHub 之類的服務，我們不必自己架設 Git Server 就可以使用 Git 來管控程式碼。
- 許多的工具也都配合 Git 開發出一套部署發布的流程，為之後上線時的管控更為順暢。

## 參考資料

- [Git SCM](https://git-scm.com/)
- [GitHub ： peterhpchen/git](https://github.com/peterhpchen/git)
