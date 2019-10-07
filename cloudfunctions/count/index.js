// 云函数入口文件
const cloud = require('wx-server-sdk')
const db = cloud.database()
cloud.init()

// 云函数入口函数
  exports.main = async (event, context) => {
    try {
       for(let i=0;i<event.tea.length;i++)
      {
        db.collection('comment').doc(event.tea[i].name).get({
          success:e=>{
            
          }
        })
      }
    
    } catch (e) {
      console.error(e)
    }
}