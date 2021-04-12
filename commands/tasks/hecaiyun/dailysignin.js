var crypto = require('crypto');
var transParams = (data) => {
    let params = new URLSearchParams();
    for (let item in data) {
        params.append(item, data['' + item + '']);
    }
    return params;
};

// https://yun.139.com/caiyun/openapi/authentication/key/getRsaPublicKey
const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ6kiv4v8ZcbDiMmyTKvGzxoPR3fTLj/uRuu6dUypy6zDW+EerThAYON172YigluzKslU1PD9+PzPPHLU/cv81q6KYdT+B5w29hlKkk5tNR0PcCAM/aRUQZu9abnl2aAFQow576BRvIS460urnju+Bu1ZtV+oFM+yQu04OSnmOpwIDAQAB
-----END PUBLIC KEY-----`

// 创建加密算法
const rsapublicKeyEncode = function (data, publicKey) {
    let crypted = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
    }, Buffer.from(data)).toString('base64');
    return crypted;
};

var dailysignin = {
    getEncryptTime: async (axios, options) => {
        const useragent = `Mozilla/5.0 (Linux; Android 10; M2007J3SC Build/QKQ1.191222.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.106 Mobile Safari/537.36 MCloudApp/7.6.0`
        let { data } = await axios.request({
            headers: {
                "user-agent": useragent,
                "referer": `https://caiyun.feixin.10086.cn:7071/portal/newsignin/index.jsp`,
                "origin": "https://caiyun.feixin.10086.cn:7071",
                "X-Requested-With": "com.chinamobile.mcloud"
            },
            url: `https://caiyun.feixin.10086.cn:7071/portal/ajax/tools/opRequest.action`,
            method: 'post',
            data: transParams({
                "op": "currentTimeMillis"
            })
        })
        if (data.code !== 10000) {
            console.info(data.msg)
            return 0
        }
        return data.result
    },
    doTask: async (axios, options) => {
        const useragent = `Mozilla/5.0 (Linux; Android 10; M2007J3SC Build/QKQ1.191222.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.106 Mobile Safari/537.36 MCloudApp/7.6.0`
        let t = await dailysignin.getEncryptTime(axios, options)
        let params = {
            encryptTime: t,
            sourceId: 1003,
            type: 1
        }
        let encodeparams = rsapublicKeyEncode(JSON.stringify(params), publicKey)
        let { data } = await axios.request({
            headers: {
                "user-agent": useragent,
                "referer": `https://caiyun.feixin.10086.cn:7071/portal/newsignin/index.jsp`,
                "origin": "https://caiyun.feixin.10086.cn:7071",
                "X-Requested-With": "com.chinamobile.mcloud"
            },
            url: `https://caiyun.feixin.10086.cn:7071/portal/ajax/common/caiYunSignIn.action`,
            method: 'post',
            data: transParams({
                "op": "receive",
                "data": encodeparams
            })
        })
        if (data.code !== 10000) {
            console.info(data.msg)
        } else {
            console.info(data.result.todaySignIn ? '签到成功' : '签到失败', '已签到', data.result.monthDays, '天')
        }
    },
}
module.exports = dailysignin