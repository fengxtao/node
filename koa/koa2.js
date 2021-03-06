//获取所需依赖
const Koa=require("koa");
const router=require("koa-router")();
const staticServer=require("koa-static");
const bodyparser=require("koa-bodyparser");
const fs=require("fs");

//创建应用服务
const app=new Koa();
app.keys = ['im a newer secret', 'i like turtle'];
app.use(staticServer(__dirname+'/views'));

//指定静态页面
var controllers=fs.readdirSync(__dirname+"/controllers");
var controllers_js=controllers.filter((item)=>{
	return item.endsWith(".js")
});

//请求路由获取
for(let match of controllers_js){
	var singleRoute=require(__dirname+"/controllers/"+match);
	if( singleRoute.conType&&singleRoute.conType==="route" ){
		if(singleRoute.type==="get"){
			router.get(singleRoute.path,singleRoute.handle)
		}else if(singleRoute.type==="post"){
			router.post(singleRoute.path,singleRoute.handle)			
		}	
	}
}

//应用使用服务
app.use(bodyparser());
app.use(router.routes());

//开启端口监听
app.listen("2000");
// app.listen("3001");
console.log("2000端口已开启")

app.on('error', (err, ctx) => {
	log.error('server error', err, ctx)
  });

//process.nextTick(ck);
