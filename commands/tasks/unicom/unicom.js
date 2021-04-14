const { scheduler } = require('../../../utils/scheduler')
const { getCookies, saveCookies } = require('../../../utils/util')
const _request = require('../../../utils/request')

var start = async (params) => {
  const { cookies, options } = params

  let init = async (request, savedCookies) => {
    await require('./init')(request, {
      ...params,
      cookies: savedCookies || cookies
    })
    return {
      request
    }
  }
  let taskOption = {
    init
  }

  // 每日签到积分
  await scheduler.regTask('dailysignin', async (request) => {
    await require('./dailysignin').doTask(request, options)
    await require('./integral').addFlow(request, options)
  }, taskOption)

  // 冬奥积分活动 20201231
  await scheduler.regTask('winterTwo', async (request) => {
    await require('./integral').winterTwoGetIntegral(request, options)
    await require('./integral').winterTwoStatus(request, options)
  }, taskOption)

  // 每日定向积分 20201231
  await scheduler.regTask('dxIntegralEveryDay', async (request) => {
    await require('./integral').dxIntegralEveryDay(request, options)
  }, taskOption)

  // 每日游戏楼层宝箱
  await scheduler.regTask('dailygamebox', async (request) => {
    await require('./integral').gamebox(request, options)
  }, taskOption)



  // 首页-游戏-娱乐中心-沃之树
  await scheduler.regTask('dailywoTree', async (request) => {
    await require('./woTree').doTask(request, options)
  }, taskOption)



  // 首页-小说-读满10章赢好礼
  await scheduler.regTask('dailyBookRead10doDraw', async (request) => {
    // 首页-小说-读满10章赢好礼
    await require('./dailyVideoBook').read10doDraw(request, options)
    // 首页-签到有礼-免流量得福利-3积分天天拿(阅读打卡) 已下线
    // await require('./dailyVideoBook').giftBoints(request, options)
  }, taskOption)


  // 首页-游戏-娱乐中心-每日打卡
  await scheduler.regTask('producGameSignin', async (request) => {
    await require('./producGame').gameBox(request, options)
    await require('./producGame').gameSignin(request, options)
  }, taskOption)

  // 首页-游戏-娱乐中心-天天领取3G流量包
  await scheduler.regTask('dailygameflow', async (request) => {
    await require('./producGame').doGameFlowTask(request, options)
  }, taskOption)

  // 首页-积分查询-游戏任务
  await scheduler.regTask('dailygameIntegral', async (request) => {
    await require('./producGame').doGameIntegralTask(request, options)
  }, taskOption)

  // 首页-知识-限时免费（连续7天阶梯激励）
  await scheduler.regTask('dailyCourse', async (request) => {
    await require('./dailyCourse').doTask(request, options)
  }, {
    ...taskOption,
    startTime: 9 * 3600
  })


  // 每日评论积分
  await scheduler.regTask('dailycomment', async (request) => {
    await require('./commentSystem').commentTask(request, options)
  }, taskOption)

  // 首页-游戏-娱乐中心-每日打卡-完成今日任务(200m)
  await scheduler.regTask('todayDailyTask', async (request) => {
    await require('./producGame').gameBox(request, options)
    await require('./producGame').doTodayDailyTask(request, options)
  }, {
    ...taskOption,
    startTime: 22 * 3600
  })



  // 首页-知识-阅读答题赢好礼
  await scheduler.regTask('dailyBookAnswer', async (request) => {
    await require('./dailyBookAnswer').doTask(request, options)
  }, taskOption)



  // 首页-签到有礼-免费拿-猜拳拿奖
  await scheduler.regTask('dailyFingerSign', async (request) => {
    await require('./dailyFingerSign').doTask(request, options)
  }, taskOption)

  // 首页-积分商城-火热抢购-三只松鼠-看视频得积分
  await scheduler.regTask('dailyShopVideoIntegral', async (request) => {
    await require('./dailyShop').dovideoIntegralTask(request, options)
  }, taskOption)



  // 服务-查询-电子发票-赚积分
  await scheduler.regTask('dailyWisdomActivityIntegral', async (request) => {
    await require('./dailyOtherRewardVideo').doWisdomActivityIntegralTask(request, options)
  }, taskOption)



  // 积分商城-疯踩小橙（沃耀联通小游戏）
  await scheduler.regTask('woyaoliantong', async (request) => {
    await require('./woyaoliantong').doTask(request, options)
  }, taskOption)

  // 首页-签到-APP下载领积分
  await scheduler.regTask('dailyDownloadApp', async (request) => {
    await require('./dailyDownloadApp').doTask(request, options)
  }, {
    ...taskOption,
    startTime: 13 * 3600,
  })

  // 清理领取某些未知方式的积分
  // 该处理可能会导致某些活动任务机会不足导致错误，所以执行时间要迟
  await scheduler.regTask('dailyOtherRewardVideo', async (request) => {
    await require('./dailyOtherRewardVideo').cleanRewardVideo(request, options)
  }, {
    ...taskOption,
    startTime: 21.5 * 3600,
    ignoreRelay: true
  })



  // 每日奖励信息结果推送
  if (!('asm_func' in process.env) || process.env.asm_func === 'false') {
    await scheduler.regTask('dailyNotifyReward', async (request) => {
      await require('./dailyNotifyReward').doNotify(request, options)
    }, {
      ...taskOption,
      startTime: 22 * 3600,
      ignoreRelay: true
    })
  }

}
module.exports = {
  start
}
