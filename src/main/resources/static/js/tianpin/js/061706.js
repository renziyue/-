$(function(){
	imgLazyloadLib();
	//代码创建一个遮罩层，用于做加载动画
	//setScroll();
	setEventListen();
})
$(window).load(function(){
	diyAutoHeight();
	imgLazyloadLib();
});
$(window).resize(function(){
	if(window.resizeTimeout)window.clearTimeout(window.resizeTimeout);
	window.resizeTimeout=setTimeout(function(){
		diyAutoHeight();
	},350);
});
function imgLazyloadLib(obj){
	if(obj){
		obj.lazyload({event:'scroll mouseover',effect: "fadeIn",threshold:0,failure_limit:80,skip_invisible:false,load:function(){
			var father=$(this).parents('.view').first();
			if(father.length>0){
				setTimeout(function(){diyAutoHeight(father);},500);
			}else{
				father=$(this).parents('.layout').first();
				if(father.length>0){
					setTimeout(function(){diyAutoHeight(father);},500);
				}
			}
		}});
	}else{
		$("img").lazyload({event:'scroll mouseover',effect: "fadeIn",threshold:0,failure_limit:80,skip_invisible:false,load:function(){
			var father=$(this).parents('.view').first();
			if(father.length>0){
				setTimeout(function(){diyAutoHeight(father);},500);
			}else{
				father=$(this).parents('.layout').first();
				if(father.length>0){
					setTimeout(function(){diyAutoHeight(father);},500);
				}
			}
		}});
	}
}
var scrollTime=300;
function setEventListen(){
	$(".ev_c_scrollTop").click(function(){
		//滚动到顶部
		//$("html").getNiceScroll().resize();
		//$("html").getNiceScroll(0).doScrollTop(0);
		$("html,body").stop().animate({scrollTop:"0px"},window.scrollTime);
	});
	$(".ev_c_scrollView").click(function(){
		//鼠标点击：滚动到模块位置
		var settings=settingsLib($(this));
		var viewid=settings.getSetting('eventSet.scrollView');
		if($("#"+viewid).length>0){
			//$("html").getNiceScroll().resize();
			//$("html").getNiceScroll(0).doScrollTop($("#"+viewid).offset().top);
			$("html,body").stop().animate({scrollTop:$("#"+viewid).offset().top+"px"},window.scrollTime);
		}
	});
	$(".ev_c_showView").click(function(){
		//鼠标点击：显示模块
		showEventView($(this));
	});
	$(".ev_c_hidView").click(function(){
		//鼠标点击：隐藏模块
		hidEventView($(this));
	});
	$(".ev_c_tabView").click(function(){
		//鼠标点击：显示与隐藏模块
		showHidEventView($(this));
	});
	$(".ev_m_tabView").hover(function(){
		//鼠标点击：显示与隐藏模块
		showHidEventView($(this));
	});
	$(".view").click(function(){
		$(this).children(".view_contents").addClass("diyCurTab");
		var settings=settingsLib($(this));
		var unitViewSet=settings.getSetting('unitViewSet');
		if(unitViewSet&&unitViewSet.length>0){
			for(key in unitViewSet){
				$("#"+unitViewSet[key]).children(".view_contents").removeClass("diyCurTab");
			}
		}
	});
}
function showHidEventView(obj){
	var settings=settingsLib(obj);
	var showViews=settings.getSetting('eventSet.showViews');
	var hidViews=settings.getSetting('eventSet.hidViews');
	if(!showViews)showViews=new Array();
	if(!hidViews)hidViews=new Array();
	var doubleKey=new Array();
	//获取重复值
	if(showViews.length>0){
		for(s_key in showViews){
			if(hidViews.length>0){
				for(h_key in hidViews){
					if(showViews[s_key]==hidViews[h_key]){
						doubleKey.push(showViews[s_key]);
					}
				}
			}
		}
	}
	//隐藏
	if(hidViews.length>0){
		for(key in hidViews){
			if($.inArray(hidViews[key],doubleKey)<0){
				$("#"+hidViews[key]).css({"display":"none"});
				diyAutoHeight($("#"+hidViews[key]));
			}
		}
	}
	//显示
	if(showViews.length>0){
		for(key in showViews){
			if($.inArray(showViews[key],doubleKey)<0){
				$("#"+showViews[key]).css({"display":"block"});
				diyAutoHeight($("#"+showViews[key]));
			}
		}
	}
	//双向显示
	if(doubleKey.length>0){
		for(key in doubleKey){
			if($("#"+doubleKey[key]).length>0){
				if($("#"+doubleKey[key]).is(":hidden")){
					$("#"+doubleKey[key]).css({"display":"block"});
					diyAutoHeight($("#"+doubleKey[key]));
				}else{
					$("#"+doubleKey[key]).css({"display":"none"});
					diyAutoHeight($("#"+doubleKey[key]));
				}
			}
		}
	}
}
function showEventView(obj){
	var settings=settingsLib(obj);
	var showViews=settings.getSetting('eventSet.showViews');
	if(!showViews)showViews=new Array();
	if(showViews.length>0){
		for(key in showViews){
			$("#"+showViews[key]).css({"display":"block"});
			diyAutoHeight($("#"+showViews[key]));
		}
	}
}
function hidEventView(obj){
	var settings=settingsLib(obj);
	var hidViews=settings.getSetting('eventSet.hidViews');
	if(!hidViews)hidViews=new Array();
	if(hidViews.length>0){
		for(key in hidViews){
			$("#"+hidViews[key]).css({"display":"none"});
			diyAutoHeight($("#"+hidViews[key]));
		}
	}
}
function getPageScrollTop(){
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	return scrollTop;
}
function getNowPage(){
	var width=$(window).width();
	var max_width=window.DIY_PAGE_SIZE;
	max_width=parseFloat(max_width);
	if(isNaN(max_width))max_width=1200;
	if(width>=max_width){
		return 'pc';
	}else if(width>=640){
		return 'pad';
	}else{
		return 'mobile';
	}
}
$(window).scroll(function(){
    var scrollTop=getPageScrollTop();
    var nowPage=getNowPage();
    if($(".scrollToTop_"+nowPage).length>0){
    	$(".scrollToTop_"+nowPage).each(function(){
    		var old_top=$(this).attr("old_top_"+nowPage);
    		var old_left=$(this).attr("old_left_"+nowPage);
    		var old_width=$(this).attr("old_width_"+nowPage);
    		if(!old_top||old_top==""){
    			old_top=$(this).offset().top;
    			$(this).attr("old_top_"+nowPage,old_top);
    		}
    		if(!old_left||old_left==""){
    			old_left=$(this).offset().left;
    			$(this).attr("old_left_"+nowPage,old_left);
    		}
    		if(!old_width||old_width==""){
    			old_width=$(this).width();
    			$(this).attr("old_width_"+nowPage,old_width);
    		}
    		old_top=parseFloat(old_top);
    		old_left=parseFloat(old_left);
    		old_width=parseFloat(old_width);
    		if(scrollTop>=old_top){
    			$(this).css({"position":"fixed","z-index":9999999,"top":"0px","width":old_width+"px","left":old_left+"px"});
    			$(this).parents(".view").css({"z-index":9999999});
    			//$(this).parents(".view").children(".view_contents").css({"overflow":"visible"});
    			$(this).parents(".layout").css({"z-index":9999999});
    			//$(this).parents(".layout").children(".view_contents").css({"overflow":"visible"});
    		}else{
    			$(this).css({"position":"","z-index":"","top":"","width":"","left":""});
    			$(this).parents(".view").css({"z-index":""});
    			//$(this).parents(".view").children(".view_contents").css({"overflow":""});
    			$(this).parents(".layout").css({"z-index":""});
    			//$(this).parents(".layout").children(".view_contents").css({"overflow":""});
    			$(this).attr("old_top_"+nowPage,null);
    			$(this).attr("old_left_"+nowPage,null);
    			$(this).attr("old_width_"+nowPage,null);
    		}
    	});
    }
});
function diyAutoHeight(obj){
	if(obj&&obj.length>0){
		//针对选项卡做特殊处理
		if(obj.children(".view_contents").children("form").length>0){
			if(obj.children(".view_contents").children("form").children(".view").length>0){
				obj.children(".view_contents").children("form").children(".view").each(function(){
					if($(this).is(":visible")){
						diyAutoHeightDo($(this));
						return false;
					}
				});
			}else{
				diyAutoHeightDo(obj);
			}
		}else if(obj.children(".view_contents").children(".niceTab").find(".niceTabShow").length>0){
			if(obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").length>0){
				obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").each(function(){
					if($(this).is(":visible")){
						diyAutoHeightDo($(this));
						return false;
					}
				});
			}else{
				diyAutoHeightDo(obj);
			}
		}else{
			diyAutoHeightDo(obj);
		}
	}else{
		setTimeout(function(){
			$(".view").each(function(){
				if(!$(this).hasClass("includeBlock")){
					diyAutoHeightDo($(this));
				}
			});
		},500);
	}
}
function diyAutoHeightFatherDo(father,obj){
	var settings=settingsLib(father);
	var autoHeight=settings.getSetting('autoHeight');
	if(autoHeight&&autoHeight=="true"){
		//开启了允许自动高度
		var minHeight=obj.offset().top+obj.height()-father.offset().top;
		if(obj.siblings(".view").length>0){
			obj.siblings(".view").each(function(){
				if($(this).is(":visible")){
					var tempHeight=$(this).offset().top+$(this).height()-father.offset().top;
					if(tempHeight>minHeight){
						minHeight=tempHeight;
					}
				}
			});
		}
		father.css({"height":minHeight+"px"});
		diyAutoHeightDo(father);
	}
}
function diyAutoHeightDo(obj){
	if(obj.is(":visible")){
		var father=obj.parents(".view").first();
		if(father.length<=0)father=obj.parents(".layout").first();
		if(father.length>0){
			var settings=settingsLib(father);
			var autoHeight=settings.getSetting('autoHeight');
			if(autoHeight&&autoHeight=="true"){
				if(father.offset().top+father.height()<obj.offset().top+obj.height()){
					father.css({"height":(obj.offset().top+obj.height()-father.offset().top)+"px"});
					diyAutoHeightDo(father);
				}else{
					diyAutoHeightFatherDo(father,obj);
				}
			}
		}
	}
}
function setScroll(){
	if(typeof($("html").niceScroll)=="function"){
		$("html").niceScroll({zindex:99999,cursoropacitymax:0.8,cursoropacitymin:0.3,horizrailenabled:false,mousescrollstep:60,smoothscroll:true});	
	}else{
		setTimeout(setScroll,500);
	}
}
var settingsLib=function(view){
	var main={
		view:null,
		setup:function(obj){
			if(window.viewsSettings&&window.viewsSettings[obj.attr("id")]){
				this.init(window.viewsSettings[obj.attr("id")]);
				this.view=obj;
			}else{
				this.init({});
			}
		},
		init:function(obj){
			if(typeof(obj)=='object'){
				this.settings=obj;
			}else if(obj!=""){
				eval('if(typeof('+obj+')=="object"){this.settings='+obj+';}else{this.settings={};}');
			}else{
				this.settings={};
			}
		},
		setSetting:function(k,v){
			if(!this.settings){
				this.settings={};	
			}
			var keyArray=k.split(".");
      		var val='this.settings';
			for (key in keyArray){
				if(keyArray[key]&&keyArray[key]!=''){
					if(eval(val+'["'+keyArray[key]+'"]')){
						val=val+'["'+keyArray[key]+'"]';
					}else{
						eval(val+'["'+keyArray[key]+'"]={}');
						val=val+'["'+keyArray[key]+'"]';
					}
				}
			}
			if(v==null){
				eval("delete "+val);		
			}else{
				eval(val+"=v");
			}
		},
		getSetting:function(key){
			if(!this.settings){
				this.settings={};	
			}
			if(key){
				var keyArray=key.split(".");
				var val='this.settings';
				for (key in keyArray){
					if(keyArray[key]&&keyArray[key]!=''){
						if(eval(val+'["'+keyArray[key]+'"]')){
							val=val+'["'+keyArray[key]+'"]';
							continue;
						}else{
							val=null;
							break;
						}
					}
				}
				return eval(val);
			}else{
				return this.settings;	
			}
		},
		saveSettings:function(obj){
			if(typeof(obj)=="object"&&this.settings&&obj.hasClass("view")){
				window.viewsSettings[obj.attr("id")]=this.settings;
			}else if(this.view&&typeof(this.view)=="object"&&this.settings&&this.view.hasClass("view")){
				window.viewsSettings[this.view.attr("id")]=this.settings;
			}
		}
	};
	if(view){
		main.view=view;
		main.setup(view);	
	}
	return main;
}

function GetUrlPara(){
	var url = document.location.toString();
	var arrUrl = url.split("?");
	var paras='';
	if(arrUrl.length>1){
		var para = arrUrl[1];
		var arrUrl2=para.split("&");
		arrUrl2.forEach(function(e){
			if(e.indexOf("mod=")>=0||e.indexOf("act=")>=0||e.indexOf("#")>=0){
				 return;  
			}else{
				paras+=e+"&";
			}
		})
	}
	return paras;
}

function RequestURL(viewid, sys_url, moreParams){
	var serverUrl = 'http://'+DIY_JS_SERVER+'/sysTools.php?mod=viewsConn&rtype=json&idweb='+DIY_WEBSITE_ID+'&'+sys_url;
	var settings = settingsLib($("#"+viewid));
	var params = "";
	if(settings && settings.getSetting("data")){
		$.each(settings.getSetting("data"), function(key, val){
			if($.isArray(val)){
				$.each(val, function(key2, val2){
					params += "&"+key+"[]="+val2;
				});
			}else{
				params += "&"+key+"="+val;
			}
		});
		if(params) serverUrl += params;
	}
	var params2 = GetUrlPara();
	if(params2) serverUrl += "&" + params2;
	if(moreParams) serverUrl += "&" + moreParams;
	var scriptString = "<scr"+"ipt type='text/javascript' src="+serverUrl+"></scr"+"ipt>";
	//$.ajaxSettings.async = false; 
	$.ajax({
	  dataType: 'json',
	  url: serverUrl,
	  xhrFields:{withCredentials:true},
	  success: function(result){
		if(result.error) alert(result.error);
		else{
			if(typeof(history.replaceState) != 'undefined'){
				var obj={};
				var hstate=JSON.stringify(history.state);
				if(hstate!='null'&& hstate!=null){
					eval('var hjson = ' + hstate);
					obj=hjson;
				}
				var key="moreParams"+viewid;
				obj[key]=moreParams;
				//var strparam=viewid+":"+moreParams;
				//history.replaceState({("moreParams"+viewid):moreParams},"","");
				history.replaceState(obj,"","");
			}
			$("#"+viewid).children(".view_contents").html(result.html);
			$("#"+viewid).children(".view_contents").show();
			setTimeout(function(){
				diyAutoHeight($("#"+viewid));
			},500);
		}
	}});
	setTimeout(function(){commDefault_isFT();},500);
	function commDefault_isFT(){
		var based_Obj= document.getElementById("based");
		var currentlang_Obj= document.getElementById("currentlang");//当前语言
		console.log(Request('chlang'))
		$(function(){
			if (based_Obj){
				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
				switch( Request('chlang') ){
					case "cn-tw":
						BodyIsFt= getCookie(JF_cn)=="1"? 0 : 1;
						delCookie(JF_cn);
						SetCookie(JF_cn, BodyIsFt, 7);
						break; 
					case "cn":
					case "en": 
						BodyIsFt= 0; 
						delCookie(JF_cn);
						SetCookie(JF_cn, 0, 7);
						currentlang_Obj.innerHTML = "简体中文";
						break;
					case "tw": 
						BodyIsFt= 1; 
						delCookie(JF_cn);
						SetCookie(JF_cn, 1, 7);
						currentlang_Obj.innerHTML = "繁體中文"; //因为是繁体 你写简体也会被转化成繁体  所以这儿只能写繁体 2015-1-16
						break;
					default: 
						if (typeof Default_isFT!='undefined' && Default_isFT){ //如果默认繁体
							if(getCookie(JF_cn)==null){
								BodyIsFt= 1;
								SetCookie(JF_cn, 1, 7);
								break;
							}
						}
						BodyIsFt= parseInt(getCookie(JF_cn));
				}	
				if(BodyIsFt===1){
					StranBody();
					document.title = StranText(document.title);
				}else{
					StranBodyce();
					document.title = StranTextce(document.title);
				}
			}else{
				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
				if(Default_isFT){
					BodyIsFt= 1; 
					delCookie(JF_cn);
					SetCookie(JF_cn, 1, 7);
					StranBody();
					document.title = StranText(document.title);
				}else{
					BodyIsFt= 0; 
					delCookie(JF_cn);
					SetCookie(JF_cn, 0, 7);
					/*StranBodyce();
					document.title = StranTextce(document.title);*/
				}
			}
			
		});
	}
	/*
	$.getJSON(serverUrl, function(result){
		if(result.error) alert(result.error);
		else{
			$("#"+viewid).children(".view_contents").html(result.html);
			$("#"+viewid).show();
			setTimeout(function(){
				diyAutoHeight($("#"+viewid));
			},500);
		}
	});*/
	//$("#"+viewid).append(scriptString);
}
//导航公共监听函数
function setDhListen(style,obj,params){
	var father=$(obj).parents(".dh").first();
	if(father.length>0){
		switch(style){
			case 'style_01':
				father.find(".miniMenu").toggleClass("Mslide");
	            if($("body").css("position")=="relative"){
	                $("body").css({"position":"fixed","width":"100%"});
	            }else{
	                $("body").css({"position":"relative","width":"100%"});
	            }
				break;
			case 'style_02':
				if(params=="open"){
					father.find(".Style_02_miniMenu .menuMain").css("display","block");
				}else{
					father.find(".Style_02_miniMenu .menuMain").css("display","none");
				}
				break;
			case 'style_03':
				if(params=="mobi_more"){
					$(obj).parent().siblings(".mobi_menuUl02").toggle();
				}else if(params=="m_icoFont"){
					$(obj).parents(".mobi_main").hide();
				}else if(params=="mobi_top"){
					$(obj).siblings(".mobi_main").show();
				}
				break;
			case 'style_04':
				var width = $(window).width();
                var newW = width+18;
                father.find(".newWidth").css("width",newW);
                father.find(".miniMenu").toggleClass("Mslide");
                if($("body").css("position")=="relative"){
                    $("body").css({"position":"fixed","width":"100%"});
                }else{
                    $("body").css({"position":"relative","width":"100%"});
                }
				break;
		}
	}
}
//-------------选项卡-----------------------------------------------
//鼠标左右拖拽事件
function setScroll_Choice(tabId){
	if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) return;
	if(typeof($(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll)=="function"){
		$(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll({zIndex:99999,cursoropacitymax:0,cursoropacitymin:0,horizrailenabled:true,autohidemode:true,touchbehavior:true});
	}else{
		setTimeout(setScroll_Choice,500);
	}
}

/*鼠标悬浮效果*/
function setHover_Choice(tabId){
	$(".tab_nav .tab_li", $("#"+tabId)).unbind('hover');
	$(".tab_nav .tab_li", $("#"+tabId)).hover(function(){
		var index = $(this).index();
		$(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
	});
}
/*鼠标点击效果*/
function setClick_Choice(tabId){
	$(".tab_nav .tab_li", $("#"+tabId)).unbind('click');
	$(".tab_nav .tab_li", $("#"+tabId)).click(function(){
		var index = $(this).index();
		$(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
	});
}
/*自动播放*/
function setAnimat_int(tabId,time){
	if(!time)time=5;
	time=time*1000;
	var viewid=tabId.substr(4);

	if(!window.tabConfigAnimat)window.tabConfigAnimat={};
	//初始化
	window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);

	$("#"+viewid).mousemove(function(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
	});
	$("#"+viewid).mouseover(function(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
	});
	$("#"+viewid).mouseout(function(){
		window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);
	});

	function doAnimat(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
		var index=$(".tab_nav .tabCurItem", $("#"+tabId)).index();
		index=index+1;
		if(index>=$(".tab_nav .tab_li", $("#"+tabId)).length){
			index=0;
		}
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
		window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);
	}
}
//获取鼠标拖拽区域的总宽度
function tab_style03_init(tabId){
	var total=0;
	var obj=$(".tab_li", $("#"+tabId));
	$(".tab_li", $("#"+tabId)).each(function(){
		total+=$(this).width();
	});
	$(".tab_ul_top", $("#"+tabId)).css("width",total+"px");
	$(".tab_ul_bottom", $("#"+tabId)).css("width",total+"px");

	//向左滚动图标事件
	$(".tab_left_arrow", $("#"+tabId)).unbind('click');
	$(".tab_left_arrow", $("#"+tabId)).click(function(){
		var index = $(".tab_nav .tabCurItem", $("#"+tabId)).index();
		index = index-1;
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
	});

	//向右滚动图标事件
	$(".tab_right_arrow", $("#"+tabId)).unbind('click');
	$(".tab_right_arrow", $("#"+tabId)).click(function(){
		var index = $(".tab_nav .tabCurItem", $("#"+tabId)).index();
		var len = $(".tab_nav .tab_li").length;
		index = index+1;
		if(index >= len){
			index = 0;
		}
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
	});
	setScroll_Choice(tabId);
}
function StranBody(fobj){
	var obj= fobj ? fobj.childNodes : document.body.childNodes;
	for(var i=0;i<obj.length;i++){
		var OO=obj.item(i);
		if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO==based_Obj)continue;
		if(OO.title!=""&&OO.title!=null)OO.title=StranText(OO.title);
		if(OO.alt!=""&&OO.alt!=null)OO.alt=StranText(OO.alt);
		if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=StranText(OO.value);
		if(OO.nodeType==3){OO.data=StranText(OO.data)}
		else StranBody(OO)
	}
	
	try{
		var based_Obj2= document.getElementById("based2");
		if(!based_Obj2) { //简繁
			based_Obj.innerHTML = BodyIsFt==1? "简体中文":"繁体中文";
		}else{ //简繁英
			based_Obj.innerHTML = "繁体中文";
			based_Obj2.innerHTML = "简体中文";
		}
	}catch(e){}
}
function StranBodyce(fobj){
	var obj= fobj ? fobj.childNodes : document.body.childNodes;
	for(var i=0;i<obj.length;i++){
		var OO=obj.item(i);
		if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO==based_Obj)continue;
		if(OO.title!=""&&OO.title!=null)OO.title=StranTextce(OO.title);
		if(OO.alt!=""&&OO.alt!=null)OO.alt=StranTextce(OO.alt);
		if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=StranTextce(OO.value);
		if(OO.nodeType==3){OO.data=StranTextce(OO.data)}
		else StranBodyce(OO)
	}
	try{
		var based_Obj2= document.getElementById("based2");
		if(!based_Obj2) { //简繁
			based_Obj.innerHTML = BodyIsFt==1? "简体中文":"繁体中文";
		}else{ //简繁英
			based_Obj.innerHTML = "繁体中文";
			based_Obj2.innerHTML = "简体中文";
		}
	}catch(e){}
}
function StranText(txt){
	if(txt==""||txt==null)return "";
	return Traditionalized(txt);
}
function StranTextce(txt){
	if(txt==""||txt==null)return "";
	return Traditionalizedce(txt);
}
function JTPYStr(){
	return '皑蔼碍爱翱袄奥坝罢摆败颁办绊帮绑镑谤剥饱宝报鲍辈贝钡狈备惫绷笔毕毙闭边编贬变辩辫鳖瘪濒滨宾摈饼拨钵铂驳卜补参蚕残惭惨灿苍舱仓沧厕侧册测层诧搀掺蝉馋谗缠铲产阐颤场尝长偿肠厂畅钞车彻尘陈衬撑称惩诚骋痴迟驰耻齿炽冲虫宠畴踌筹绸丑橱厨锄雏础储触处传疮闯创锤纯绰辞词赐聪葱囱从丛凑窜错达带贷担单郸掸胆惮诞弹当挡党荡档捣岛祷导盗灯邓敌涤递缔点垫电淀钓调迭谍叠钉顶锭订东动栋冻斗犊独读赌镀锻断缎兑队对吨顿钝夺鹅额讹恶饿儿尔饵贰发罚阀珐矾钒烦范贩饭访纺飞废费纷坟奋愤粪丰枫锋风疯冯缝讽凤肤辐抚辅赋复负讣妇缚该钙盖干赶秆赣冈刚钢纲岗皋镐搁鸽阁铬个给龚宫巩贡钩沟构购够蛊顾剐关观馆惯贯广规硅归龟闺轨诡柜贵刽辊滚锅国过骇韩汉阂鹤贺横轰鸿红后壶护沪户哗华画划话怀坏欢环还缓换唤痪焕涣黄谎挥辉毁贿秽会烩汇讳诲绘荤浑伙获货祸击机积饥讥鸡绩缉极辑级挤几蓟剂济计记际继纪夹荚颊贾钾价驾歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧浆蒋桨奖讲酱胶浇骄娇搅铰矫侥脚饺缴绞轿较秸阶节茎惊经颈静镜径痉竞净纠厩旧驹举据锯惧剧鹃绢杰洁结诫届紧锦仅谨进晋烬尽劲荆觉决诀绝钧军骏开凯颗壳课垦恳抠库裤夸块侩宽矿旷况亏岿窥馈溃扩阔蜡腊莱来赖蓝栏拦篮阑兰澜谰揽览懒缆烂滥捞劳涝乐镭垒类泪篱离里鲤礼丽厉励砾历沥隶俩联莲连镰怜涟帘敛脸链恋炼练粮凉两辆谅疗辽镣猎临邻鳞凛赁龄铃凌灵岭领馏刘龙聋咙笼垄拢陇楼娄搂篓芦卢颅庐炉掳卤虏鲁赂禄录陆驴吕铝侣屡缕虑滤绿峦挛孪滦乱抡轮伦仑沦纶论萝罗逻锣箩骡骆络妈玛码蚂马骂吗买麦卖迈脉瞒馒蛮满谩猫锚铆贸么霉没镁门闷们锰梦谜弥觅绵缅庙灭悯闽鸣铭谬谋亩钠纳难挠脑恼闹馁腻撵捻酿鸟聂啮镊镍柠狞宁拧泞钮纽脓浓农疟诺欧鸥殴呕沤盘庞国爱赔喷鹏骗飘频贫苹凭评泼颇扑铺朴谱脐齐骑岂启气弃讫牵扦钎铅迁签谦钱钳潜浅谴堑枪呛墙蔷强抢锹桥乔侨翘窍窃钦亲轻氢倾顷请庆琼穷趋区躯驱龋颧权劝却鹊让饶扰绕热韧认纫荣绒软锐闰润洒萨鳃赛伞丧骚扫涩杀纱筛晒闪陕赡缮伤赏烧绍赊摄慑设绅审婶肾渗声绳胜圣师狮湿诗尸时蚀实识驶势释饰视试寿兽枢输书赎属术树竖数帅双谁税顺说硕烁丝饲耸怂颂讼诵擞苏诉肃虽绥岁孙损笋缩琐锁獭挞抬摊贪瘫滩坛谭谈叹汤烫涛绦腾誊锑题体屉条贴铁厅听烃铜统头图涂团颓蜕脱鸵驮驼椭洼袜弯湾顽万网韦违围为潍维苇伟伪纬谓卫温闻纹稳问瓮挝蜗涡窝呜钨乌诬无芜吴坞雾务误锡牺袭习铣戏细虾辖峡侠狭厦锨鲜纤咸贤衔闲显险现献县馅羡宪线厢镶乡详响项萧销晓啸蝎协挟携胁谐写泻谢锌衅兴汹锈绣虚嘘须许绪续轩悬选癣绚学勋询寻驯训讯逊压鸦鸭哑亚讶阉烟盐严颜阎艳厌砚彦谚验鸯杨扬疡阳痒养样瑶摇尧遥窑谣药爷页业叶医铱颐遗仪彝蚁艺亿忆义诣议谊译异绎荫阴银饮樱婴鹰应缨莹萤营荧蝇颖哟拥佣痈踊咏涌优忧邮铀犹游诱舆鱼渔娱与屿语吁御狱誉预驭鸳渊辕园员圆缘远愿约跃钥岳粤悦阅云郧匀陨运蕴酝晕韵杂灾载攒暂赞赃脏凿枣灶责择则泽贼赠扎札轧铡闸诈斋债毡盏斩辗崭栈战绽张涨帐账胀赵蛰辙锗这贞针侦诊镇阵挣睁狰帧郑证织职执纸挚掷帜质钟终种肿众诌轴皱昼骤猪诸诛烛瞩嘱贮铸筑驻专砖转赚桩庄装妆壮状锥赘坠缀谆浊兹资渍踪综总纵邹诅组钻致钟么为只凶准启板里雳余链泄标适态于';
}
function FTPYStr(){
	return '皚藹礙愛翺襖奧壩罷擺敗頒辦絆幫綁鎊謗剝飽寶報鮑輩貝鋇狽備憊繃筆畢斃閉邊編貶變辯辮鼈癟瀕濱賓擯餅撥缽鉑駁蔔補參蠶殘慚慘燦蒼艙倉滄廁側冊測層詫攙摻蟬饞讒纏鏟産闡顫場嘗長償腸廠暢鈔車徹塵陳襯撐稱懲誠騁癡遲馳恥齒熾沖蟲寵疇躊籌綢醜櫥廚鋤雛礎儲觸處傳瘡闖創錘純綽辭詞賜聰蔥囪從叢湊竄錯達帶貸擔單鄲撣膽憚誕彈當擋黨蕩檔搗島禱導盜燈鄧敵滌遞締點墊電澱釣調叠諜疊釘頂錠訂東動棟凍鬥犢獨讀賭鍍鍛斷緞兌隊對噸頓鈍奪鵝額訛惡餓兒爾餌貳發罰閥琺礬釩煩範販飯訪紡飛廢費紛墳奮憤糞豐楓鋒風瘋馮縫諷鳳膚輻撫輔賦複負訃婦縛該鈣蓋幹趕稈贛岡剛鋼綱崗臯鎬擱鴿閣鉻個給龔宮鞏貢鈎溝構購夠蠱顧剮關觀館慣貫廣規矽歸龜閨軌詭櫃貴劊輥滾鍋國過駭韓漢閡鶴賀橫轟鴻紅後壺護滬戶嘩華畫劃話懷壞歡環還緩換喚瘓煥渙黃謊揮輝毀賄穢會燴彙諱誨繪葷渾夥獲貨禍擊機積饑譏雞績緝極輯級擠幾薊劑濟計記際繼紀夾莢頰賈鉀價駕殲監堅箋間艱緘繭檢堿鹼揀撿簡儉減薦檻鑒踐賤見鍵艦劍餞漸濺澗漿蔣槳獎講醬膠澆驕嬌攪鉸矯僥腳餃繳絞轎較稭階節莖驚經頸靜鏡徑痙競淨糾廄舊駒舉據鋸懼劇鵑絹傑潔結誡屆緊錦僅謹進晉燼盡勁荊覺決訣絕鈞軍駿開凱顆殼課墾懇摳庫褲誇塊儈寬礦曠況虧巋窺饋潰擴闊蠟臘萊來賴藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫撈勞澇樂鐳壘類淚籬離裏鯉禮麗厲勵礫曆瀝隸倆聯蓮連鐮憐漣簾斂臉鏈戀煉練糧涼兩輛諒療遼鐐獵臨鄰鱗凜賃齡鈴淩靈嶺領餾劉龍聾嚨籠壟攏隴樓婁摟簍蘆盧顱廬爐擄鹵虜魯賂祿錄陸驢呂鋁侶屢縷慮濾綠巒攣孿灤亂掄輪倫侖淪綸論蘿羅邏鑼籮騾駱絡媽瑪碼螞馬罵嗎買麥賣邁脈瞞饅蠻滿謾貓錨鉚貿麽黴沒鎂門悶們錳夢謎彌覓綿緬廟滅憫閩鳴銘謬謀畝鈉納難撓腦惱鬧餒膩攆撚釀鳥聶齧鑷鎳檸獰甯擰濘鈕紐膿濃農瘧諾歐鷗毆嘔漚盤龐國愛賠噴鵬騙飄頻貧蘋憑評潑頗撲鋪樸譜臍齊騎豈啓氣棄訖牽扡釺鉛遷簽謙錢鉗潛淺譴塹槍嗆牆薔強搶鍬橋喬僑翹竅竊欽親輕氫傾頃請慶瓊窮趨區軀驅齲顴權勸卻鵲讓饒擾繞熱韌認紉榮絨軟銳閏潤灑薩鰓賽傘喪騷掃澀殺紗篩曬閃陝贍繕傷賞燒紹賒攝懾設紳審嬸腎滲聲繩勝聖師獅濕詩屍時蝕實識駛勢釋飾視試壽獸樞輸書贖屬術樹豎數帥雙誰稅順說碩爍絲飼聳慫頌訟誦擻蘇訴肅雖綏歲孫損筍縮瑣鎖獺撻擡攤貪癱灘壇譚談歎湯燙濤縧騰謄銻題體屜條貼鐵廳聽烴銅統頭圖塗團頹蛻脫鴕馱駝橢窪襪彎灣頑萬網韋違圍爲濰維葦偉僞緯謂衛溫聞紋穩問甕撾蝸渦窩嗚鎢烏誣無蕪吳塢霧務誤錫犧襲習銑戲細蝦轄峽俠狹廈鍁鮮纖鹹賢銜閑顯險現獻縣餡羨憲線廂鑲鄉詳響項蕭銷曉嘯蠍協挾攜脅諧寫瀉謝鋅釁興洶鏽繡虛噓須許緒續軒懸選癬絢學勳詢尋馴訓訊遜壓鴉鴨啞亞訝閹煙鹽嚴顔閻豔厭硯彥諺驗鴦楊揚瘍陽癢養樣瑤搖堯遙窯謠藥爺頁業葉醫銥頤遺儀彜蟻藝億憶義詣議誼譯異繹蔭陰銀飲櫻嬰鷹應纓瑩螢營熒蠅穎喲擁傭癰踴詠湧優憂郵鈾猶遊誘輿魚漁娛與嶼語籲禦獄譽預馭鴛淵轅園員圓緣遠願約躍鑰嶽粵悅閱雲鄖勻隕運蘊醞暈韻雜災載攢暫贊贓髒鑿棗竈責擇則澤賊贈紮劄軋鍘閘詐齋債氈盞斬輾嶄棧戰綻張漲帳賬脹趙蟄轍鍺這貞針偵診鎮陣掙睜猙幀鄭證織職執紙摯擲幟質鍾終種腫衆謅軸皺晝驟豬諸誅燭矚囑貯鑄築駐專磚轉賺樁莊裝妝壯狀錐贅墜綴諄濁茲資漬蹤綜總縱鄒詛組鑽緻鐘麼為隻兇準啟闆裡靂餘鍊洩標適態於';
}
function Traditionalized(cc){
	var str='',ss=JTPYStr(),tt=FTPYStr();
	for(var i=0;i<cc.length;i++){
		if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
  		else str+=cc.charAt(i);
	}
	return str;
}

function Traditionalizedce(cc){
	var str='',tt=JTPYStr(),ss=FTPYStr();
	for(var i=0;i<cc.length;i++){
		if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
  		else str+=cc.charAt(i);
	}
	return str;
}

function _RequestParamsStr(){
	var strHref = window.document.location.href;
	var intPos = strHref.indexOf('?');
	var strRight = strHref.substr(intPos+1);
	return strRight;
}

function Request(strName){
	var arrTmp = _RequestParamsStr().split("&");
	for(var i=0,len=arrTmp.length; i<len; i++){ 
		var arrTemp = arrTmp[i].split("=");
		if(arrTemp[0].toUpperCase() == strName.toUpperCase()){
		if(arrTemp[1].indexOf("#")!=-1) arrTemp[1] = arrTemp[1].substr(0, arrTemp[1].indexOf("#"));
			return arrTemp[1]; 
		}
	}
	return "";
}

function SetCookie(name,value,hours){
	var hourstay = 30*24*60*60*1000; //此 cookie 将被默认保存 30 天
	if(checkNum(hours)){
		hourstay = hours;
	}
    var exp  = new Date();
    exp.setTime(exp.getTime() + hourstay*60*60*1000);
    document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){     
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
}
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
function checkNum(nubmer){
    var re = /^[0-9]+.?[0-9]*$/;   //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/  
    if (re.test(nubmer))return true;
	return false;
}

DIY_PAGE_SIZE='1200';



$(document).ready(function(){
	/*
	**当前模块对象：$("#dh_style_01_1495502294245")
	**效果仅在发布预览下才生效
	*/
	
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_02_1495682048384")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_02_1495682048392")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_02_1495682048400")
	**效果仅在发布预览下才生效
	*/
	
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#homelink_style_01_1490841383567")
	**效果仅在发布预览下才生效
	*/
	
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_02_1492142786194")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_02_1492142771367")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_02_1495682405859")
	**效果仅在发布预览下才生效
	*/
	
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_02_1495683980496")
	**效果仅在发布预览下才生效
	*/
	
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#image_style_01_1495684057897")
	**效果仅在发布预览下才生效
	*/
	
})





$(document).ready(function(){
	/*
	**当前模块对象：$("#dh_style_03_1492138489118")
	**效果仅在发布预览下才生效
	*/
	
})
var viewsSettings={"comm_layout_header":{"diyShowName":"\u5171\u4eab\u5934\u90e8","css":{"pc":{"height":"112px","z-index":999999},"mobile":{"height":"66px","z-index":5},"pad":{"height":"84px"},"content":{"overflow":"visible"},"undefined":{"height":"150px"}},"settingsBox":{"showTitle":"\u5171\u4eab\u5934\u90e8\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"div_includeBlock_1492054720583":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"1200px","height":"112px","position":"absolute","top":"0px","left":"calc(50% - 600px)","z-index":2},"pad":{"width":"100%","left":"0%","height":"84px"},"mobile":{"width":"99.86842117811504%","height":"66px","top":"0px","left":"0%"},"customCss":{"pc":{"modelArea":{"background":"transparent"}}},"content":{"overflow":"visible"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"dh_style_01_1495502294245":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u5bfc\u822a\u83dc\u5355-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u5bfc\u822a\u83dc\u5355","styleHelpId":1257,"viewCtrl":"default","css":{"pc":{"width":"71.62592986184909%","z-index":"999","position":"absolute","top":"42.909725189208984px","left":"28.411462148030598%"},"pad":{"z-index":"999","left":"28.374070138150902%","width":"71.62592986184909%","top":"16px"},"mobile":{"width":"12.204424088402893%","z-index":"999","top":"5.961805820465088px","left":"87.45888960988898%"},"content":{"overflow":"visible"},"customCss":{"pc":{"%hot>a":{"color":"#498d9c","border-bottom-style":"solid"},"@mainMenuSet":{"border-bottom-style":"none","margin-left":"5px","margin-right":"5px"},"@mainMenuSet:hover":{"margin-left":"5px","margin-right":"5px","color":"#498d9c","border-bottom-style":"solid","border-bottom-color":"#498d9c"},"modelArea":{"padding-top":"5px","padding-bottom":"5px"}},"mobile":{"@mainMenuSet:hover":{"border-bottom-color":"transparent"}}}},"lock":{"height":"true"},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"dhAll":0,"dhid":[61708,61705,61709,61706,61704]},"moveEdit":[]},"image_logo_1495604573754":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageLogoConfig","setupFunc":"logoSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"LOGO\u5c5e\u6027\u8bbe\u7f6e"},"style":"logo","styleKind":"LOGO","styleHelpId":1252,"viewCtrl":"logo","css":{"pc":{"width":"18.833333333333332%","height":"111px","position":"absolute","top":"0.4826390743255615px","left":"0%"},"pad":{"left":"0.10221102032473947%","width":"17.534537725823593%","top":"0px","height":"79px"},"mobile":{"width":"131px","height":"65px","top":"0px","left":"0%"}},"data":{"logoType":1,"logoStyle":1,"logoBlank":"_self"},"name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","diyShowName":"LOGO","eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"layout_1495682048370":{"css":{"pc":{"height":"361px"},"content":[],"pad":{"height":"243.88889px"},"mobile":{"height":"151px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"false"},"image_style_01_1495682048373":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"107.91666666666666%","height":"361px","position":"absolute","top":"0px","left":"0%"},"pad":{"height":"242px","width":"100%","left":"0%"},"mobile":{"width":"100%","height":"151px","top":"0px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"imgUrl":"\/userimg\/1114\/pkgimg\/pkgimg\/pkgimg\/pkgimg\/147445428633.png","imgStyle":{"pc":"2","pad":"2","mobile":"3"}},"params":{"filelist":"","urllist":""}},"text_style_02_1495682048384":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"369px","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"129px","left":"calc(50% - 184.5px)"},"pad":{"left":"30.40500685461776%","top":"57.954864501953125px","z-index":2},"mobile":{"width":"100%","top":"25px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"40px","font-family":"Microsoft YaHei","font-weight":"bold","box-shadow":"#000000 0px 0px 0px ","text-shadow":"undefined 5px 5px 10px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"36px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","text-align":"center"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInDown","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1495682048392":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"264px","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"188px","left":"calc(50% - 132px)"},"pad":{"left":"calc(50% - 132px)","top":"107.5px","z-index":2},"mobile":{"width":"100%","top":"59px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"30px","font-style":"normal","font-family":"Microsoft YaHei","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"24px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","text-align":"center","font-style":"normal"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInDown","duration":"1","delay":"1","iteration":"1","offset":"0"}},"text_style_02_1495682048400":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"28.039353478566408%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"238px","left":"36.99929725931131%"},"pad":{"left":"29.1836421370633%","top":"151.4652862548828px","z-index":2,"width":"392px"},"mobile":{"width":"100%","top":"89px","left":"0%","display":"block"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"16px","font-style":"italic","text-indent":"0em","letter-spacing":"2px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","text-align":"center"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInUp","duration":"1","delay":"1.5","iteration":"1","offset":"0"}},"layout_1490841371465":{"css":{"pc":{"height":"54px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"56px"},"mobile":{"height":"50px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"homelink_style_01_1490841383567":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"homelinkConfig","setupFunc":"homelinkSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5f53\u524d\u4f4d\u7f6e\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u5f53\u524d\u4f4d\u7f6e-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u5f53\u524d\u4f4d\u7f6e","viewCtrl":"default","css":{"pc":{"width":"100%","position":"absolute","top":"20px","left":"0%"},"pad":{"width":"96%","left":"2.014846235418876%"},"mobile":{"width":"96%","top":"16px","left":"1.97265625%"}},"lock":{"height":"true"},"name":"homelink","kind":"\u5f53\u524d\u4f4d\u7f6e","showname":"\u9ed8\u8ba4","data":{"icon":"","route":"","separator":""},"eventSet":{"scrollView":"none","type":"none"}},"layout_1495683556825":{"css":{"pc":{"height":"158.68405151367188px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"143.9444580078125px"},"mobile":{"height":"119.65278625488281px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"text_style_07_1495683556829":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_07","diyShowName":"\u6587\u5b57\u6a21\u5757-Arial","styleKind":"\u82f1\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"1200px","font-size":"46px","color":"#333","line-height":"50px","font-family":"Arial","position":"absolute","top":"108.68405151367188px","left":"0%"},"pad":{"left":"0%","top":"93.9444580078125px","width":"100%"},"mobile":{"width":"100%","top":"69.65278244018555px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","text-align":"center","color":"#999999"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInLeft","duration":"1","delay":"1","iteration":"1","offset":"0"}},"text_style_02_1495683556847":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"99.58333333333333%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"64.82290649414062px","left":"0.2442156473795573%"},"pad":{"top":"46.7569580078125px","left":"0.2435352546375692%"},"mobile":{"width":"100%","top":"31.875px","left":"0%","z-index":2},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","text-align":"center","font-size":"36px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"36px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"28px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInDown","duration":"1","delay":"1","iteration":"1","offset":"0"}},"image_style_01_1495683556852":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"5.083333333333333%","height":"70px","position":"absolute","top":"47.22222900390625px","left":"60.72656631469726%"},"pad":{"left":"61.577519448226624%","top":"36.7569580078125px"},"mobile":{"width":"15%","height":"80px","top":"12.375px","left":"74.8046875%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/1114\/pkgimg\/pkgimg\/618c0b65a73d977917f03ec528df1afc.png","imgStyle":{"pc":"2","pad":null,"mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"tada","duration":"5.8","delay":"0.25","iteration":"infinite","offset":"0","filelist":"","urllist":""}},"image_style_01_1495683556860":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"5.083333333333333%","height":"70px","position":"absolute","top":"46.49305725097656px","left":"34.47453689575195%"},"pad":{"left":"33.12632837407014%","top":"36.7569580078125px"},"mobile":{"width":"15%","height":"80px","top":"9.6875px","left":"9.58984375%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/1114\/pkgimg\/pkgimg\/20170523094038679.png","imgStyle":{"pc":"2","pad":null,"mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"tada","duration":"6","delay":"0.25","iteration":"infinite","offset":"0","filelist":"","urllist":""}},"layout_1483002475903":{"css":{"pc":{"height":"233.88889px"},"content":{"max-width":"1200px"},"mobile":{"height":"211.96875px"},"pad":{"height":"219.88889px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"false"},"text_style_02_1492142786194":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","left":"0%","top":"411px","z-index":2,"display":"none"},"pad":{"width":"96%","left":"2%","top":"270px","display":"none"},"mobile":{"width":"96%","left":"2%","top":"2184px","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#676767","font-size":"14px","line-height":"30px","text-indent":"2em"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":{"mobile":"1","pad":"1"},"params":{"duration":"2.5","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1492142771367":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"55.41666666666667%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","left":"18.875%","top":"40px","z-index":2,"display":"none"},"pad":{"width":"63.20254506892895%","left":"34.7%","top":"30px","display":"none"},"mobile":{"width":"96%","left":"2%","top":"479px","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#676767","font-size":"14px","line-height":"30px","text-indent":"2em"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":{"mobile":"1","pad":"1"},"params":{"duration":"2.5","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1495682405859":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"86.33333333333333%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"20.861114501953125px","left":"6.827259063720703%","z-index":2},"pad":{"width":"86.9287991498406%","top":"16.96527099609375px","left":"6.826367109665582%"},"mobile":{"width":"85%","top":"31.97222900390625px","left":"7.5%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","letter-spacing":"1.2px","color":"#191919","text-align":"center","line-height":"38px","height":"160px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","height":"180px","line-height":"35px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"fadeInUp","duration":"1","delay":"1","iteration":"1","offset":"0"}},"layout_1495682663133":{"css":{"pc":{"height":"209.01040649414062px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"194.88889px"},"mobile":{"height":"134.88889px"},"customCss":{"pc":{"modelArea":{"background":" url(\/userimg\/1114\/pkgimg\/pkgimg\/yi4y.jpg)","background-attachment":"fixed","background-size":"auto 100%","background-repeat":"no-repeat"}}}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"text_style_07_1495682909296":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_07","diyShowName":"\u6587\u5b57\u6a21\u5757-Arial","styleKind":"\u82f1\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"14.583333333333334%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Arial","position":"absolute","top":"149.01040649414062px","left":"42.74537022908529%"},"pad":{"left":"calc(50% - 69px)","top":"127.99307250976562px"},"mobile":{"width":"22.36842105263158%","top":"71.97915649414062px","left":"38.05281789679276%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"28px","color":"#cccccc","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInDown","duration":"2.5","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1495682904863":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"22.75%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"47.06597900390625px","left":"38.66203689575195%"},"pad":[],"mobile":{"width":"20%","top":"6.006927490234375px","left":"39.236112895764805%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"100px","height":"100px","line-height":"100px","font-family":"Courier New","color":"#ffffff","font-weight":"bold","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"60px","text-align":"center"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"28px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"bounceInDown","duration":"2.5","delay":"0.25","iteration":"1","offset":"0"}},"text_style_07_1495682681523":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_07","diyShowName":"\u6587\u5b57\u6a21\u5757-Arial","styleKind":"\u82f1\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"14.583333333333334%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Arial","position":"absolute","top":"149.01041793823242px","left":"5.290510813395182%"},"pad":{"left":"5.492827185408848%","top":"127.98611450195312px"},"mobile":{"width":"24.47368421052632%","top":"71.89236450195312px","left":"3.4137427179436934%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"28px","color":"#cccccc"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInDown","duration":"2.5","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1495682669167":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"16%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"47.06597900390625px","left":"3.9560190836588545%"},"pad":{"top":"47.06597900390625px","left":"4.804655393302504%"},"mobile":{"width":"15.526315789473685%","top":"5.9375px","left":"6.061769284700093%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"100px","height":"100px","line-height":"100px","font-family":"Courier New","color":"#ffffff","font-weight":"bold"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"60px","text-align":"center"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"28px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"rotateInUpRight","duration":"1","delay":"1.5","iteration":"1","offset":"0"}},"text_style_07_1495682959349":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_07","diyShowName":"\u6587\u5b57\u6a21\u5757-Arial","styleKind":"\u82f1\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"14.583333333333334%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Arial","position":"absolute","top":"148.99307250976562px","left":"78.0384915669759%"},"pad":{"left":"78.79140531598698%","top":"127.98611450195312px"},"mobile":{"width":"17.36842105263158%","top":"71.94442749023438px","left":"75.65241763466283%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"28px","color":"#cccccc","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInDown","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1495682950173":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"22.75%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"47.06597900390625px","left":"73.83130772908528%"},"pad":[],"mobile":{"width":"21.31578947368421%","top":"5.9375px","left":"74.97624447471217%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"100px","height":"100px","line-height":"100px","font-family":"Courier New","color":"#ffffff","font-weight":"bold"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"60px","text-align":"center"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"28px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"rotateInUpLeft","duration":"1","delay":"1.5","iteration":"1","offset":"0"}},"layout_1492153327922":{"css":{"pc":{"height":"302.88889px"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"185.88889px"},"pad":{"height":"297.88889px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1495683942262":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"30.833333333333336%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"87.98959350585938px","left":"35.706022898356125%"},"pad":[],"mobile":{"width":"100%","top":"39.979156494140625px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"36px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"28px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInUp","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1495683980496":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"86.33333333333333%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"165.71527099609375px","left":"6.827259063720703%","z-index":2},"pad":[],"mobile":{"width":"95%","top":"88.8680419921875px","left":"2.499086480391653%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","letter-spacing":"1.2px","color":"#191919","text-align":"center","line-height":"38px","height":"80px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"fadeInUp","duration":"1","delay":"1","iteration":"1","offset":"0"}},"layout_1495683979943":{"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","css":{"content":{"overflow":"visible","max-width":"1200px"},"pc":{"height":"534.88889px"},"mobile":{"height":"200px"},"pad":{"height":"532.88889px"}},"settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1495684057897":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"99.66666666666667%","height":"532px","position":"absolute","top":"0px","left":"0.24913279215494794%"},"pad":{"width":"95%","left":"2.5%"},"mobile":{"width":"95%","height":"200px","top":"0px","left":"2.5%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/1114\/pkgimg\/pkgimg\/1474443248.jpg","imgStyle":{"pc":"2","pad":"2","mobile":"2"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInLeft","duration":"2.5","delay":"0.25","iteration":"1","offset":"0","filelist":"","urllist":""}},"layout_1495691341042":{"css":{"pc":{"height":"40.88889px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"28.888890000000004px"},"mobile":{"height":"21.888890000000004px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout"},"comm_layout_footer":{"diyShowName":"\u5171\u4eab\u5e95\u90e8","css":{"pc":{"height":"408.5px","display":"block"},"content":[],"pad":{"height":"409.5px","display":"block"},"mobile":{"height":"66.98956298828125px","display":"block"},"undefined":{"height":"104px"}},"settingsBox":{"showTitle":"\u5171\u4eab\u5e95\u90e8\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"false"},"div_includeBlock_1490780863382":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"408.5px","position":"absolute","top":"0px","left":"0%"},"pad":{"height":"409.5px","width":"100%","left":"0%"},"mobile":{"width":"100%","height":"66.98956298828125px","top":"0px","left":"0%"},"customCss":{"pc":{"modelArea":{"background":"#212121","background-repeat":"no-repeat","background-size":"cover","background-position-x":"50%"}},"mobile":{"modelArea":{"background-position-x":"50%","background":"#000000"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"autoHeight":"false","viewLock":{"mobile":[]}},"div_includeBlock_1490941409766":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"1200px","height":"283px","position":"absolute","top":"15.5px","left":"calc(50% - 600px)"},"pad":{"left":"2.014846235418876%","width":"96%","height":"291.5px","top":"20px"},"mobile":{"width":"96%","height":"227px","top":"13px","left":"2%","display":"none"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"div_includeBlock_1492138557350":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u5bb9\u5668\u6a21\u5757","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"23%","height":"237.5px","position":"absolute","top":"0px","left":"77%"},"pad":{"width":"165px","left":"81.77313535911603%","height":"229.5px"},"mobile":{"width":"100%","height":"240px","top":"467px","left":"0%","display":"none"},"undefined":{"height":"72px"},"customCss":{"pc":{"modelArea":{"border-bottom-color":"#ffffff","border-bottom-style":"none","border-bottom-width":"1px"}}}},"name":"div","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u7ed3\u6784\u6a21\u5757","diyShowName":"\u5bb9\u5668\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"},"autoHeight":"true"},"text_style_02_1492138557698":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"62.5%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","left":"12.596240942028986%","top":"29.5px"},"pad":[],"mobile":{"width":"97.30000000000001%","left":"1.3499999999999943%","top":"0px"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"20px","font-weight":"normal","text-align":"left","font-family":"Microsoft YaHei","line-height":"30px","letter-spacing":"2px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"24px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"30px","font-weight":"normal"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"}},"div_blank_1492138557692":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u6a21\u5757","viewCtrl":"blank","css":{"pc":{"width":"50px","height":"3px","position":"absolute","left":"12.596240942028986%","top":"70px","z-index":2},"pad":[],"mobile":{"width":"20.263157894736842%","height":"3px","left":"39.868421052631575%","top":"0px","display":"block"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#498d9c"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"name":"div","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u7ed3\u6784\u6a21\u5757","diyShowName":"\u7a7a\u767d\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"}},"dh_style_03_1492138489118":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u5bfc\u822a\u83dc\u5355-\u98ce\u683c3","styleShowName":"\u98ce\u683c3","styleShowImg":"\/sysTools\/Model\/viewsRes\/showImg\/dh_style_3.png","styleShowClass":"one","styleKind":"\u5bfc\u822a\u83dc\u5355","viewCtrl":"default","css":{"pc":{"width":"36.91756272401434%","z-index":"999","left":"8.973052536231885%","top":"97.5px","position":"absolute"},"pad":{"z-index":"999","width":"93px","left":"6.377704326923077%","top":"89.5px"},"mobile":{"width":"14.348025711662075%","z-index":"999","left":"42.82598714416896%","top":"240px"},"content":{"overflow":"visible"},"customCss":{"pc":{"@columnSet":{"background":"transparent","font-size":"12px","line-height":"14px","color":"#bfbfbf"},"%hot>a":{"background":"transparent","color":"#bfbfbf"},"@mainMenuSet":{"border-right-style":"none","border-bottom-style":"none","height":"28px","line-height":"28px","color":"#bfbfbf"},"@mainMenuSet:hover":{"background":"transparent"}}}},"lock":{"height":"true"},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"data":{"dhAll":"1","dhid":[61708,61705,61709,61706,61704],"dhOpen":""}},"div_includeBlock_1482994420520":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u5bb9\u5668\u6a21\u5757","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"40.08333333333333%","height":"247.5px","position":"absolute","top":"0px","left":"35.083333333333336%"},"pad":{"height":"291.5px","width":"306px","left":"46.83011049723757%","top":"0px"},"mobile":{"width":"100%","height":"240px","top":"0px","left":"0%","display":"none"},"undefined":{"height":"72px"},"customCss":{"pc":{"modelArea":{"border-bottom-color":"#ffffff","border-bottom-style":"none","border-bottom-width":"1px"}}}},"name":"div","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u7ed3\u6784\u6a21\u5757","diyShowName":"\u5bb9\u5668\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"},"autoHeight":"true"},"div_blank_1490781609085":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u6a21\u5757","viewCtrl":"blank","css":{"pc":{"width":"50px","height":"3px","position":"absolute","left":"4.9921875%","top":"72px","z-index":2},"pad":[],"mobile":{"width":"20.263157894736842%","height":"3px","left":"39.868421052631575%","top":"0px","display":"block"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#498d9c"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"name":"div","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u7ed3\u6784\u6a21\u5757","diyShowName":"\u7a7a\u767d\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1490781553208":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"62.5%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","left":"4.9921875%","top":"31.5px"},"pad":[],"mobile":{"width":"97.30000000000001%","left":"1.3499999999999943%","top":"0px"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"20px","font-weight":"normal","text-align":"left","font-family":"Microsoft YaHei","line-height":"30px","letter-spacing":"2px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"24px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"30px","font-weight":"normal"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1490781323011":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"90.22869022869024%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"97.5px","left":"5%"},"pad":{"left":"5%","width":"90%","top":"91.5px"},"mobile":{"width":"370px","top":"0px"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-family":"Microsoft YaHei","font-size":"14px","color":"#bfbfbf","line-height":"30px","text-indent":"2em"}},"pad":{"@view_contents":{"box-sizing":"border-box","text-indent":"2em","line-height":"25px"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1490781436192":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u5bb9\u5668\u6a21\u5757","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"34.583333333333336%","height":"283px","position":"absolute","top":"0px","left":"0%"},"pad":{"height":"285.5px","width":"407px"},"mobile":{"width":"100%","height":"145px","top":"0px","left":"0%","display":"block"},"undefined":{"height":"72px"},"customCss":{"pc":{"modelArea":{"border-left-color":"#ffffff","border-left-style":"none","border-left-width":"1px"}},"mobile":{"modelArea":{"border-left-width":"0px"}}}},"name":"div","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u7ed3\u6784\u6a21\u5757","diyShowName":"\u5bb9\u5668\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"},"autoHeight":"true"},"text_style_02_1490784439268":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"84%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"212.5px","left":"11.671875%"},"pad":{"top":"212px","left":"11.393382352941178%","width":"72.42524916943522%"},"mobile":{"width":"100%","top":"0px","left":"0%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-family":"Microsoft YaHei","font-size":"14px","color":"#bfbfbf","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_blank_1490782153878":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u6a21\u5757","viewCtrl":"blank","css":{"pc":{"width":"50px","height":"3px","position":"absolute","left":"4.03125%","top":"72px","z-index":2},"pad":{"top":"73px","height":"3px","left":"1.9656019656019657%"},"mobile":{"width":"20.263157894736842%","height":"3px","left":"39.868421052631575%","top":"0px","display":"none"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#498D9C"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"name":"div","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u7ed3\u6784\u6a21\u5757","diyShowName":"\u7a7a\u767d\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"}},"image_style_01_1490784932610":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"9.5%","height":"25px","position":"absolute","top":"136px","left":"1.41796875%"},"pad":{"left":"0.2457002457002457%","width":"9.647058823529411%","top":"137.5px","height":"27px"},"mobile":{"width":"55.09641873278237%","height":"200px","top":"0px","left":"22.451790633608816%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1108/pkgimg/bottom_phone.png","imgStyle":{"pc":"3","pad":"3","mobile":null}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":""}},"image_style_01_1490785166449":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"6.833333333333333%","height":"25px","position":"absolute","top":"176px","left":"2.69921875%"},"pad":{"left":"0.5835380835380835%","top":"177px","height":"25px","width":"37px"},"mobile":{"width":"55.09641873278237%","height":"200px","top":"0px","left":"22.451790633608816%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1108/pkgimg/bottom_email.png","imgStyle":{"pc":"3","pad":"3","mobile":null}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":""}},"image_style_01_1490785073478":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"6.166666666666667%","height":"25px","position":"absolute","top":"214.5px","left":"3.0390625%"},"pad":{"left":"0.9411764705882352%","top":"213px","width":"38px","height":"27px"},"mobile":{"width":"55.09641873278237%","height":"200px","top":"0px","left":"22.451790633608816%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1108/pkgimg/bottom_fax.png","imgStyle":{"pc":"3","pad":"3","mobile":null}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":""}},"image_style_01_1490785630672":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"10%","height":"35px","position":"absolute","top":"248px","left":"1.08984375%"},"pad":{"left":"0.4914004914004914%","top":"247.5px","height":"38px"},"mobile":{"width":"55.09641873278237%","height":"200px","top":"600px","left":"22.451790633608816%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1108/pkgimg/bottom_adress.png","imgStyle":{"pc":"3","pad":"3","mobile":null}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":""}},"text_style_02_1490781436389":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"66.5%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"97.5px","left":"11.74609375%"},"pad":{"left":"11.295681063122927%","width":"77.40863787375415%","top":"92.5px"},"mobile":{"width":"100%","top":"0px","left":"0%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-family":"Microsoft YaHei","font-size":"14px","color":"#bfbfbf","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_02_1492138106385":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"49.5%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"134px","left":"11.46875%"},"pad":{"left":"11.125%","top":"134px","width":"216px"},"mobile":{"width":"100%","top":"145px","left":"0%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-family":"Microsoft YaHei","font-size":"14px","color":"#bfbfbf","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_02_1490784463734":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"66.25%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"174.5px","left":"11.9921875%"},"pad":{"left":"11.528716216216216%","top":"175px","width":"190px"},"mobile":{"width":"100%","top":"0px","left":"0%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-family":"Microsoft YaHei","font-size":"14px","color":"#bfbfbf","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_02_1490785640977":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"88.1015625%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"250.5px","left":"11.9140625%"},"pad":{"left":"11.390509828009828%","top":"254px","width":"357px"},"mobile":{"width":"100%","top":"800px","left":"0%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-family":"Microsoft YaHei","font-size":"14px","color":"#bfbfbf","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box","line-height":"25px"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_02_1490782085541":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"56.333333333333336%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","left":"4.046875%","top":"31.5px"},"pad":{"left":"1.9656019656019657%","top":"29.5px"},"mobile":{"width":"97.30000000000001%","left":"1.3499999999999943%","top":"0px","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"20px","font-weight":"normal","text-align":"left","font-family":"Microsoft YaHei","line-height":"30px","letter-spacing":"2px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"24px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"30px","font-weight":"normal"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"}},"image_style_01_1495503193821":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"9.615384615384617%","height":"25px","position":"absolute","top":"97.5px","left":"1.6551494598388672%"},"pad":{"top":"97.5px","left":"0.41973807594992896%"},"mobile":{"width":"57.39210284664831%","height":"200px","top":"0px","left":"21.303948576675847%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../sysTools/Model/views/footer/z_12/v9Res/67326e5bfa5fcf0be15ce360991ebe79.png","imgStyle":{"pc":"3","pad":"3","mobile":"null"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":""}},"div_includeBlock_1490781513375":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u5bb9\u5668\u6a21\u5757","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"72px","position":"absolute","top":"336.5px","left":"0%"},"pad":{"left":"calc(50% - 471.5px)","top":"338.5px"},"mobile":{"width":"96.00000000000001%","height":"66.98956298828125px","top":"0px","left":"1.999999999999993%","display":"block"},"undefined":{"height":"72px"},"customCss":{"pc":{"modelArea":{"background":"#000000"}}}},"name":"div","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u7ed3\u6784\u6a21\u5757","diyShowName":"\u5bb9\u5668\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"1.8","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1490786801909":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"21px","left":"0%"},"pad":{"width":"100%","left":"0%","top":"21px"},"mobile":{"width":"100%","top":"6.98956298828125px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-family":"Microsoft YaHei","font-size":"16px","color":"#bfbfbf","line-height":"30px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","text-align":"center","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]}}