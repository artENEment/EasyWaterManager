window.onload=function()
{
    
    //挂载按钮事件
    let icon=document.querySelector('.icon');
    let navfont=document.querySelector('.navfont');
    icon.addEventListener('click',function()
    {
        iframe.src='./video.html';
    })
    navfont.addEventListener('click',function()
    {
        iframe.src='./video.html';
    })
    let iframe=document.querySelector('iframe')
    let btns=document.querySelectorAll('.navele');
    let logincondition=document.querySelector("#logincondition");
    // btns[4].addEventListener('click',function()
    // {
    //     iframe.src='./login.html';
    // })
    let pages=["./bcsj.html","./yycj.html","./bzzs.html","./kfry.html","./login.html"];
    for(let i=0;i<pages.length;i++)
    {
        
        btns[i].addEventListener("click",function()
        {
            iframe.src=pages[i];
            if(i==4)
            {
                
            }
        })
    }
    btns[5].addEventListener("click",function()
    {
        if(logincondition.innerHTML=="未登录")
        {
            iframe.src="./login.html";
        }
        else
        {
            iframe.src="./user.html"
        }
    })
    //实时更新用户是否登录
    function upgrade()
    {
        let xhr=null;
        xhr=new XMLHttpRequest();
        xhr.open('GET',"http://127.0.0.1:80/home");
        xhr.send();
        xhr.onreadystatechange=function()
        {
            if(xhr.readyState==4)
            {
                if(xhr.status>=200&&xhr.status<300)
                {
                    
                    if(this.response)
                    {
                        let loginUser=JSON.parse(this.response);
                        logincondition.innerHTML=loginUser.user;
                        console.log(loginUser.user);
                        clearInterval(upgradeTimer);
                    }
                    else
                    {
                        console.log("未登录");
                    }
                }
            }
        }
    }
    upgrade();
    let upgradeTimer=setInterval(upgrade,1000);

    //发个请求测试一下服务器
    function myAjax(url)
    {
        let xhr=new XMLHttpRequest();
        xhr.open('GET',url);
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
    icon.addEventListener("click",myAjax('http://110.40.171.87:80/myserver'))
}