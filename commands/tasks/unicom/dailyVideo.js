
var dailyVideo = {
  doTask: async (axios, options) => {
    await require('./rewardVideo').doTask(axios, {
      ...options,
      acid: 'AC20200624091508',
      taskId: '734225b6ec9946cca3bcdc6a6e14fc1f',
      codeId: 945254827,
      reward_name: '安柠牛逼'
    })
  }
}

module.exports = dailyVideo