//const Koa = require('koa')
////文件读取
//const fs = require('fs')
//const app = new Koa()
////解析post参数
//const bodyParser = require('koa-bodyparser')
////路由
//const Router = require('koa-router')
////连接mongodb数据库
//const Monk = require('monk')
//const db=new Monk('localhost/test')//链接到库
//const person = db.get('jiangheng')//表
////解决跨域问题
//const cors = require('koa2-cors')
////先保存一个个人信息的数据
//let home = new Router()
//app.use(cors())
//app.use(bodyParser())
//
//
//var util = require('util');
//var result = util.format('%s:%s', 'foo','baz','ttt');
//console.log(result);
//
//
//
//
//
//// 子路由1
//home.post('/save', async ( ctx )=>{
//	let temp = ctx.request.body
//	await person.find({name:'蒋恒'}).then((data)=>{
//		ctx.body = data
//		data[0].index = '555'
//		data[0].name = 'james'
//		data[0].address = 'nononono'
//		person.insert(data[0]).then((data)=>{
//			ctx.body = {code:0,msg:'成功',data:data}
//		})
//	})
//})
//
//// 子路由2
//let page = new Router()
//page.get('/404', async ( ctx )=>{
//ctx.body = '404 page!'
//}).get('/helloworld', async ( ctx )=>{
//ctx.body = 'helloworld page!'
//})
//
//// 装载所有子路由
//let router = new Router()
//router.use('', home.routes(), home.allowedMethods())
//router.use('/page', page.routes(), page.allowedMethods())
//
//// 加载路由中间件
//app.use(router.routes()).use(router.allowedMethods())
//
//app.listen(3000, () => {
//console.log('[demo] route-use-middleware is starting at port 3000')
//})

const Koa = require('koa')
const path = require('path')
const app = new Koa()
// const bodyParser = require('koa-bodyparser')

const { uploadFile } = require('./middleWare/uploadFile')

// app.use(bodyParser())

app.use( async ( ctx ) => {

  if ( ctx.url === '/' && ctx.method === 'GET' ) {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 upload demo</h1>
      <form method="POST" action="/upload.json" enctype="multipart/form-data">
        <p>file upload</p>
        <span>picName:</span><input name="picName" type="text" /><br/>
        <input name="file" type="file" /><br/><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html

  } else if ( ctx.url === '/upload.json' && ctx.method === 'POST' ) {
    // 上传文件请求处理
    let result = { success: false }
    let serverFilePath = path.join( __dirname, 'upload-files' )

    // 上传文件事件
    result = await uploadFile( ctx, {
      fileType: 'album', // common or album
      path: serverFilePath
    })

    ctx.body = result
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }
})

app.listen(3000, () => {
  console.log('[demo] upload-simple is starting at port 3000')
})