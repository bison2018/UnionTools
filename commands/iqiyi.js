
const path = require('path')
const { buildArgs } = require('../utils/util')

exports.command = 'iqiyi'

exports.describe = 'iqiyi签到任务'

exports.builder = function (yargs) {
  return yargs
    .option('P00001', {
      describe: 'Cookie中P00001的值',
      default: '',
      type: 'string'
    })
    .option('P00PRU', {
      describe: 'Cookie中P00PRU的值',
      default: '',
      type: 'string'
    })
    .option('dfp', {
      describe: 'Cookie中_dfp的值',
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
      cookies: {
        P00001: account.P00001,
        P00003: account.P00003,
        P00PRU: account.P00PRU,
        QC005: account.QC005,
        _dfp: account.dfp
      },
      options: account
    }).catch(err => console.error("iqiyi签到任务:", err.message))
    let hasTasks = await scheduler.hasWillTask(command, {
      tryrun: 'tryrun' in argv,
      taskKey: account.P00PRU
    })
    if (hasTasks) {
      scheduler.execTask(command, account.tasks).catch(err => console.error("iqiyi签到任务:", err.message)).finally(() => {
        console.info('当前任务执行完毕！')
      })
    } else {
      console.info('暂无可执行任务！')
    }
  }
}