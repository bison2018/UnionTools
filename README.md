# 88-AutoSignMachine

 联通挂机任务积分脚本
 
推荐使用github免费提供action机制执行脚本， 联通手厅签到用户请自行添加秘钥参数（https://github.com/你的用户名/88-AutoSignMachine/settings/secrets/actions 然后点击New repository secret）

unicom_password（服务密码）

unicom_user（手机号）

unicom_appid（http://m.client.10010.com/mobileService/customer/getclientconfig.htm?appId= 开抓包 你再打开手厅就能找到了）

NOTIFY_SCKEY（service酱得key）
#多用户
https://github.com/你的用户名/88-AutoSignMachine/settings/secrets/actions 然后点击New repository secret

上面输入config

下面输入这个

{

"accountSn": "1,2",

"user-1": "221",

"password-1": "311",

"appid-1": "411",

"user-2": "251",

"password-3": "721",

"appid-2": "921"

}

然后在自动脚本里把最后一句删了改成下面这两句

      config: ${{secrets.CONFIG}}
      run: |
        echo "$config" > ./config.json
        node index.js unicom -config config.json

代码里的换行自己删了 不太会用GitHub的编辑器
