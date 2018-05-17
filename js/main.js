window.onload=function(){
	var oKbd=document.getElementById('kbd');
	var aInput=document.getElementsByTagName('input');
	var oKeys={
		'num':['1','2','3','4','5','6','7','8','9','0'],
		'top':['q','w','e','r','t','y','u','i','o','p'],
		'mid':['a','s','d','f','g','h','j','k','l'],
		'bot':['z','x','c','v','b','n','m']
	};
	var oWeb={
		'1':'163.com',
		'4':'4399.com',
		c:'zhaopin.com',
		q:'qq.com',
		w:'weibo.com',
		e:'ele.me',
		r:'iqiyi.com',
		t:'taobao.com',
		y:'douyu.com',
		d:'douban.com',
		j:'jianshu.com',
		b:'bilibili.com',
		x:'xiedaimala.com',
		z:'zhihu.com',
		s:'sina.com.cn',
		a:'alipay.com'
	};
	if(localStorage.getItem('websites')){
		oWeb=JSON.parse(localStorage.getItem('websites'));
	}
	var isOpen=true;
	aInput[0].onfocus=function(){
		isOpen=false;
	}
	aInput[0].onblur=function(){
		isOpen=true;
	}
	aInput[1].onclick=function(){
		window.open('https://www.baidu.com/s?wd='+aInput[0].value,'_blank');
	}
	aInput[2].onclick=function(){
		window.open('https://www.google.com/search?q='+aInput[0].value,'_blank');
	}
	document.onkeypress=function(ev){
		var ev=ev || window.event;
		if(oWeb[ev.key] && isOpen){
			window.open('http://'+oWeb[ev.key],'_blank');
		}
		if(!isOpen && ev.keyCode==13){
			window.open('https://www.baidu.com/s?wd='+aInput[0].value,'_blank');
		}
	}
	for(var key in oKeys ){
		oDiv=document.createElement('div');
		for(var i=0;i<oKeys[key].length;i++){
			eleKbd=document.createElement('kbd');
			eleKbd.innerText=oKeys[key][i];
			eleKbd.text=oKeys[key][i];
			createBtn('E','编辑','btn1',eleKbd);
			if(oWeb[eleKbd.text]){			
				createBtn('D','删除','btn2',eleKbd);
				createIco(eleKbd,oWeb);
			}
			eleKbd.onmouseenter=function(){
				aBtn=this.getElementsByTagName('button');
				aBtn[0].style.display='inline-block';
				if(aBtn[1]){
					aBtn[1].style.display='inline-block';
				}
			}
			eleKbd.onmouseleave=function(){
				aBtn=this.getElementsByTagName('button');
				aBtn[0].style.display='none';
				if(aBtn[1]){
					aBtn[1].style.display='none';
				}
			}
			eleKbd.onclick=function(ev){
				var ev=ev || window.event;
				if(oWeb[this.text] && ev.target.tagName=='KBD'){
					window.open('http://'+oWeb[this.text],'_blank');
				}else if(ev.target.className == 'btn1'){
					var uri=prompt('请输入一个网址');
					if(uri){					
						if(uri.indexOf('//')>=0){
							uri=uri.substring(uri.indexOf('//')+2);
						}
						oWeb[this.text]=uri;
						localStorage.setItem('websites',JSON.stringify(oWeb));
						if(this.getElementsByTagName('button').length==1){
							createBtn('D','删除','btn2',this);
						}
						createIco(this,oWeb);
					}
				}else if(ev.target.className == 'btn2'){
					oWeb[this.text]=undefined;
					localStorage.setItem('websites',JSON.stringify(oWeb));
					this.removeChild(ev.target);
					if(this.getElementsByTagName('img').length>0){
						this.removeChild(this.getElementsByTagName('img')[0]);
					}
				}
			}

			oDiv.appendChild(eleKbd);
		}
		oKbd.appendChild(oDiv);
	}
}

function createBtn(text,title,className,parent){
	var obj=document.createElement('button');
	obj.innerText=text;
	obj.title=title;
	obj.className=className;
	parent.appendChild(obj);
}
function createIco(oKbd,oWeb){
	var idx=oWeb[oKbd.text].indexOf('/')==-1?oWeb[oKbd.text].length:oWeb[oKbd.text].indexOf('/');
	var newImg=new Image();
	newImg.parent=oKbd;
	if(oKbd.getElementsByTagName('img').length>0){
		newImg.onload=function(){
			var oImg=this.parent.getElementsByTagName('img')[0];
			oImg.src='http://'+oWeb[this.parent.text].substr(0,idx)+'/favicon.ico';
		}
	}else{
		var oImg=document.createElement('img');
		oImg.width=16;
		oImg.src='../images/logo.png';
		oKbd.appendChild(oImg);
		newImg.onload=function(){
			oImg.src='http://'+oWeb[this.parent.text].substr(0,idx)+'/favicon.ico';
		}
	}
	newImg.src='http://'+oWeb[oKbd.text].substr(0,idx)+'/favicon.ico';
}