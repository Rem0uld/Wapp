// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    return await db.collection('comment').doc(event.id).update({
      data: {
        comment: _.push({
          'name': event.name,
          'avatar': event.avatar,
          'content': event.comment,
          '_openid':event.openid
        })
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