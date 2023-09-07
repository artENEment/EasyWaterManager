window.onload=function()
{
    let loginUser=null;//登录用户
    //0昵称 1用户名 2艺元豆 3个性签名
    let texts=document.querySelectorAll(".text");
    //0男性 1女 2未知
    let sexradio=document.querySelectorAll(".sexradio");
    function upgradeData()
    {
        let xhr=null;
        xhr=new XMLHttpRequest();
        xhr.open('GET',"http://127.0.0.1:80/user");
        xhr.send();
        xhr.onreadystatechange=function()
        {
            if(xhr.readyState==4)
            {
                if(xhr.status>=200&&xhr.status<300)
                {
                    
                    if(this.response)
                    {
                        loginUser=JSON.parse(this.response);
                        texts[0].value=loginUser.name;
                        texts[1].value=loginUser.user;
                        texts[2].value=loginUser.yyd;
                        texts[3].value=loginUser.sentence;
                        if(loginUser.sex=="未知"){sexradio[2].checked=true;}
                        else if(loginUser.sex=="男"){sexradio[0].checked=true;}
                        else{sexradio[1].checked=true;}
                    }
                    else
                    {
                        loginUser=null;
                        console.log("未登录");
                        texts[0].value=null;
                        texts[1].value=null;
                        texts[2].value=null;
                        texts[3].value=null;
                        sexradio[0].checked=false;
                        sexradio[1].checked=false;
                        sexradio[2].checked=false;
                    }
                }
            }
        }
    }
    upgradeData();
    // setInterval(upgradeData,1000);



    //用户名不可被修改
    function cannotUser()
    {
        texts[1].disabled=`disabled`;
        //用户名不可被修改弹窗
        let userbtn=document.querySelector("#userbtn");
        let tanchuang=document.querySelector("#tanchuang");
        let tbtn=document.getElementById("tbtn");
        let tclose=document.getElementById("tclose");
        userbtn.addEventListener("click",function()
        {
            tanchuang.style.display=`flex`;
        })
        tbtn.addEventListener("click",function()
        {
            tanchuang.style.display=`none`;
        })
        tclose.addEventListener("click",function()
        {
            tanchuang.style.display=`none`;
        })
    }
    cannotUser();


    //修改
    function infoConfig()
    {
        //设置所有框不可被用户修改
        texts.forEach(item=>{
            item.disabled=`disabled`;
        })
        //修改和暂存
        let config1=document.getElementById("config1");
        let config2=document.getElementById("config2");
        let config3=document.getElementById("config3");
        let save1=document.getElementById("save1");
        let save2=document.getElementById("save2");
        let save3=document.getElementById("save3");
        config1.addEventListener("click",function()
        {
            texts[0].disabled=``;
        })
        config3.addEventListener("click",function()
        {
            texts[3].disabled=``;
        })
        save1.addEventListener("click",function()
        {
            texts[0].disabled=`disabled`;
        })
        save3.addEventListener("click",function()
        {
            texts[3].disabled=`disabled`;
        })
        config2.addEventListener("click",function()
        {
            if(texts[2].value<100000000000000&&texts[2].value>=0)
            {
                texts[2].value=Number(texts[2].value)+1000;
            }
            else if(texts[2].value>=100000000000000)
            {
                alert("艺元豆最大就这么大了,不能再加了,你太贪了")
            }
        })
        save2.addEventListener("click",function()
        {
            if(texts[2].value<=100000000000000&&texts[2].value>0)
            {
                texts[2].value=Number(texts[2].value)-1000;
            }
            else if(texts[2].value<=0)
            {
                alert("艺元豆不能为负数")
            }
        })

        //提交信息与取消操作
        let submit=document.getElementById("submit");
        let cancel=document.getElementById("cancel");
        submit.addEventListener("click",function()
        {
            let name=texts[0].value;
            let yyd=texts[2].value;
            let sentence=texts[3].value;
            let sex=null;
            if(sexradio[0].checked==true){sex="男";}
            else if(sexradio[1].checked==true){sex="女";}
            else{sex="未知";}
            
            //发送请求
            let xhr=null;
            xhr=new XMLHttpRequest();
            let url="http://127.0.0.1:80/userConfig";
            xhr.open('GET',`${url}?rname=${name}&ryyd=${yyd}&rsentence=${sentence}&rsex=${sex}`);
            xhr.send();
            xhr.onreadystatechange=function()
            {
                if(xhr.readyState==4)
                {
                    if(xhr.status>=200&&xhr.status<300)
                    {
                        alert(this.response);
                    }
                }
            }
        });
        cancel.addEventListener("click",function()
        {
            window.location.reload()
        });
    }
    infoConfig();
}