# ChuCooList Ionic Version

## 安裝步驟

  1. 準備環境（JDK, Android SDK, Apache Ant, Node.js），參考[官網說明](http://ionicframework.com/docs/guide/installation.html) OR [Ionic Quickstart for Windows](https://egghead.io/series/ionic-quickstart-for-windows) by Egghead.io。
  2. 全域安裝 cordova & ionic。

    ```sh
    $ sudo npm install -g cordova ionic
    ```

  3. Clone repo

    ```sh
    $ git clone https://github.com/ChuCooList/demo.git
    ```

  4. 於專案目錄下，安裝相依套件

    ```sh
    $ cd ionic
    $ npm install
    $ bower install
    ```

  5. 設定平台

    ```sh
    $ ionic platform add android ios # 新增欲支援平台，其中 iOS 需使用 OS X。
    ```

  6. Build & Install

    ```sh
    $ ionic build android            # 建立 apk 檔。
    $ adb install [-r] [apk path]    # 安裝至裝置（-r 表示重新安裝）。
    ```
    or

    ```sh
    $ ionic run android       # 編譯、打包、安裝一次搞定，還會自動幫你把程式開好。
    ```

## 更新 ionic 方式
  - CLI
    `sudo npm install -g ionic`
  - lib
    1. 修改 `bower.json` 中 `devDependencies` 的 ionic 版本號。
    2. 在專案目錄下 `ionic lib update`

## 若使用 fish shell
  - fish shell 需於 `~/.config/fish/config.fish` 中新增以下路徑(若無此檔案請自己新增)

    ```sh
    set -gx PATH /PATH/TO/Android/Sdk/tools /PATH/TO/Android/Sdk/platform-tools $PATH
    ```

    然後執行它使其生效

    ```sh
    source  ~/.config/fish/config.fish
    ```
