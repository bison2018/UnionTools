修复3G流量（脚本执行完后等一阵子再领比如脚本早上运行你就晚上领）

Actions脚本修改为凌晨12点和1点各执行一次任务（建议不要频繁运行脚本以免大数据拉黑）

还有建议下载到本地执行！！！！！！（node index.js unicom --user xxxxxxxxxx --password xxxxxxxxxxx --appid xxxxxxxxxxxxxxxxx  --tryrun）

# 88-AutoSignMachine

 联通挂机任务积分脚本
 
推荐使用github免费提供action机制执行脚本， 联通手厅签到用户请自行添加秘钥参数（https://github.com/你的用户名/88-AutoSignMachine/settings/secrets/actions 然后点击New repository secret）
ENABLE_UNICOM （填true）


unicom_password（服务密码）

unicom_user（手机号）

unicom_appid（http://m.client.10010.com/mobileService/customer/getclientconfig.htm?appId= 开抓包 你再打开手厅就能找到了）

NOTIFY_SCKEY（service酱得key）

