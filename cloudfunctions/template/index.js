// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    const result = await cloud.openapi.templateMessage.send({
      touser: event.openid,
      page: 'pages/me/me',
      data: {
        keyword1: {
          value: event.name
        },
        keyword2: {
          value: event.place
        },
        keyword3: {
          value: event.time
        },
      },
      templateId: 'XHN3jBEvtTlKOgiT-p7JTPT6_7MGaCie7E33uReUqDw',
      formId: event.formid,
      emphasisKeyword: 'keyword1.DATA'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}