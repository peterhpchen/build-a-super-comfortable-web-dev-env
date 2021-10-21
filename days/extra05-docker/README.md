# Extra05 - Docker - 容器化

> 此篇為番外，未收入在本篇的原因是 Docker 是個複雜的工具，因此需要更多的篇幅介紹此工具，但是以本篇的篇幅不足以說明 Docker 的操作，因此放入番外作為補充。

在開發時，我們需要在電腦中安裝各式各樣的工具與套件後，才能進行開發。這過程中，常會遇到與環境相關的問題，在部署時同樣也會因為環境的問題，而需要針對各個環境去排除問題。這些問題都會使開發進度延宕，造成時間上的花費。

## 使環境容器化 - Docker

Docker 會將應用跑在一個可以獨立運作的**容器**中，這個容器不會被宿主環境所影響，因此我們可以將它隨意的執行在任何支援 Docker 的環境中，而不被環境本身與應用程式中使用的技術所限制。

有了 Docker ，我們不再需要在意目標環境的情形，只要確保容器運作正常，就可以將它部署至任何機器中，不管什麼作業系統，只要支援 Docker ，就可以藉由指令啟動執行，藉以省下配置的時間，專注在開發與優化的作業上。

## 安裝 Docker

使用 Homebrew 安裝 Docker ：

```bash
brew install docker
```

安裝完後，確認是否安裝成功：

```bash
> docker --version
Docker version 20.10.7, build f0df350
```

## 使用 Docker

在使用 Docker 容器前，我們需要決定使用的 Image 。 在 [Docker Hub](https://hub.docker.com/search?q=&type=image) 中可以找到各式各樣的 Image ，選擇好後（以 `node` 舉例）使用 Docker 提供的指令將 Image 拉到本機：

```bash
docker pull node
# equal
docker pull node:latest
```

每個 Image 都會有[多個版本](https://hub.docker.com/_/node?tab=tags&page=1&ordering=last_updated)，如果向例子這樣沒有指定版本時， Docker 會幫我們拉回 tag 為 `latest` 的版本。

取得想要的 Image 後，可以使用 `docker run` 指令建立容器並執行指令：

```bash
> docker run -it node
Welcome to Node.js v16.7.0.
Type ".help" for more information.
> console.log('Hello, world!')
Hello, world!
```

範例中，我們使用 `-it` 參數，叫 Docker 在本機終端上開啟容器內部的終端，我們就可以在容器內部的終端中直接使用 `node` 指令。

> 在執行 `docker run` 時會去檢查是否有此 image ，如果沒有會幫忙下載後，再執行容器。

使用 `docker ps` 會列出目前正在執行的容器：

```bash
> docker ps
CONTAINER ID  IMAGE   COMMAND                 CREATED         STATUS    PORTS     NAMES
113787a04cc8  node    "docker-entrypoint.s…"  9 minutes ago   Up 9      minutes   sweet_davinci
```

我們可以使用 `docker exec` 對目前已經在執行的容器下指令：

```bash
> docker exec 113787a04cc8 touch /tmp/tmp.js
```

在使用 `docker exec` 時需要指定容器的 ID ，後面在輸入要執行的指令。

要停止容器，可以使用 `docker stop` ：

```bash
docker stop
```

它會送出停止訊號給容器，並在一段時間後關閉容器。

> 關閉的容器使用 `docker ps -a` 才能看到。

要刪除容器可以使用 `docker rm` ：

```bash
docker rm 113787a04cc8
```

`docker images` 可以列出目前本機的 images ：

```bash
> docker images
REPOSITORY      TAG       IMAGE ID       CREATED         SIZE
node            latest    c66552d59c4b   4 days ago      907MB
ubuntu          latest    1318b700e415   3 weeks ago     72.8MB
```

`docker rmi` 可以刪掉 Image ：

```bash
docker rmi c66552d59c4b
```

要刪掉 image ，要在沒有容器使用的情況下才可以刪除，可以使用 `-f` 參數強制刪除 image 。

## Dockerfile

Dockerfile 是個 Docker image 的定義檔，使用 docker build 可以執行 Dockerfile 中的指令建置 image ， Dockerfile 是一個由各種指令組成的檔案，描述如何建置 image 。

下面就是一個最簡單的 `dockerfile` ：

```yaml
FROM node
```

> Dockerfile 的屬性值很多，每個都有不同的功能，詳細的說明可以參考[官網的介紹](https://docs.docker.com/engine/reference/builder/#from)。

使用 `docker build` 建立 image ：

```bash
docker build -t test-node/latest .
```

`-t` 是設定 image 的名稱，如果沒有設定，需要以 id 來指定 image 。

> 如果當前目錄下有 `dockerfile` 檔案的話，直接使用 `.` 來表示要抓當前目錄的 `dockerfile` 設定檔，如果設定檔不在當前目錄，要使用路徑配置。

建置完後使用 `docker run test-node/latest` 就可以用此 image 建立容器。

## Docker Compose

一個應用程式常常都需要多個服務合作，才能正常運作，像是 MEAN 架構就是 MongoDB 、 Express.js 、 Angular 與 Node.js 所組成的。

將所有的套件安裝在同一個容器中會使彈性降低，使容器化原本期望達到的高彈性部署打了折扣，為此，我們需要將各組件拆到不同的容器中，並將這些容器整合使用。

Docker Compose 讓使用者可以用 `docker-compose.yml` 檔案配置多個容器，並讓它們互相溝通運作。

```yml
version: '3.3'

services:
  mongo:
    image: mongo

  mongoexpress:
    image: mongo-express
    ports:
      - '8081:8081'
    links:
      - mongo
    environment:
      - ME_CONFIG_MONGODB_URL=mongodb://mongo:27017
```

上例使用 docker compose 啟動 MongoDB 與它的管理工具 [`mongo-express`](https://github.com/mongo-express/mongo-express-docker) 。

> Compose 的設定方式，可以參考[官網的詳細說明](https://docs.docker.com/compose/compose-file/compose-file-v3/)。

接著下指令執行：

```bash
docker-compose up
```

docker compose 會啟動兩個容器 `mongo` 與 `mongoexpress` 。

## 清理 Docker

要清理不用的 image 、 container 、 volume 與 network ，可以使用各個對應指令的 prune 。

```bash
# Delete all unused network
docker network prune

# Delete all unused volume
docker volume prune

# Delete all unused containers
docker container prune

# Delete all unused images
docker image prune -a

# Delete all unused stuff
docker system prune --volumes
```

## 本文重點整理

- Docker 讓開發與部署時更有彈性，我們不再需要花時間在安裝各種套件上，可以把心力放在開發與優化上。

## 參考資料

- [docker docs](https://docs.docker.com/)
