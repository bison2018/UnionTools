# 建议本地运行！！！

沃游戏线路
软件下载地址：(https://f-droid.org/F-Droid.apk)
```
[Interface]
Address = 10.77.70.224/32
PrivateKey = YEr0pcy59xVBc4QRLBbWpqTc+EazCWPxth3m38UUd0U=

[Peer]
AllowedIPs = 0.0.0.0/0
Endpoint = 140.207.47.100:11000
PublicKey = G174V7rB8BcEptUPdThi+z8ooGGgYTRHmayTccLTFFI=
```

本地手机方式运行（安卓）
```
首先下载安装好termux
打开termux
然后运行下面的命令(所有命令都是在英文输入状态下输入)
apt update
apt install git vim perl nodejs-lts wget curl nano cronie moreutils
git clone https://github.com/simo8102/88-AutoSignMachine.git
看下文件名字
ls
记住那个88-AutoSignMachine
然后
mv   88-AutoSignMachine qd
进入这个文件夹里面
cd qd
npm install
等依赖包安装好了就行了
然后运行下面的命令
node index.js unicom --user 11111 --password 1111 --appid 1555555
node index.js unicom --user 11111 --password 1111 --appid 1555555 --tasks dailygameflow 只运行游戏(https://github.com/simo8102/88-AutoSignMachine/issues/167)
```
如果多用户就
启用`node index.js unicom --config default.json`表示配置文件
```json
{
    "accountSn": "1,2",
    "user-1": "22******1",
    "password-1": "31******1",
    "appid-1": "41******1",
    "user-2": "25******1",
    "password-3": "72******1",
    "appid-2": "92******1"
}
```
本地手机方式运行（苹果）

`苹果商店好像有个叫ish的你们去试下`注意由于我并没有苹果设备本方法未测试也没法测试 请用户自行测试

本地运行电脑端（win）
```
1、下载安装node 一路下一步就行
https://nodejs.org/dist/v15.14.0/node-v15.14.0-x64.msi
##2、安装git（此步可省略 )
https://github.com/git-for-windows/git/releases/download/v2.31.1.windows.1/Git-2.31.1-64-bit.exe
3、随便找个文件夹
下载本项目代码解压文件夹
进入你刚解压出来的文件里
输入 下面的代码
npm install
node index.js unicom --user 176*********** --password 13 --appid 0******************
4、写个bat 代码如下
node index.js unicom --user 176*********** --password 13 --appid 0******************
多用户就在最后面在加一行node index.js unicom --user 176*********** --password 13 --appid 0******************有多少账号就添加多少（傻瓜式）
你也可以根据这个https://github.com/simo8102/88-AutoSignMachine/blob/main/README.zh_CN.md   README的提示更改
```
本地运行电脑端（Linux）
```
1、安装node
https://nodejs.org/zh-cn/download/package-manager/   根据官方文档的步骤安装node
##2、安装git（此步可省略 )
yum install git 或 apt-get install git 
3、同步代码到本地
git clone https://github.com/simo8102/88-AutoSignMachine.git
输入 下面的代码
cd 88-AutoSignMachine
npm install
node index.js unicom --user 176*********** --password 13 --appid 0******************
4、写个sh脚本 代码如下
node index.js unicom --user 176*********** --password 13 --appid 0******************
多用户就在最后面在加一行node index.js unicom --user 176*********** --password 13 --appid 0******************有多少账号就添加多少（傻瓜式）
你也可以根据这个https://github.com/simo8102/88-AutoSignMachine/blob/main/README.zh_CN.md   README的提示更改
```
2021-05-01  修改sync_fork脚本代码

2021-04-18  添加了sync_fork脚本

2021-04-16 添加自动兑换1G流量，并不是都能兑换成功（已移除）

欢迎大家提交下自己得兑换情况和套餐

并尝试修复积分问题（目前为无效状态，代码暂不上传）

2021-04-16调整为早上6.30和7.30执行以避开联通维护（一般都是0点至3点左右维护）


2021-04修改游戏线程为2


2021-04修复3G流量（脚本执行完后等一阵子再领比如脚本早上运行你就晚上领）

![QQ截图20210403173705](https://user-images.githubusercontent.com/45913291/113474571-41d52580-94a3-11eb-921b-16e21bac7455.png)



# 88-AutoSignMachine

 联通挂机任务积分脚本
 
推荐使用github免费提供action机制执行脚本， 联通手厅签到用户请自行添加秘钥参数（https://github.com/你的用户名/88-AutoSignMachine/settings/secrets/actions 然后点击New repository secret）
添加如下secret:
| Name | Value | 
| :---:| :---: |
| UNICOM_PASSWORD | 服务密码 |
| UNICOM_USER | 手机号 |
| UNICOM_PASSWORD2 | 服务密码2 |
| UNICOM_USER2 | 手机号2 |
| UNICOM_APPID | http://m.client.10010.com/mobileService/customer/getclientconfig.htm?appId= 开抓包 你再打开手厅就能找到了 |
| NOTIFY_SCKEY | [service酱的key](http://sc.ftqq.com/?c=code) |
|     TOKEN    | [github_token] |
