建议使用本地方式运行
```
	首先下载安装好termux
	打开termux
	然后运行下面的命令(所有命令都是在英文输入状态下输入)

	apt update

	apt install git vim perl nodejs-lts wget curl nano cronie moreutils

	git clone https://github.com/simo8102/88-AutoSignMachine.git


	看下文件名字
	记住那个88-AutoSignMachine

	然后

	mv   88-AutoSignMachine qd

	进入这个文件夹里面

	cd qd

	npm install

	等依赖包安装好了就行了
	然后运行下面的命令

	node index.js unicom --user 11111 --password 1111 --appid 1555555
	
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
2021-04-16 添加自动兑换1G流量，并不是都能兑换成功

欢迎大家提交下自己得兑换情况和套餐

并尝试修复积分问题（目前为无效状态，代码暂不上传）

2021-04-16调整为早上6.30和7.30执行以避开联通维护（一般都是0点至3点左右维护）


2021-04修改游戏线程为2


2021-03修复3G流量（脚本执行完后等一阵子再领比如脚本早上运行你就晚上领）

![QQ截图20210403173705](https://user-images.githubusercontent.com/45913291/113474571-41d52580-94a3-11eb-921b-16e21bac7455.png)



# 88-AutoSignMachine

 联通挂机任务积分脚本
 
推荐使用github免费提供action机制执行脚本， 联通手厅签到用户请自行添加秘钥参数（https://github.com/你的用户名/88-AutoSignMachine/settings/secrets/actions 然后点击New repository secret）
添加如下secret:
| Name | Value | 
| :---:| :---: |
| ENABLE_UNICOM | true |
| UNICOM_PASSWORD | 服务密码 |
| UNICOM_USER | 手机号 |
| UNICOM_APPID | http://m.client.10010.com/mobileService/customer/getclientconfig.htm?appId= 开抓包 你再打开手厅就能找到了 |
| NOTIFY_SCKEY | [service酱的key](http://sc.ftqq.com/?c=code) |
