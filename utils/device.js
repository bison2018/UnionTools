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
    version: 8.0200,
    unicom_version: 'iphone_c@8.0200',
    app_name: '手机营业厅',
    package_name: 'com.sinovatech.unicom.ui'
}
var devices = [{
    android_version: '12_2',
    deviceBrand: 'iphone_c',
    deviceModel: '9,1',
    buildSn: '9,1',
    deviceId: generateMixed(15) + ''
}, {
    android_version: '12_2',
    deviceBrand: 'iphone_c',
    deviceModel: '9,1',
    buildSn: '9,1',
    deviceId: generateMixed(15) + ''
}]
var device = devices[Math.floor(Math.random() * devices.length)]
var userAgentTpl = {
    'p': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148     unicom{version:iphone_c@8.0200}{systemVersion:dis}{yw_code:}'
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
