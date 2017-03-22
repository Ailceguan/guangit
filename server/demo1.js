/**
 * Created by 关柳 on 2017/3/20.
 */

var express=require('express');
var fs=require('fs');
var app=express();


//跨域
app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
});


app.get('/getlist',function(req,res){
    fs.readFile(__dirname+'/public/data.json',function(err,data){
        if(err){
            console.log(err)
        }else{
            //console.log(data);
            res.jsonp(data.toString());
        }
    });


});

app.listen(3000,function(){
    console.log('服务器启动......')
});
