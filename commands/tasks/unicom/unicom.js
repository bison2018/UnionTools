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

  // 首页-积分商城-定向积分专区-每日抽奖(1次免费及5次花费定向积分抽奖)
  await scheduler.regTask('dailylotteryintegral', async (request) => {
    await require('./dailyShop').dailyintegrallottery(request, options)
  }, taskOption)

  // 首页-游戏-娱乐中心-沃之树
  await scheduler.regTask('dailywoTree', async (request) => {
    await require('./woTree').doTask(request, options)
  }, taskOption)

  //阅读领1G流量
  await scheduler.regTask('dailyBookRead1GFlow', async (request) => {
      await require("./dailyVideoBook").read1GFlow(request, options)
	   await require("./dailyVideoBook").dovideoIntegralTask(request, options)
    }, taskOption )

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

  // await require('./integral').getflDetail(request, options)
  // await require('./integral').getTxDetail(request, options)
  // await require('./integral').getDxDetail(request, options)
  // await require('./integral').getCoins(request, options)

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



  // 首页-积分商城-火热抢购-三只松鼠-看视频得积分
  await scheduler.regTask('dailyShopVideoIntegral', async (request) => {
    await require('./dailyShop').dovideoIntegralTask(request, options)
  }, taskOption)

  // 服务-办理-套餐变更-赚积分
  await scheduler.regTask('dailyPackageIntegral', async (request) => {
    await require('./dailyOtherRewardVideo').doPackeageChangeVideoIntegralTask(request, options)
  }, taskOption)

  // 服务-查询-电子发票-赚积分
//await scheduler.regTask('dailyWisdomActivityIntegral', async (request) => {
//    await require('./dailyOtherRewardVideo').doWisdomActivityIntegralTask(request, options)
//  }, taskOption)

  // 冬奥-冰雪俱乐部-联通客户日-幸运九宫格
  await scheduler.regTask('dailyClubLottery', async (request) => {
    await require('./dailyClubLottery').doTask(request, options)
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

  // 每日0点自动兑换流量
//  await scheduler.regTask('exchangeDFlow', async (request) => {
//   await require('./exchangeDFlow').doTask(request, options)
//  }, {
//    ...taskOption,
//    startTime: 0,
//    startHours: 0,
//    ignoreRelay: true
//  })

  // 定时检测流量兑换
  // 可使用 --exchangeDFlowCircle-intervalTime 1800 选项指定流量检查间隔时间，单位秒
  // 可使用 --exchangeDFlowCircle-minFlow 200 选项指定流量检查最小值
  // 可使用 --exchangeDFlowCircle-productId 21010621565413402 选项指定兑换流量包ID
  // let { 'exchangeDFlowCircle-productId': productId = 'ff80808166c5ee6701676ce21fd14716' } = options


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
