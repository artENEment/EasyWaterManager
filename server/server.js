//类-用户
class User{
    constructor(name,user,password)
    {
        this.name=name;
        this.user=user;
        this.password=password;
        this.yyd=0;
        this.sex="未知"
        this.sentence="这个人还没有签名";
    }
}
//全局哈希表
let map=new Map();
//管理员账号
let admin=new User('admin','admin','admin');
admin.yyd=100000000000000;
admin.sentence="吾乃灭霸级管理员admin"
map.set(admin.user,admin);
//gym
let gym=new User('莫小龙','260866530','gym123');
gym.yyd=20000;
gym.sentence="网站管理员1";
map.set(gym.user,gym);
//确认登录变量
let islogin=false;
let loginUser=null;

//注册用户
function register(name,user,password)
{
    if(name.length==0||user.length==0||password.length==0)
    {
        return "注册失败\n某一项值为空";
    }
    //判断用户名是否存在
    if(map.get(user)==undefined)
    {
        //判断用户名长度是否符合条件
        if(user.length>2&&user.length<11)
        {
            let newUser=new User(name,user,password);
            map.set(newUser.user,newUser);
            console.log('注册成功')
            return "注册成功"
        }
        else
        {
            console.log('注册失败\n注册账号用户名(User)长度必须大于2且小于11');
            return "注册失败\n注册账号用户名(User)长度必须大于2且小于11"
        }
    }
    else
    {
        console.log('注册失败\n该用户名已存在');
        return "注册失败\n该用户名已存在"
    }
}
//用户登录
function login(user,password)
{
    if(user.length==0||password.length==0)
    {
        return "登录失败1\n某一输入值为空";
    }
    if(map.get(user)==undefined)
    {
        return "登录失败1\n用户不存在";
    }
    else if(map.get(user).password==password)
    {

        islogin=true;
        loginUser=map.get(user);
        console.log('登录成功');
        return "登录成功";
    }
    else
    {
        console.log('登录失败\n用户名或密码错误');
        return "登录失败\n用户名或密码错误";
    }
}



//搭建express服务器
const express=require('express');
const app=express();
//注册
app.get('/signup',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    console.log(req.query);
    let message=register(req.query.name,req.query.user,req.query.password);
    console.log(message);
    res.send(message);
})


//登录
app.get('/signin',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    let message=login(req.query.user,req.query.password);
    if(message=="登录成功")
    {
        res.send(req.query.user+"登录成功");
    }
    else
    {
        res.send(message);
    }
})

//首页页面更改请求
app.get('/home',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    if(islogin==true)
    {
        res.send(JSON.stringify(loginUser));
    }
    else
    {
        res.send(null);
    }
})
//用户页面加载请求
app.get('/user',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    if(islogin==true)
    {
        res.send(JSON.stringify(loginUser));
    }
    else
    {
        res.send(null);
    }
})
//用户页面修改请求
app.get('/userConfig',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    let config=req.query;
    let configUser=map.get(loginUser.user);
    configUser.name=config.rname;
    configUser.yyd=config.ryyd;
    configUser.sentence=config.rsentence;
    configUser.sex=config.rsex;
    res.send("信息修改成功");
})

//测试一下服务器
app.get('/myserver',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.send("atatataatatatatatatatatattttttttttttttttttttttttttttttttttttttttttttttttt")
})
app.listen(80,function()
{
    console.log('80listen  uh');
})



