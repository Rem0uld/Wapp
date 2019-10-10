// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
var strts = [];
var comments = [];

exports.main = async(event, context) => {
  db.collection('comment').get({
    success: res => {
      console.log(res)
      for (let i = 0; i < res.data.length; i++) {
        comments.push(res.data[i])
      }
      return comments;
    }
  })



}