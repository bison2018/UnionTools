const { scheduler } = require('../../../utils/scheduler')
const _request = require('../../../utils/request')

var start = async (params) => {
    const { cookies, options } = params

    let init = async (request, savedCookies) => {
        if (!savedCookies) {
            return {
                request: _request(cookies)
            }
        } else {
            return {
                request
            }
        }
    }
    let taskOption = {
        init
    }

    // 每日签到
    await scheduler.regTask('dailysignin', async (request) => {
        await require('./dailysignin').doTask(request, options)
    }, taskOption)

}
module.exports = {
    start
}