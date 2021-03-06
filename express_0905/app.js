var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//insert code
app.post('/', function(req, res, next) {  
    //console.log(req.body);//请求中还有参数data,data的值为一个json字符串
//操作对象
	//var data= eval_r('(' + req.body.data + ')');//需要将json字符串转换为json对象  
	//console.log("data="+data.PhoneNumber);  
	var fs=require('fs');
	//test
	
     // var content=fs.readFileSync('./output.json','utf-8');
	 // var array=content.split("\n");
	 // var str=JSON.stringify(arr);

	//判断是不是管理员
	if(req.body.management=='123456')
	{
		console.log("管理员登陆");
		var content=fs.readFileSync('./output.json','utf-8');//读到的是string的格式
		 res.contentType('json');//返回的数据类型 
		//将string变成字符串数组，再将字符串数组中的元素变成json对象！
		 var array=eval('([' + content + '])');
		//console.log(array);
		res.send(array);
		res.end();
	}
	else if(req.body.name){//判断是发公告还是注册
	//判断账号是否已经存在
	var content=fs.readFileSync('./output.json','utf-8');
	if(content.match(JSON.stringify(req.body)))
		{
			console.log("已存在");
			res.contentType('json');//返回的数据类型  
			res.send(JSON.stringify({ status:"fail" }));
			res.end();
		}
	else{
		console.log("不存在");
		if(content=="")
		{
			fs.appendFile('./output.json',JSON.stringify(req.body), function () {});
		}
		else
		{
			var str=","+JSON.stringify(req.body);
			fs.appendFile('./output.json',str, function () {});
		}
		//fs.appendFile('./output.json',JSON.stringify(req.body), function () {});
		res.contentType('json');//返回的数据类型  
		res.send(JSON.stringify({ status:"success" }));//给客户端返回一个json格式的数据  
		res.end();	
	    }
	}else if(req.body.message=='123456'){//判断发公告还是返回公告
		
			//返回公告的历史数据
			console.log("我是get");
			var content=fs.readFileSync('./advertise.json','utf-8');
			res.contentType('json');//返回的数据类型 
			//将string变成字符串数组，再将字符串数组中的元素变成json对象！
			var array=eval('([' + content + '])');
			res.send(array);
			res.end();
	}else{
		console.log("发公告");
		var content=fs.readFileSync('./advertise.json','utf-8');
		//console.log(content);
		if(content!="")
		{
		var str=","+JSON.stringify(req.body);
		fs.appendFile('./advertise.json',str, function () {});
		//fs.appendFile('./advertise.json',JSON.stringify(req.body), function () {});
		}
		else
		{
			fs.appendFile('./advertise.json',JSON.stringify(req.body), function () {});
			console.log("为空");
		}	
		//fs.appendFile('./output.json',JSON.stringify(req.body), function () {});
		res.contentType('json');//返回的数据类型  
		res.send(JSON.stringify({ status:"success" }));//给客户端返回一个json格式的数据  
		res.end();	
	}	
}); 

app.post('/exam/passchange', function(req, res){
	console.log("我是passchange，准备修改以下内容");
	console.log(req.body);
    console.log(req.body.changeData);
	var fs=require('fs');
	var content=fs.readFileSync('./output.json','utf-8');
	var array=eval('([' + content + '])');//将所有注册者转成json数组
	for(let i=0; i<req.body.changeData.length;i++)
	{
		for(let j=0; j<array.length;j++)
		{
			if(req.body.changeData[i].phone==array[j].PhoneNumber&&req.body.changeData[i].address==array[j].address&&req.body.changeData[i].name==array[j].name)//通过手机号吗匹配
				{
					//console.log(req.body.changeData[i].name+"=="+array[i].name);
					array[j].power="2";
					console.log("修改成"+array[i].power);
				}
		}
	}
	var temp_str=JSON.stringify(array);
	var new_str=temp_str.replace("[","");
	var new_str1=new_str.replace("]","");
	console.log(temp_str);
	console.log(new_str1);
	//console.log(array);
	//修改完，重新写入
	console.log("执行修改");
	fs.writeFileSync("./output.json",new_str1);
	console.log("修改成功");
	res.contentType('json');//返回的数据类型  
	res.send(JSON.stringify({ status:"changedata_success" }));//给客户端返回一个json格式的数据  
	res.end();
	//res.contentType('json');//返回的数据类型  
	//res.send(JSON.stringify({ status:"changedata_success" }));//给客户端返回一个json格式的数据  
	//res.end();
}); 
app.post('/exam/blackchange', function(req, res){
	
	console.log("我是blackchange，准备修改以下内容");
	console.log(req.body);
    console.log(req.body.changeData);
	var fs=require('fs');
	var content=fs.readFileSync('./output.json','utf-8');
	var array=eval('([' + content + '])');//将所有注册者转成json数组
	for(let i=0; i<req.body.changeData.length;i++)
	{
		for(let j=0; j<array.length;j++)
		{
			if(req.body.changeData[i].phone==array[j].PhoneNumber&&req.body.changeData[i].address==array[j].address&&req.body.changeData[i].name==array[j].name)//通过手机号吗匹配
				{
					//console.log(req.body.changeData[i].name+"=="+array[i].name);
					array[j].power="0";
					console.log("修改成"+array[j].power);
				}
		}
	}
	var temp_str=JSON.stringify(array);
	var new_str=temp_str.replace("[","");
	var new_str1=new_str.replace("]","");
	//修改完，重新写入
	console.log("执行修改");
	fs.writeFileSync("./output.json",new_str1);
	console.log("修改成功");
	res.contentType('json');//返回的数据类型  
	res.send(JSON.stringify({ status:"changedata_success" }));//给客户端返回一个json格式的数据  
	res.end();
	//res.contentType('json');//返回的数据类型  
	//res.send(JSON.stringify({ status:"changedata_success" }));//给客户端返回一个json格式的数据  
	//res.end();
}); 
app.post('/check', function(req, res){
	
	console.log("我是check，准备检验以下手机号");
	console.log(req.body);
	var fs=require('fs');
	var content=fs.readFileSync('./output.json','utf-8');
	var array=eval('([' + content + '])');//将所有注册者转成json数组
		for(let i=0; i<array.length;i++)
		{
			if(array[i].PhoneNumber==req.body.phone)//通过手机号码匹配
				{
					console.log("找到了");
					if(array[i].power=="0")
					{
						res.contentType('json');//返回的数据类型  
						res.send(JSON.stringify({ status:"0" }));//给客户端返回一个json格式的数据  
						res.end()
					}
					else if(array[i].power=="1")
					{
					res.contentType('json');//返回的数据类型  
					res.send(JSON.stringify({ status:"1" }));//给客户端返回一个json格式的数据  
					res.end()	
					}
					else if(array[i].power=="2")
					{
						res.contentType('json');//返回的数据类型  
						res.send(JSON.stringify({ status:"2" }));//给客户端返回一个json格式的数据  
						res.end()
					}else
					{
						res.contentType('json');//返回的数据类型  
						res.send(JSON.stringify({ status:"-1" }));//给客户端返回一个json格式的数据  
						res.end()
					}
					
				}
		}
	
	
}); 

app.post('/deletetitle', function(req, res){
	
	console.log("我是deletetitle，准备删除以下文章");
	console.log(req.body);
	var fs=require('fs');
	var content=fs.readFileSync('./advertise.json','utf-8');
	var array=eval('([' + content + '])');//将所有文章转成json数组
	var temp=[];
		for(let i=0;i<array.length;i++)
		{       
			for(let j=0;j<req.body.changeData.length;j++)
			{
				
			if(array[i].title==req.body.changeData[j].title&&array[i].time==req.body.changeData[j].time)
				{//通过标题和时间做为标准
				}
			
			else
			{
			temp.push(array[i]);		
			}
		}
		}
	var temp_str=JSON.stringify(temp);
        var new_str=temp_str.replace("[","");
        var new_str1=new_str.replace("]","");
        //修改完，重新写入
        console.log("执行修改");
        fs.writeFileSync("./advertise.json",new_str1);
	
	console.log("检查完毕");
	res.contentType('json');
        res.send(JSON.stringify({ status:"deletetitle_success" }));
        res.end()

}); 
module.exports = app;
