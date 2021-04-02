
const path = require('path')
const { buildArgs } = require('../utils/util')

exports.command = 'hecaiyun'

exports.describe = 'hecaiyun任务'

exports.builder = function (yargs) {
    return yargs
        .option('cookies', {
            describe: '签到cookies',
            default: '',
            type: 'string'
        })
        .help()
        .showHelpOnFail(true, '使用--help查看有效选项')
        .epilog('copyright 2020 LunnLew');
}

exports.handler = async function (argv) {
    var command = argv._[0]
    let accounts = buildArgs(argv)
    console.info('总账户数', accounts.length)
    for (let account of accounts) {
        let { scheduler } = require('../utils/scheduler')
        await require(path.join(__dirname, 'tasks', command, command)).start({
            cookies: account.cookies,
            options: account
        }).catch(err => console.error(exports.describe, err))
        let hasTasks = await scheduler.hasWillTask(command, {
            tryrun: 'tryrun' in argv,
            taskKey: account.user,
            tasks: account.tasks
        })
        if (hasTasks) {
            scheduler.execTask(command, account.tasks).catch(err => console.error(exports.describe, err)).finally(() => {
                delete process.env.current_task
                console.info('当前任务执行完毕！')
            })
        } else {
            console.info('暂无可执行任务！')
        }
    }
}