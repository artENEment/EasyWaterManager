window.onload=function()
{
    //ui初始化
    let left=document.querySelector('.left');
    let right=document.querySelector('.right');
    let create=document.querySelector('.create');
    let rightmessage=document.querySelector('.rightmessage');
    let inputs=document.querySelectorAll('input');
    let spans=document.querySelectorAll('span');
    let signup=document.querySelector('.signup');
    //切换注册与登录
    left.children[3].addEventListener('click',function()
    {
        inputs.forEach(item=>{
            item.value="";
        })
        spans[0].innerHTML='Name';
        spans[1].innerHTML='User';
        spans[2].innerHTML='Password';
        if(left.children[3].innerHTML==='SIGN IN')
        {
            left.children[0].innerHTML='你好朋友';
            left.children[1].innerHTML='填写你的基本信息,管理水务';
            left.children[2].innerHTML='';
            left.children[3].innerHTML='SIGN UP';
            create.innerHTML='登录';
            rightmessage.innerHTML='输入用户名，密码';
            inputs[0].style.display=`none`;
            spans[0].style.display=`none`;
            signup.innerHTML='SIGN IN'
            left.style.transform=`translateX(100%)`;
            right.style.transform=`translateX(-100%)`;
            left.style.borderRadius=`0 1vw 1vw 0`;
            right.style.borderRadius=`1vw 0 0 1vw`;
        }
        else
        {
            left.children[0].innerHTML='欢迎回来';
            left.children[1].innerHTML='登录您的账户,管理水务';
            left.children[2].innerHTML='很高兴为您服务';
            left.children[3].innerHTML='SIGN IN';
            create.innerHTML='创建账户';
            rightmessage.innerHTML='输入昵称，用户名，密码';
            inputs[0].style.display=`block`;
            spans[0].style.display=`block`;
            signup.innerHTML='SIGN UP'
            left.style.transform=`translateX(0)`;
            right.style.transform=`translateX(0)`;
            left.style.borderRadius=`1vw 0 0 1vw`;
            right.style.borderRadius=`0 1vw 1vw 0`;
        }
    })
    //输入时提示消失
    for(let i=0;i<inputs.length;i++)
    {
        inputs[i].onfocus=function()
        {
            spans[i].innerHTML='';
        }
        inputs[i].onblur=function()
        {
            if(inputs[i].value=='')
            {
                spans[i].style.display='inline';
                if(i==0)
                {
                    spans[i].innerHTML='Name';
                }
                else if(i==1)
                {
                    spans[i].innerHTML='User';
                }
                else
                {
                    spans[i].innerHTML='Password';
                }
            }
        }
    }
    
    //接受后端登录注册响应
    function SignInUp()
    {
        let N=inputs[0].value;
        let U=inputs[1].value;
        let P=inputs[2].value;
        //注册
        if(signup.innerHTML=='SIGN UP'){
            let xhr=new XMLHttpRequest();
            let url='http://127.0.0.1:80/signup';
            xhr.open('GET',`${url}?name=${N}&user=${U}&password=${P}`);
            xhr.send();
            xhr.onreadystatechange=function()
            {
                if(xhr.readyState==4)
                {
                    if(xhr.status>=200&&xhr.status<300)
                    {
                        TanChuang(xhr.response);
                    }
                }
            }
        }
        //登录
        else
        {
            let xhr=new XMLHttpRequest();
            let url='http://127.0.0.1:80/signin';
            xhr.open('GET',`${url}?user=${U}&password=${P}`);
            xhr.send();
            xhr.onreadystatechange=function()
            {
                if(xhr.readyState==4)
                {
                    if(xhr.status>=200&&xhr.status<300)
                    {
                        alert(xhr.response);
                    }
                }
            }
        }
    }
    
    //登陆弹窗
    function TanChuang(message)
    {
        //创建弹窗
        let tanchuang=document.createElement("div");
        document.body.appendChild(tanchuang);
        tanchuang.style.width=`60%`;
        tanchuang.style.height=`200px`;
        tanchuang.style.backgroundColor=`#e8f3ed`;
        tanchuang.style.position=`absolute`;
        tanchuang.style.display=`flex`;
        tanchuang.style.justifyContent=`center`;
        tanchuang.style.alignItems=`center`;
        tanchuang.style.flexDirection=`column`;
        //创建弹窗按钮
        let btn=document.createElement("button");
        btn.innerHTML=`关闭`;
        btn.style.position=`absolute`;
        btn.style.right=`0px`;
        btn.style.top=`0px`;
        btn.style.width=`10%`;
        btn.style.backgroundColor=`red`;
        btn.style.color=`white`;
        btn.style.border=`none`;
        btn.style.borderRadius=`5vh`;
        btn.style.fontFamily=`Georgia, serif`;
        btn.style.cursor=`pointer`;
        btn.onclick=function()
        {
            tanchuang.style.display=`none`;
        }
        tanchuang.appendChild(btn);
        //创建弹窗文本
        let passage=document.createElement("p");
        passage.innerHTML=message;
        passage.style.fontFamily=`Georgia, serif`;
        passage.style.fontSize=`25px`;
        tanchuang.appendChild(passage);
        passage.innerHTML+="<br>三秒后自动关闭";
        //三秒后自动关闭
        setTimeout(() => {
            tanchuang.style.display=`none`;
        }, 3000);
    }


    //注册点击登录事件
    signup.addEventListener('click',SignInUp);
    document.onkeyup = function(e) {
        // 兼容FF和IE和Opera
        var event = e || window.event;
        var key = event.which || event.keyCode || event.charCode;
        if (key == 13) {
          /*Do something. 调用一些方法*/ 
          SignInUp();
        }
      };
    
}
