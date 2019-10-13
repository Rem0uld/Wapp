// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    return await db.collection('teachers').doc(event.id).update({
      data: {
        comment: _.addToSet({
            'name': event.name,
            'avatar': event.avatar,
            'content': event.comment,
            'score': event.score,
            '_openid': event.openid,
             'time' : Date.parse(new Date())
          }),
          stars:event.result
      },
      success: e => {
        console.log(e)
      },
      fail: console.error
    })
  } catch (e) {
    console.error(e)
  }

}