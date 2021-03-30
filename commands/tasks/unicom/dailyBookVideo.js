var dailyBookVideo = {
  doTask: async (request, options) => {
    await require('./rewardVideo').doTask(request, {
      ...options,
      acid: 'AC20200728150217',
      taskId: '96945964804e42299634340cd2650451',
      reward_name: '章节视频得积分',
      arguments7: 'woyuedu',
      arguments8: 'a123456'
    })
  }
}

module.exports = dailyBookVideo