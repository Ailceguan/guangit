var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path=require('path');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/index',function(req,res){
    res.sendFile(path.resolve(__dirname,'..')+'/client/index.html')
});

app.get('/',function(req,res){
    fs.readFile(__dirname + '/public/data.json',function(err,data){
        if(err){
          console.log(err)
        }else {
          res.json(JSON.parse(data))
        }
    })
})

app.listen(3001,function(){
  console.log('------服务器启动------')
  console.log('--访问地址：http://localhost:3001/')
})
