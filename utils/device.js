const os = require('os')
const path = require('path')
const fs = require('fs-extra')

// 530000000126002
function generateMixed(n) {
    var chars = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.floor(Math.random() * 9);
        res += chars[id];
    }
    return res;
}


var appInfo = {
    version: 8.0602,
    unicom_version: 'iphone_c@8.0602',
    app_name: '中国联通',
    package_name: 'com.sinovatech.unicom.ui'
}
var devices = [{
    deviceOS: '14.0.1',
    deviceBrand: 'iphone',
    deviceModel: 'iPad',
    buildSn: 'LMY48Z',
    deviceId: generateMixed(15) + ''
}, {
    deviceOS: '14.0.1',
    deviceBrand: 'iphone',
    deviceModel: 'iPad',
    buildSn: 'V417IR',
    deviceId: generateMixed(15) + ''
}]
var device = devices[Math.floor(Math.random() * devices.length)]
var userAgentTpl = {
    'p': 'Mozilla/5.0 (iPad; CPU OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 unicom{version:iphone_c@8.0600}{systemVersion:dis}{yw_code:}'
}

let file = path.join(process.env.asm_save_data_dir, `taskFile_${process.env.taskKey}.json`)
if (fs.existsSync(file)) {
    let taskJson = fs.readFileSync(file).toString('utf-8')
    taskJson = JSON.parse(taskJson)
    let update = false
    if ('device' in taskJson && taskJson.device) {
        device = taskJson.device
    } else {
        update = true
    }
    if ('appInfo' in taskJson && taskJson.appInfo) {
        appInfo = taskJson.appInfo
    } else {
        update = true
    }
    if (update) {
        fs.writeFileSync(file, JSON.stringify({
            ...taskJson,
            device,
            appInfo
        }))
    }
}

module.exports = {
    device,
    appInfo,
    buildUnicomUserAgent: (options, tplname) => {
        let rdm = {
            ...device,
            ...appInfo,
            desmobile: options.user
        }
        var fmt = (str, params) => {
            for (let key in params) {
                str = str.replace(new RegExp("\\{" + key + "\\}", "g"), params[key]);
            }
            return str
        }
        return fmt(userAgentTpl[tplname], Object.assign(rdm, options))
    }
}
