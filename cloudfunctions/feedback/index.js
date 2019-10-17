// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('feedback').doc('feedback').update({
      data: {
        content: _.addToSet({
          'name': event.name,
          'content': event.content,
          'time': Date.parse(new Date())
        }),
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