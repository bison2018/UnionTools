# 建议本地运行！！！

2021-05-21 添加一个[更新线路的脚本](https://raw.githubusercontent.com/simo8102/chinaunicom-AutoSignMachine/main/%E6%B2%83%E6%B8%B8%E6%88%8F%E7%BA%BF%E8%B7%AF%E6%9B%B4%E6%96%B0%E8%84%9A%E6%9C%AC.sh) 不用每次去导入线路了（需要root和wget[如缺失wget功能请到面具内安装busybox模块即可]还有执行脚本后自己去app内编辑生效app 有能力的可以自行修改）

2021-05-17 本项目不在维护，接下来的看你们自己的了

2021-05-10 [沃游戏线路更新地址](https://github.com/simo8102/chinaunicom-AutoSignMachine/blob/main/%E7%BA%BF%E8%B7%AF%E6%9B%B4%E6%96%B0.md)

2021-05-09 [新项目:联通app HOOK线路](https://github.com/simo8102/wostorehook)

2021-05-08 添加阅读领1G流量（未测试）

添加一个免流软件 [乌拉网游加速器](http://t.cn/A6tN2mr0)



2121-05-07添加沃游戏线路具体如下：

沃游戏线路

[软件下载](https://f-droid.org/repo/com.wireguard.android_486.apk)  或者[下载项目里得apk文件](https://github.com/simo8102/88-AutoSignMachine/blob/main/WireGuard.apk?raw=true)
```
[Interface]
Address = 10.77.70.9/32
DNS = 223.5.5.5
PrivateKey = WO3IfoFcLHDYoh+1J29gyoyGGsDRsJVBggC3/6UdSU4=

[Peer]
AllowedIPs = 0.0.0.0/0
Endpoint = 140.207.47.100:11000
PublicKey = G174V7rB8BcEptUPdThi+z8ooGGgYTRHmayTccLTFFI=
```

导入配置后记得在编辑下线路的生效app不然不免

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



by_安柠
