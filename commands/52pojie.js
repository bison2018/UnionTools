
const path = require('path')
const { buildArgs } = require('../utils/util')

exports.command = '52pojie'

exports.describe = '52pojie签到任务'

exports.builder = function (yargs) {
  return yargs
    .option('htVD_2132_auth', {
      describe: 'cookie项htVD_2132_auth的值',
      type: 'string'
    })
    .option('htVD_2132_saltkey', {
      describe: 'cookie项htVD_2132_saltkey的值',
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
        htVD_2132_auth: account.htVD_2132_auth,
        htVD_2132_saltkey: account.htVD_2132_saltkey
      },
      options: account
    }).catch(err => console.error("52pojie签到任务:", err.message))
    let hasTasks = await scheduler.hasWillTask(command, {
      tryrun: 'tryrun' in argv,
      taskKey: account.htVD_2132_auth
    })
    if (hasTasks) {
      scheduler.execTask(command, account.tasks).catch(err => console.error("52pojie签到任务:", err.message)).finally(() => {
        console.info('当前任务执行完毕！')
      })
    } else {
      console.info('暂无可执行任务！')
    }
  }
}