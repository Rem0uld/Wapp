// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var rNum = 0;
  var sco = 0;
  for (let i = 0; i < event.choosed.length; i++) {
    if (event.choosed[i] == event.answerArr[i]) {
      rNum += 1;
    }
  }
  sco = (rNum / event.choosed.length) * 100;
  return sco;
}