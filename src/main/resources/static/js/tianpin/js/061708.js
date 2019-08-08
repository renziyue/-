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
	return '1';
}
function FTPYStr(){
	return '2';
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
	**当前模块对象：$("#div_includeBlock_1495447753215")
	**效果仅在发布预览下才生效
	*/

})


$(document).ready(function(){
	/*
	**当前模块对象：$("#image_style_01_1495447726345")
	**效果仅在发布预览下才生效
	*/

})

$(document).ready(function(){
	/*
	**当前模块对象：$("#image_style_01_1495594499294")
	**效果仅在发布预览下才生效
	*/

})
$(document).ready(function(){
	/*
	**当前模块对象：$("#div_includeBlock_1495447726149")
	**效果仅在发布预览下才生效
	*/

})

$(document).ready(function(){
	/*
	**当前模块对象：$("#div_includeBlock_1495447469295")
	**效果仅在发布预览下才生效
	*/

})

$(document).ready(function(){
	/*
	**当前模块对象：$("#div_includeBlock_1495447932396")
	**效果仅在发布预览下才生效
	*/

})



$(document).ready(function(){
	/*
	**当前模块对象：$("#div_blank_1495699060546")
	**效果仅在发布预览下才生效
	*/

})

$(document).ready(function(){
	/*
	**当前模块对象：$("#div_blank_1495700556179")
	**效果仅在发布预览下才生效
	*/

})

$(document).ready(function(){
	/*
	**当前模块对象：$("#div_blank_1495700861368")
	**效果仅在发布预览下才生效
	*/

})

$(document).ready(function(){
	/*
	**当前模块对象：$("#div_blank_1495700950172")
	**效果仅在发布预览下才生效
	*/

})
$(document).ready(function(){
	/*
	**当前模块对象：$("#div_includeBlock_1495698419758")
	**效果仅在发布预览下才生效
	*/
	$("#div_includeBlock_1495698419758").mouseover(function(){
              console.log("ffff");
              $("#div_blank_1495699060546").css({
                    "-webkit-transition": "3.3s",
                    " transition": "3.3s",
                    " -webkit-transform": "translateY(-103%)",
                    " -ms-transform": "translateY(-103%)",
                    "transform": "translateY(-103%)"
              });
             $("#div_blank_1495700556179").css({
                    "-webkit-transition": "3.3s",
                    " transition": "3.3s",
                    " -webkit-transform": "translateY(-103%)",
                    " -ms-transform": "translateY(-103%)",
                    "transform": "translateY(-103%)"
              });
            $("#div_blank_1495700950172").css({
                    "-webkit-transition": "3.3s",
                    " transition": "3.3s",
                    " -webkit-transform": "translateX(-100%)",
                    " -ms-transform": "translateX(-100%)",
                    "transform": "translateX(-100%)"
            });
           $("#div_blank_1495700861368").css({
                    "-webkit-transition": "3.3s",
                    " transition": "3.3s",
                    " -webkit-transform": "translateX(-100%)",
                    " -ms-transform": "translateX(-100%)",
                    "transform": "translateX(-100%)"
            });

        });
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_02_1495610373948")
	**效果仅在发布预览下才生效
	*/

})


$(document).ready(function(){
	/*
	**当前模块对象：$("#productList_style_03_1495529974293")
	**效果仅在发布预览下才生效
	*/


})



$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_02_1495532535583")
	**效果仅在发布预览下才生效
	*/

})


$(document).ready(function(){
	/*
	**当前模块对象：$("#newsList_style_04_1495504523825")
	**效果仅在发布预览下才生效
	*/

})





$(document).ready(function(){
	/*
	**当前模块对象：$("#dh_style_03_1492138489118")
	**效果仅在发布预览下才生效
	*/

})
var viewsSettings={"comm_layout_header":{"diyShowName":"\u5171\u4eab\u5934\u90e8","css":{"pc":{"height":"112px","z-index":999999},"mobile":{"height":"66px","z-index":5},"pad":{"height":"84px"},"content":{"overflow":"visible"},"undefined":{"height":"150px"}},"settingsBox":{"showTitle":"\u5171\u4eab\u5934\u90e8\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"div_includeBlock_1492054720583":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"1200px","height":"112px","position":"absolute","top":"0px","left":"calc(50% - 600px)","z-index":2},"pad":{"width":"100%","left":"0%","height":"84px"},"mobile":{"width":"99.86842117811504%","height":"66px","top":"0px","left":"0%"},"customCss":{"pc":{"modelArea":{"background":"transparent"}}},"content":{"overflow":"visible"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"dh_style_01_1495502294245":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u5bfc\u822a\u83dc\u5355-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u5bfc\u822a\u83dc\u5355","styleHelpId":1257,"viewCtrl":"default","css":{"pc":{"width":"71.62592986184909%","z-index":"999","position":"absolute","top":"42.909725189208984px","left":"28.411462148030598%"},"pad":{"z-index":"999","left":"28.374070138150902%","width":"71.62592986184909%","top":"16px"},"mobile":{"width":"12.204424088402893%","z-index":"999","top":"5.961805820465088px","left":"87.45888960988898%"},"content":{"overflow":"visible"},"customCss":{"pc":{"%hot>a":{"color":"#498d9c","border-bottom-style":"solid"},"@mainMenuSet":{"border-bottom-style":"none","margin-left":"5px","margin-right":"5px"},"@mainMenuSet:hover":{"margin-left":"5px","margin-right":"5px","color":"#498d9c","border-bottom-style":"solid","border-bottom-color":"#498d9c"},"modelArea":{"padding-top":"5px","padding-bottom":"5px"}},"mobile":{"@mainMenuSet:hover":{"border-bottom-color":"transparent"}}}},"lock":{"height":"true"},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"dhAll":0,"dhid":[61708,61705,61709,61706,61704]},"moveEdit":[]},"image_logo_1495604573754":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageLogoConfig","setupFunc":"logoSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"LOGO\u5c5e\u6027\u8bbe\u7f6e"},"style":"logo","styleKind":"LOGO","styleHelpId":1252,"viewCtrl":"logo","css":{"pc":{"width":"18.833333333333332%","height":"111px","position":"absolute","top":"0.4826390743255615px","left":"0%"},"pad":{"left":"0.10221102032473947%","width":"17.534537725823593%","top":"0px","height":"79px"},"mobile":{"width":"131px","height":"65px","top":"0px","left":"0%"}},"data":{"logoType":1,"logoStyle":1,"logoBlank":"_self"},"name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","diyShowName":"LOGO","eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"layout_1495444851029":{"css":{"pc":{"height":"520px"},"content":{"overflow":"visible"},"pad":{"height":"346px"},"mobile":{"height":"139px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"tab_style_03_1495445214986":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"tabConfig","setupFunc":"tabSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u9009\u9879\u5361\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u9009\u9879\u5361-\u9ed8\u8ba4","styleShowName":"\u9ed8\u8ba4\u98ce\u683c","styleKind":"\u9009\u9879\u5361","viewCtrl":"default3","isInclude":"3","css":{"pc":{"width":"100%","height":"519px","position":"absolute","top":"0px","left":"0%"},"mobile":{"width":"100%","height":"139px","top":"0px","left":"0%"},"customCss":{"pc":{"@tabItemSet":{"background":"#f5f5f5","font-size":"14px"},"modelArea":{"background":"#f5f5f5","border-top-color":"#dddddd","border-right-color":"#dddddd","border-bottom-color":"#dddddd","border-left-color":"#dddddd","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"2px","border-right-width":"2px","border-bottom-width":"2px","border-left-width":"2px"},"@tabCurItem":{"background":"#47c667","color":"#ffffff"},"@tabconSet":{"background":"#ffffff","border-top-color":"#06c647","border-top-style":"solid","border-top-width":"2px"}}},"pad":{"height":"346px"}},"name":"tab","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u9009\u9879\u5361","eventSet":{"scrollView":"none","type":"none"},"data":{"tabtexttype":"center","tabtextset":"2","tabimgwidth":"","tabwidth":"105","tabname":["\u516c\u53f8\u65b0\u95fb","\u884c\u4e1a\u8d44\u8baf"],"slidetype":"0","tabtextmargin":"0","tabimg":["\/sysTools\/Model\/viewsRes\/publish\/img\/comm\/tabImg.png","\/sysTools\/Model\/viewsRes\/publish\/img\/comm\/tabImg.png"],"showtab":"","slideAnimat":"1","timeAnimat":"4"}},"image_style_01_1495445230745":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"519px","position":"absolute","top":"0px","left":"0%"},"pad":{"left":"0%","width":"100%","height":"344px"},"mobile":{"width":"100%","height":"139px","top":"0px"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"imgStyle":{"pc":"2","pad":"2","mobile":"2"},"imgUrl":"\/userimg\/1114\/pkgimg\/pkgimg\/1_01_0b3v.jpg"},"params":{"filelist":"","urllist":""}},"text_style_02_1495446560167":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"1200px","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"234px","left":"calc(50% - 600px)"},"pad":{"left":"0%","width":"100%","top":"175.98959350585938px"},"mobile":{"width":"370px","top":"67.00347900390625px","left":"0.7903873920440674%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"24px","text-align":"center"},"@view_contents:hover":{"text-align":"center","font-size":"24px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInUp","duration":"1","delay":"1","iteration":"1","offset":"0"}},"text_style_02_1495446502508":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"1200px","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"165.99305725097656px","left":"calc(50% - 600px)"},"pad":{"left":"0%","width":"100%","top":"113.9930419921875px"},"mobile":{"width":"370px","top":"25.427078247070312px","left":"0.7903873920440674%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"22px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInDown","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"image_style_01_1495445541212":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"520px","position":"absolute","top":"0px","left":"0%"},"pad":{"left":"0%","width":"100%","height":"343px"},"mobile":{"width":"100%","height":"137px","top":"0px"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1114/pkgimg/pkgimg/yi4y.jpg","imgStyle":{"pc":"2","pad":"2","mobile":"2"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1495527961999":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"1200px","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"248.89585876464844px","left":"calc(50% - 600px)"},"pad":{"left":"0%","width":"100%","top":"160.8854217529297px"},"mobile":{"width":"100%","top":"57.420135498046875px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","text-align":"right","font-size":"46px","padding-right":"312px"}},"pad":{"@view_contents":{"box-sizing":"border-box","padding-right":"180px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"22px","padding-right":"52px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInUp","duration":"3.1","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1495527711110":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"1200px","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"175.85069274902344px","left":"calc(50% - 600px)"},"pad":{"left":"0%","width":"100%","top":"97.80207824707031px"},"mobile":{"width":"100%","top":"23.996536254882812px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"46px","text-align":"center","padding-left":"0px","margin-left":"-150px"}},"pad":{"@view_contents":{"box-sizing":"border-box","margin-left":"-130px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"22px","margin-left":"-70px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInDown","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"layout_1495448887746":{"css":{"pc":{"height":"158.68405151367188px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"162.41448211669922px"},"mobile":{"height":"119.65278625488281px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout"},"text_style_07_1495511938668":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_07","diyShowName":"\u6587\u5b57\u6a21\u5757-Arial","styleKind":"\u82f1\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"1200px","font-size":"46px","color":"#333","line-height":"50px","font-family":"Arial","position":"absolute","top":"108.68405151367188px","left":"0%"},"pad":{"left":"0%","top":"112.41448211669922px","width":"100%"},"mobile":{"width":"100%","top":"69.65278244018555px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","text-align":"center","color":"#999999"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInLeft","duration":"1","delay":"1","iteration":"1","offset":"0"}},"text_style_02_1495449017210":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"99.58333333333333%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"64.82290649414062px","left":"0.2442156473795573%"},"pad":[],"mobile":{"width":"100%","top":"31.875px","left":"0%","z-index":2},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","text-align":"center","font-size":"42px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"36px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"28px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInDown","duration":"1","delay":"1","iteration":"1","offset":"0"}},"image_style_01_1495503631389":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"5.083333333333333%","height":"70px","position":"absolute","top":"47.22222900390625px","left":"58.98698298136394%"},"pad":{"left":"61.538407653095106%","top":"54.80902862548828px"},"mobile":{"width":"15%","height":"80px","top":"12.395832061767578px","left":"69.3713459215666%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1114/pkgimg/pkgimg/618c0b65a73d977917f03ec528df1afc.png","imgStyle":{"pc":"2","pad":null,"mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"tada","duration":"5.8","delay":"0.25","iteration":"infinite","offset":"0","filelist":"","urllist":""}},"image_style_01_1495503561854":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"5.083333333333333%","height":"70px","position":"absolute","top":"46.50459289550781px","left":"35.64822769165039%"},"pad":{"left":"33.101606216998206%","top":"54.80902862548828px"},"mobile":{"width":"15%","height":"80px","top":"9.70486068725586px","left":"16.301170148347556%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1114/pkgimg/pkgimg/20170523094038679.png","imgStyle":{"pc":"2","pad":null,"mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"tada","duration":"6","delay":"0.25","iteration":"infinite","offset":"0","filelist":"","urllist":""}},"layout_1495447384942":{"css":{"pc":{"height":"264.88889px"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"224.88889px"},"pad":{"height":"256.88889px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout"},"div_includeBlock_1495447753215":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"15%","height":"195px","position":"absolute","top":"27.96875px","left":"49.910012563069664%"},"pad":[],"mobile":{"width":"50%","height":"110px","top":"113.9375px","left":"0%","display":"block"},"customCss":{"pc":{"modelArea:hover":{"background":"#7fa654"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668333","eventSet":{"scrollView":"none","type":"ev_m_tabView","showViews":["image_style_01_1495594279310","text_style_02_1495594330655"],"hidViews":["image_style_01_1495594279310","text_style_02_1495594330655"]},"params":{"animate":"fadeInLeft","duration":"1","delay":"0.75","iteration":"1","offset":"0"}},"image_style_01_1495447753406":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"41.358024691358025%","height":"78px","position":"absolute","top":"35px","left":"29.311353895399307%"},"pad":[],"mobile":{"width":"50.0%","height":"55px","top":"10px","left":"22.451790633608816%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1114/pkgimg/pkgimg/5_jali.png","imgStyle":{"pc":"2","pad":"2","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"rubberBand","duration":"2.5","delay":"0.25","iteration":"1","offset":"0","filelist":"","urllist":""}},"text_style_02_1495447753415":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"120px","left":"0%"},"pad":{"left":"0%","width":"100%"},"mobile":{"width":"100%","top":"60px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1495594330655":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1green","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"119.98611450195312px","left":"0%","display":"none"},"pad":{"width":"100%","display":"none"},"mobile":{"width":"100%","top":"60px","left":"0%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","text-align":"center","color":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1495594279310":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20green","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"41.358024691358025%","height":"78px","position":"absolute","top":"35px","left":"29.45214165581597%","display":"none"},"pad":{"display":"none"},"mobile":{"width":"50%","height":"55px","top":"9.16668701171875px","left":"22.479898553145556%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1114/pkgimg/pkgimg/5_jaliaaa.png","imgStyle":{"pc":"2","pad":"2","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"rubberBand","duration":"2.5","delay":"0.25","iteration":"1","offset":"0","filelist":"","urllist":""}},"div_includeBlock_1495447726149":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"15%","height":"195px","position":"absolute","top":"27.96875px","left":"34.91001256306966%"},"pad":[],"mobile":{"width":"50%","height":"110px","top":"3.9375px","left":"50%","display":"block"},"customCss":{"pc":{"modelArea:hover":{"background":"#ff8d6e"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668222","eventSet":{"scrollView":"none","type":"ev_m_tabView","showViews":["text_style_02_1495594548406","image_style_01_1495594499294"],"hidViews":["image_style_01_1495594499294","text_style_02_1495594548406"]},"params":{"animate":"fadeInLeft","duration":"1","delay":"0.5","iteration":"1","offset":"0"}},"image_style_01_1495447726345":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"41.358024691358025%","height":"78px","position":"absolute","top":"35px","left":"29.320987654320987%"},"pad":[],"mobile":{"width":"50.0%","height":"55px","top":"10px","left":"25%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1114/pkgimg/pkgimg/4_zjw32.png","imgStyle":{"pc":"2","pad":"2","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"jello","duration":"2.5","delay":"0.5","iteration":"1","offset":"0","filelist":"","urllist":""}},"text_style_02_1495447726355":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"120px","left":"0%"},"pad":{"left":"0%","width":"100%"},"mobile":{"width":"100%","top":"60px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1495594548406":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1pink","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"119.94097900390625px","left":"0%","display":"none"},"pad":{"width":"100%","display":"none"},"mobile":{"width":"100%","top":"60px","left":"0%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","text-align":"center","color":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1495594499294":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20pink","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"41.358024691358025%","height":"78px","position":"absolute","top":"35px","left":"29.320987654320987%","display":"none"},"pad":{"display":"none"},"mobile":{"width":"50%","height":"55px","top":"9.62847900390625px","left":"25.539109079461348%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1114/pkgimg/pkgimg/4_zjw3dddd.png","imgStyle":{"pc":"2","pad":"2","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"jello","duration":"2.5","delay":"0.5","iteration":"1","offset":"0","filelist":"","urllist":""}},"div_includeBlock_1495447469295":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"15%","height":"196px","position":"absolute","top":"27.96875px","left":"19.910012563069664%"},"pad":[],"mobile":{"width":"50%","height":"111px","top":"2.947906494140625px","left":"0%"},"customCss":{"pc":{"modelArea":[],"modelArea:hover":{"background":"#6fc6a2"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668111","eventSet":{"scrollView":"none","type":"ev_m_tabView","showViews":["image_style_01_1495594855992","text_style_02_1495594998083"],"hidViews":["image_style_01_1495594855992","text_style_02_1495594998083"]},"params":{"animate":"fadeInLeft","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"image_style_01_1495447415992":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"41.358024691358025%","height":"74px","position":"absolute","top":"35px","left":"29.320987654320987%"},"pad":[],"mobile":{"width":"50.0%","height":"55px","top":"10px","left":"25%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/1114\/pkgimg\/pkgimg\/20170524140610319.png","imgStyle":{"pc":"2","pad":"2","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"rubberBand","duration":"2","delay":"0.25","iteration":"1","offset":"0","filelist":"","urllist":""}},"text_style_02_1495447507787":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"120px","left":"0%"},"pad":{"left":"0%","width":"100%"},"mobile":{"width":"100%","top":"60px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1495594998083":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1light","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"120px","left":"0%","display":"none"},"pad":{"width":"100%","display":"none"},"mobile":{"width":"100%","top":"61px","left":"0%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","text-align":"center","color":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1495594855992":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6flight","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"41.358024691358025%","height":"74px","position":"absolute","top":"35px","left":"29.320987654320987%","display":"none"},"pad":{"display":"none","left":"calc(50% - 29.5px)","top":"35px"},"mobile":{"width":"50%","height":"55px","top":"9.704864501953125px","left":"25.29788167853104%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/1114\/pkgimg\/pkgimg\/3_mher333.png","imgStyle":{"pc":"2","pad":"2","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"rubberBand","duration":"2","delay":"0.25","iteration":"1","offset":"0","filelist":"","urllist":""}},"div_includeBlock_1495447775225":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"15%","height":"195px","position":"absolute","top":"27.9305419921875px","left":"57.494215647379555%","display":"none"},"pad":{"display":"none"},"mobile":{"width":"50%","height":"111px","top":"159.96875381469727px","left":"50%","display":"none"},"customCss":{"pc":{"modelArea:hover":{"background":"#e7ce5a"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668444","eventSet":{"scrollView":"none","type":"ev_m_tabView","showViews":["text_style_02_1495593996513","image_style_01_1495593938304"],"hidViews":["text_style_02_1495593996513","image_style_01_1495593938304"]}},"image_style_01_1495447775429":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"37.03703703703704%","height":"80px","position":"absolute","top":"35px","left":"29.86111111111111%"},"pad":[],"mobile":{"width":"50.0%","height":"55px","top":"10px","left":"22.451790633608816%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1114/pkgimg/pkgimg/6_m76d.png","imgStyle":{"pc":"2","pad":"2","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"swing","duration":"2.5","delay":"1","iteration":"1","offset":"0","filelist":"","urllist":""}},"text_style_02_1495447775438":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"120px","left":"0%"},"pad":{"left":"0%","width":"100%"},"mobile":{"width":"100%","top":"60px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1495593938304":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20yellow","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"37.22222222222222%","height":"82px","position":"absolute","top":"35.052093505859375px","left":"29.86111111111111%","display":"none"},"pad":{"display":"none"},"mobile":{"width":"50%","height":"55px","top":"10px","left":"22.4%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1114/pkgimg/pkgimg/6_m76dkk.png","imgStyle":{"pc":"2","pad":"2","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"swing","duration":"2.5","delay":"1","iteration":"1","offset":"0","filelist":"","urllist":""}},"text_style_02_1495593996513":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1  yellow","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"120.05209350585938px","left":"0%","display":"none"},"pad":{"width":"100%","display":"none"},"mobile":{"width":"100%","top":"60.9757080078125px","left":"0%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","text-align":"center","color":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1495447932396":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"15.083333333333334%","height":"195px","position":"absolute","top":"27.96875px","left":"64.91001764933269%"},"pad":[],"mobile":{"width":"50%","height":"110.95486450195312px","top":"113.9375px","left":"50%","display":"block"},"customCss":{"pc":{"modelArea":{"background-size":"auto 100%","background-repeat":"no-repeat"},"modelArea:hover":{"background-size":"auto 100%","background":"#6dd5ec"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668555","eventSet":{"scrollView":"none","type":"ev_m_tabView","showViews":["image_style_01_1495593493490","text_style_02_1495593711338"],"hidViews":["image_style_01_1495593493490","text_style_02_1495593711338"]},"params":{"animate":"fadeInLeft","duration":"1","delay":"1","iteration":"1","offset":"0"}},"image_style_01_1495447932693":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"37.03703703703704%","height":"75px","position":"absolute","top":"35px","left":"29.320987654320987%"},"pad":[],"mobile":{"width":"50.0%","height":"55px","top":"10px","left":"22.451790633608816%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1114/pkgimg/pkgimg/7_w4oy.png","imgStyle":{"pc":"2","pad":"2","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"tada","duration":"2.7","delay":"1.25","iteration":"1","offset":"0","filelist":"","urllist":""}},"text_style_02_1495447932703":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"120px","left":"0%"},"pad":{"left":"0%","width":"100%"},"mobile":{"width":"100%","top":"60px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1495593711338":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1white","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"119.04168701171875px","left":"0%","display":"none"},"pad":{"display":"none"},"mobile":{"width":"100%","top":"60.961822509765625px","left":"0%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","text-align":"center","color":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"image_style_01_1495593493490":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20white","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"37%","height":"75px","position":"absolute","top":"35px","left":"31.5%","display":"none"},"pad":{"display":"none"},"mobile":{"width":"50%","height":"55px","top":"10px","left":"22.4%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1114/pkgimg/pkgimg/7_w4oysss.png","imgStyle":{"pc":"2","pad":"2","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"tada","duration":"2.7","delay":"1.25","iteration":"1","offset":"0","filelist":"","urllist":""}},"layout_1495697831558":{"css":{"pc":{"height":"318.659725189209px","display":"none"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"1518.6007690429688px","display":"none"},"mobile":{"height":"1028.6458129882812px","display":"none"}},"diyShowName":"\u533a\u57df\u5e03\u5c40  xxxxx","name":"layout","style":"autoLayout","eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1495698165124":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"25%","height":"232px","position":"absolute","top":"18.659725189208984px","left":"0%"},"pad":[],"mobile":{"width":"100%","height":"300px","top":"0px","left":"0%","display":"none"},"customCss":{"pc":{"modelArea":{"background":" url(\/userimg\/1114\/pkgimg\/pkgimg\/2_ea3n.png)","background-repeat":"no-repeat","background-size":"100% auto"},"modelArea:hover":{"background":" url(\/userimg\/1114\/pkgimg\/pkgimg\/2_ea3n.png)","background-size":"100% auto"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1495698419758":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"25%","height":"240.6px","position":"absolute","top":"20.625px","left":"26.164933522542317%"},"pad":{"height":"1497.9757690429688px"},"mobile":{"width":"100%","height":"1000px","top":"28.64581298828125px","left":"0%","display":"none"},"customCss":{"pc":{"modelArea":{"background-repeat":"no-repeat","background-size":"auto 100%","background":" url(\/userimg\/1114\/pkgimg\/pkgimg\/fckm.png)"},"modelArea:hover":{"background-size":"100% auto","background":" url(\/userimg\/1114\/pkgimg\/pkgimg\/fckm3.png)"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"div_blank_1495699060546":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u80cc\u666f","styleHelpId":1248,"viewCtrl":"blank","css":{"pc":{"width":"0.33333333333333337%","height":"95%","position":"absolute","top":"100%","left":"5%","display":"none"},"pad":{"left":"8.448753462603882%","width":"83.10249307479224%","display":"block"},"mobile":{"width":"300px","height":"200px","top":"0px","display":"block"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#ffffff"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u7a7a\u767d\u80cc\u666f111","eventSet":{"scrollView":"none","type":"none"},"setFixedScroll":{"pc":"2"}},"div_blank_1495700556179":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u80cc\u666f","styleHelpId":1248,"viewCtrl":"blank","css":{"pc":{"width":"0.33333333333333337%","height":"209px","position":"absolute","top":"calc( 100%)","left":"95%","display":"none"},"pad":{"display":"block"},"mobile":{"width":"83.10249307479222%","height":"200px","top":"200px","left":"8.44875346260389%","display":"block"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#ffffff"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u7a7a\u767d\u80cc\u666f111","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_blank_1495700861368":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u80cc\u666f","styleHelpId":1248,"viewCtrl":"blank","css":{"pc":{"width":"95%","height":"1px","position":"absolute","top":"8%","left":"100%","display":"block"},"pad":{"left":"8.448753462603882%","width":"83.10249307479224%","display":"block"},"mobile":{"width":"300px","height":"200px","top":"400px","display":"block"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#ffffff"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u7a7a\u767d\u80cc\u666f","eventSet":{"scrollView":"none","type":"none"}},"div_blank_1495700950172":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u80cc\u666f","styleHelpId":1248,"viewCtrl":"blank","css":{"pc":{"width":"92%","height":"1px","position":"absolute","top":"92%","left":"100%","display":"block"},"pad":{"display":"block"},"mobile":{"width":"83.10249307479222%","height":"200px","top":"600px","left":"8.44875346260389%","display":"block"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#ffffff"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u7a7a\u767d\u80cc\u666f","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_blank_1495702764556":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u80cc\u666f","styleHelpId":1248,"viewCtrl":"blank","css":{"pc":{"width":"2px","height":"95%","position":"absolute","top":"20.6px","left":"5%"},"pad":{"left":"8.448753462603882%","width":"83.10249307479224%"},"mobile":{"width":"300px","height":"200px","top":"800px"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#ffffff"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u7a7a\u767d\u80cc\u666f","eventSet":{"scrollView":"none","type":"none"}},"div_blank_07_1495698773661":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u9634\u5f71\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank_07","styleKind":"\u56fe\u5f62\u6a21\u5757","styleHelpId":1248,"viewCtrl":"blank_07","css":{"pc":{"width":"23.398148333333335%","height":"207.77778px","position":"absolute","top":"31.756922988281303px","left":"54.9971071879069%"},"pad":[],"mobile":{"width":"83.10249307479224%","height":"200px","top":"328.64581298828125px","left":"8.448753462603882%"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","border":"1px solid #56AAFF","border-top-color":"#ffffff","border-right-color":"#ffffff","border-bottom-color":"#ffffff","border-left-color":"#ffffff"},"@modSet":{"border-top-color":"#ffffff","border-right-color":"#ffffff","border-bottom-color":"#ffffff","border-left-color":"#ffffff"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u56fe\u5f62\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"zoomIn","duration":"2","delay":"0.25","iteration":"1","offset":"0"},"moveEdit":[]},"layout_1495678959723":{"css":{"pc":{"height":"402.88889px"},"content":{"overflow":"visible","max-width":"1200px"},"customCss":{"pc":{"modelArea":{"background":" url(\/userimg\/1114\/pkgimg\/pkgimg\/banner_xouc11.png)","background-repeat":"no-repeat","background-size":"auto 100%","background-attachment":"fixed"}}},"pad":{"height":"372.88889px"},"mobile":{"height":"493.4305725097656px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1495624360889":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"314px","position":"absolute","top":"57.99652099609375px","left":"0%"},"pad":{"height":"270px","top":"54.986114501953125px","left":"0%"},"mobile":{"width":"95%","height":"467.4791717529297px","top":"25.951400756835938px","left":"2.499086480391653%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"image_style_01_1495625350609":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"47.20138931274414%","height":"286px","position":"absolute","top":"0px","left":"0%"},"pad":{"left":"1.2748702046214966%","width":"48.777895855472906%","top":"0px","height":"242px"},"mobile":{"width":"380px","height":"200px","top":"0px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1114/pkgimg/pkgimg/about.jpg","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInLeft","duration":"1.6","delay":"1","iteration":"1","offset":"0","filelist":"","urllist":""}},"div_blank_1495624324259":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u80cc\u666f","styleHelpId":1248,"viewCtrl":"blank","css":{"pc":{"width":"52.916666666666664%","height":"286px","position":"absolute","top":"0px","left":"46.99942525227865%"},"pad":{"width":"48.88416578108396%","left":"50.06125568710149%","top":"0px","height":"241px"},"mobile":{"width":"100%","height":"225px","top":"200.95140075683594px","left":"0%"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#e5e5e3","opacity":"0.9"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u7a7a\u767d\u80cc\u666f","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"fadeInRight","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1495625128092":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"30.833333333333336%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"55.328125px","left":"49.614583333333336%"},"pad":{"left":"51.85972369819341%","width":"48.14027630180659%","top":"15.229171752929688px"},"mobile":{"width":"95%","top":"210.9166717529297px","left":"2.452677570881936%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"32px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"22px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"22px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInRight","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1495624701115":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"48.083333333333336%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"112.234375px","left":"49.614583333333336%"},"pad":{"left":"51.51324054259929%","width":"46.86503719447396%","top":"72.10417175292969px"},"mobile":{"width":"95.01385041551247%","top":"267.4791717529297px","left":"2.452677570881936%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"22px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"14px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","line-height":"35px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInRight","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"layout_1495610373940":{"css":{"pc":{"height":"190.88889px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"189.88889px"},"mobile":{"height":"185.9895896911621px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout"},"text_style_02_1495610373948":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"81.33333333333333%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"155.78472900390625px","left":"9.32870356241862%"},"pad":{"width":"788px"},"mobile":{"width":"95%","top":"110.98958969116211px","left":"2.5%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInDown","duration":"1","delay":"1","iteration":"1","offset":"0"}},"text_style_07_1495610373976":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_07","diyShowName":"\u6587\u5b57\u6a21\u5757-Arial","styleKind":"\u82f1\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"1200px","font-size":"46px","color":"#333","line-height":"50px","font-family":"Arial","position":"absolute","top":"108.68405151367188px","left":"0%"},"pad":{"left":"0%","top":"112.41448211669922px","width":"100%"},"mobile":{"width":"100%","top":"69.65278244018555px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","text-align":"center","color":"#999999"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInLeft","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1495610373992":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"99.58333333333333%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"64.82290649414062px","left":"0.2442156473795573%"},"pad":[],"mobile":{"width":"100%","top":"31.875px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","text-align":"center","font-size":"42px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"36px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"28px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInDown","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"image_style_01_1495610374018":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"5.083333333333333%","height":"70px","position":"absolute","top":"47.22222900390625px","left":"58.98698298136394%"},"pad":{"left":"61.538407653095106%","top":"54.80902862548828px"},"mobile":{"width":"15%","height":"80px","top":"12.395832061767578px","left":"69.3713459215666%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1114/pkgimg/pkgimg/618c0b65a73d977917f03ec528df1afc.png","imgStyle":{"pc":"2","pad":null,"mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"tada","duration":"5.8","delay":"0.25","iteration":"infinite","offset":"0","filelist":"","urllist":""}},"image_style_01_1495610374024":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"5.083333333333333%","height":"70px","position":"absolute","top":"46.50459289550781px","left":"35.64822769165039%"},"pad":{"left":"33.101606216998206%","top":"54.80902862548828px"},"mobile":{"width":"15%","height":"80px","top":"9.70486068725586px","left":"16.301170148347556%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1114/pkgimg/pkgimg/20170523094038679.png","imgStyle":{"pc":"2","pad":null,"mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"tada","duration":"6","delay":"0.25","iteration":"infinite","offset":"0","filelist":"","urllist":""}},"layout_1495529953675":{"css":{"pc":{"height":"352.7708435058594px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"299.765625px"},"mobile":{"height":"419.6666603088379px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"prodKind_style_03_1495530160223":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"prodKindConfig","setupFunc":"prodKindSetup,SettingtabChange"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u4ea7\u54c1\u7c7b\u522b\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u5546\u57ce\u7248\u5206\u7c7b-\u98ce\u683c3","styleShowName":"\u98ce\u683c3","styleKind":"AAA","styleHelpId":1270,"viewCtrl":"prodKind","css":{"pc":{"width":"41.66666666666667%","position":"absolute","top":"40.760406494140625px","left":"29.162036895751953%"},"pad":[],"mobile":{"width":"95%","top":"0px","left":"2.5%"},"content":{"overflow":"visible"}},"lock":{"height":"true"},"name":"prodKind","kind":"\u4ea7\u54c1\u6a21\u5757","showname":"\u4ea7\u54c1\u5206\u7c7b","eventSet":{"scrollView":"none","type":"none"},"data":[],"params":{"animate":"fadeInUp","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"productList_style_03_1495529974293":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"prodListConfig","setupFunc":"prodListSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u4ea7\u54c1\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_05","diyShowName":"\u4ea7\u54c1\u5217\u8868-\u98ce\u683c5","styleShowName":"\u98ce\u683c5","styleShowImg":"../sysTools/Model/viewsRes/showImg/productList_style_5.png","styleShowClass":"one","styleKind":"AAA","styleHelpId":1269,"viewCtrl":"default","css":{"pc":{"width":"100%","left":"0%","top":"99.77084350585938px","position":"absolute"},"pad":{"width":"95%","left":"2.5%"},"mobile":{"width":"95%","left":"2.5%","top":"146.6666603088379px"},"content":{"overflow":"visible"},"customCss":{"pc":{"@titleSet":{"text-align":"center"},"@imgSet":{"border-top-left-radius":"0px","border-bottom-left-radius":"0px"},"@modSet":{"border-top-left-radius":"10px","border-bottom-left-radius":"10px","border-top-right-radius":"10px","border-bottom-right-radius":"10px"}},"mobile":{"@modSet":{"margin-top":"10px","margin-bottom":"10px"},"@modSet:hover":{"margin-top":"10px","margin-bottom":"10px"}}}},"lock":{"height":"true"},"prodhnum":"5","prodhnumpad":"3","prodhnummobile":"2","prodznum":"1","picscale":"4:3","prodtitle":"true","prodprice":"true","prodviprice":"true","arr_ProdShow":{"pic":"\u56fe\u7247","title":"\u6807\u9898","page":"\u5206\u9875","price":"\u4ef7\u683c","stock":"\u6309\u94ae","viprice":"\u4f1a\u5458\u4ef7"},"pshow":["title","price","viprice"],"name":"productList","kind":"\u4ea7\u54c1\u6a21\u5757","showname":"\u4ea7\u54c1\u5217\u8868","prodpic":"true","prodpage":"true","prodstock":"true","eventSet":{"scrollView":"none","type":"none"},"data":{"prodhnumpc":"4","prodhnum":"4","prodnum":"4","prodPicScale":"2:3","pshow":["pic","title","page"],"prodTitleNum":{"pc":"20","pad":null,"mobile":null},"prodhnumpad":"4","showat":61707},"params":{"animate":"fadeInRight","duration":"1","delay":"1","iteration":"1","offset":"0"}},"layout_1495533118429":{"css":{"pc":{"height":"19.888890000000004px"},"content":{"overflow":"visible","max-width":"1200px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"layout_1495613219110":{"css":{"pc":{"height":"620.9722366333008px"},"content":{"overflow":"visible","max-width":"1200px"},"customCss":{"pc":{"modelArea":{"background-repeat":"no-repeat","background":" url(\/userimg\/1114\/pkgimg\/pkgimg\/1_01_0b3v.jpg)","background-size":"auto 100%","background-attachment":"fixed"}}},"mobile":{"height":"938px"},"pad":{"height":"641.0104141235352px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"div_includeBlock_1495532753034":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"620.9722366333008px","position":"absolute","top":"0px","left":"0%"},"pad":{"height":"642px","top":"-1px","left":"0%"},"mobile":{"width":"100%","height":"939px","top":"-1px","left":"0%"},"content":{"overflow":"visible"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"autoHeight":"true"},"text_style_02_1495612340015":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"18.5%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"97.14932250976562px","left":"0.4152208964029948%","z-index":2},"pad":{"left":"0%","width":"24.654622741764083%","top":"91.14932250976562px"},"mobile":{"width":"132px","top":"72.79515075683594px","left":"1.305738373806602%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"42px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"36px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"22px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInLeft","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"image_style_01_1495612505029":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"28.083333333333332%","height":"180px","position":"absolute","top":"54.145843505859375px","left":"5.238426208496094%","z-index":1},"pad":{"left":"10.509653121834733%","width":"36.98193411264612%","top":"49.53125px","height":"168px"},"mobile":{"width":"224px","height":"139px","top":"35.923614501953125px","left":"10.060307352166427%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1114/pkgimg/pkgimg/20170524161415141.png"},"eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInDown","duration":"1","delay":"0.25","iteration":"1","offset":"0","filelist":"","urllist":""}},"text_style_02_1495612798467":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"28.083333333333332%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"157.14932250976562px","left":"5.279225667317709%","z-index":2},"pad":{"width":"358px","left":"9.981993331665947%","top":"149.11459350585938px"},"mobile":{"width":"58.4375%","top":"113.87501525878906px","left":"15.839730312949731%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"42px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"36px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"22px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"fadeInLeft","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1495532535583":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"80.83333333333333%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"290.9722366333008px","left":"10.57552210489909%","z-index":2},"pad":{"width":"818px","left":"10.247668145693577%","top":"266.9618225097656px"},"mobile":{"width":"90.78947368421053%","top":"209px","left":"5%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"16px","letter-spacing":"1.2px","color":"#ffffff","padding-bottom":"50px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","padding-bottom":"30px","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"fadeInUp","duration":"1","delay":"1","iteration":"1","offset":"0"}},"layout_1495614970835":{"css":{"pc":{"height":"165.88889px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"162.41448211669922px"},"mobile":{"height":"119.65278244018555px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout"},"text_style_07_1495614970850":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_07","diyShowName":"\u6587\u5b57\u6a21\u5757-Arial","styleKind":"\u82f1\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"1200px","font-size":"46px","color":"#333","line-height":"50px","font-family":"Arial","position":"absolute","top":"108.68405151367188px","left":"0%"},"pad":{"left":"0%","top":"112.41448211669922px","width":"100%"},"mobile":{"width":"100%","top":"69.65278244018555px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","text-align":"center","color":"#999999"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInLeft","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1495614970865":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"99.58333333333333%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"64.82290649414062px","left":"0.2442156473795573%"},"pad":[],"mobile":{"width":"100%","top":"31.875px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","text-align":"center","font-size":"42px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"36px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"28px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeInDown","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"image_style_01_1495614970884":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"5.083333333333333%","height":"70px","position":"absolute","top":"47.22222900390625px","left":"58.98698298136394%"},"pad":{"left":"61.538407653095106%","top":"54.80902862548828px"},"mobile":{"width":"15%","height":"80px","top":"12.395832061767578px","left":"69.3713459215666%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1114/pkgimg/pkgimg/618c0b65a73d977917f03ec528df1afc.png","imgStyle":{"pc":"2","pad":null,"mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"tada","duration":"5.8","delay":"0.25","iteration":"infinite","offset":"0","filelist":"","urllist":""}},"image_style_01_1495614970888":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"5.083333333333333%","height":"70px","position":"absolute","top":"46.50459289550781px","left":"35.64822769165039%"},"pad":{"left":"33.101606216998206%","top":"54.80902862548828px"},"mobile":{"width":"15%","height":"80px","top":"9.70486068725586px","left":"16.301170148347556%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1114/pkgimg/pkgimg/20170523094038679.png","imgStyle":{"pc":"2","pad":null,"mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"tada","duration":"6","delay":"0.25","iteration":"infinite","offset":"0","filelist":"","urllist":""}},"layout_1495503192398":{"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","css":{"content":{"overflow":"visible","max-width":"1200px"},"pc":{"height":"890px"},"pad":{"height":"736px"},"mobile":{"height":"828px"}},"settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"newsList_style_04_1495504523825":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsBhj","act":"newListCfg","setupFunc":"newListSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u65b0\u95fb\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_04","diyShowName":"\u65b0\u95fb\u5217\u8868-\u98ce\u683c4","styleShowName":"\u98ce\u683c4","styleKind":"AAA","styleHelpId":1266,"viewCtrl":"newsList","css":{"pc":{"width":"99.83333333333333%","position":"absolute","top":"0px","left":"0.078125%"},"pad":{"width":"95%","left":"2.499926381612812%","top":"0px"},"mobile":{"width":"95%","top":"0px","left":"2.5%"}},"lock":{"height":"true"},"params":{"titlenum":10,"detailnum":10,"animate":"fadeInUp","duration":"1","delay":"0.25","iteration":"1","offset":"0"},"data":{"newsShow":["pic","date","title","kind","summary","page","article"],"hidden":null,"comments_num":10,"sort":"id","property_disable":[".picScale","._column"],"newsnum":"6","column":1,"gid":0,"newPicScale":"3:4","titlenum":"8","detailnum":{"pc":"28","pad":null,"mobile":null},"newshnumpad":"3","newshnum":"3","newshnumpc":"3","showat":61711},"newList":{"pic":"\u56fe\u7247","date":"\u65e5\u671f","title":"\u6807\u9898","kind":"\u7c7b\u522b","summary":"\u6458\u8981","page":"\u5206\u9875","article":"\u67e5\u770b\u5168\u6587"},"newshnum":4,"newshnumpad":3,"newshnummobile":2,"newsznum":1,"tnum":10,"dnum":10,"name":"newsList","kind":"\u65b0\u95fb\u6a21\u5757","showname":"\u65b0\u95fb\u5217\u8868","eventSet":{"scrollView":"none","type":"none"}},"layout_1495508747152":{"css":{"pc":{"height":"37.88889px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"12.888890000000004px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout"},"comm_layout_footer":{"diyShowName":"\u5171\u4eab\u5e95\u90e8","css":{"pc":{"height":"408.5px","display":"block"},"content":[],"pad":{"height":"409.5px","display":"block"},"mobile":{"height":"66.98956298828125px","display":"block"},"undefined":{"height":"104px"}},"settingsBox":{"showTitle":"\u5171\u4eab\u5e95\u90e8\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"false"},"div_includeBlock_1490780863382":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"408.5px","position":"absolute","top":"0px","left":"0%"},"pad":{"height":"409.5px","width":"100%","left":"0%"},"mobile":{"width":"100%","height":"66.98956298828125px","top":"0px","left":"0%"},"customCss":{"pc":{"modelArea":{"background":"#212121","background-repeat":"no-repeat","background-size":"cover","background-position-x":"50%"}},"mobile":{"modelArea":{"background-position-x":"50%","background":"#000000"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"autoHeight":"false","viewLock":{"mobile":[]}},"div_includeBlock_1490941409766":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"1200px","height":"283px","position":"absolute","top":"15.5px","left":"calc(50% - 600px)"},"pad":{"left":"2.014846235418876%","width":"96%","height":"291.5px","top":"20px"},"mobile":{"width":"96%","height":"227px","top":"13px","left":"2%","display":"none"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"div_includeBlock_1492138557350":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u5bb9\u5668\u6a21\u5757","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"23%","height":"237.5px","position":"absolute","top":"0px","left":"77%"},"pad":{"width":"165px","left":"81.77313535911603%","height":"229.5px"},"mobile":{"width":"100%","height":"240px","top":"467px","left":"0%","display":"none"},"undefined":{"height":"72px"},"customCss":{"pc":{"modelArea":{"border-bottom-color":"#ffffff","border-bottom-style":"none","border-bottom-width":"1px"}}}},"name":"div","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u7ed3\u6784\u6a21\u5757","diyShowName":"\u5bb9\u5668\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"},"autoHeight":"true"},"text_style_02_1492138557698":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"62.5%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","left":"12.596240942028986%","top":"29.5px"},"pad":[],"mobile":{"width":"97.30000000000001%","left":"1.3499999999999943%","top":"0px"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"20px","font-weight":"normal","text-align":"left","font-family":"Microsoft YaHei","line-height":"30px","letter-spacing":"2px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"24px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"30px","font-weight":"normal"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"}},"div_blank_1492138557692":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u6a21\u5757","viewCtrl":"blank","css":{"pc":{"width":"50px","height":"3px","position":"absolute","left":"12.596240942028986%","top":"70px","z-index":2},"pad":[],"mobile":{"width":"20.263157894736842%","height":"3px","left":"39.868421052631575%","top":"0px","display":"block"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#498d9c"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"name":"div","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u7ed3\u6784\u6a21\u5757","diyShowName":"\u7a7a\u767d\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"}},"dh_style_03_1492138489118":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u5bfc\u822a\u83dc\u5355-\u98ce\u683c3","styleShowName":"\u98ce\u683c3","styleShowImg":"../sysTools/Model/viewsRes/showImg/dh_style_3.png","styleShowClass":"one","styleKind":"\u5bfc\u822a\u83dc\u5355","viewCtrl":"default","css":{"pc":{"width":"36.91756272401434%","z-index":"999","left":"8.973052536231885%","top":"97.5px","position":"absolute"},"pad":{"z-index":"999","width":"93px","left":"6.377704326923077%","top":"89.5px"},"mobile":{"width":"14.348025711662075%","z-index":"999","left":"42.82598714416896%","top":"240px"},"content":{"overflow":"visible"},"customCss":{"pc":{"@columnSet":{"background":"transparent","font-size":"12px","line-height":"14px","color":"#bfbfbf"},"%hot>a":{"background":"transparent","color":"#bfbfbf"},"@mainMenuSet":{"border-right-style":"none","border-bottom-style":"none","height":"28px","line-height":"28px","color":"#bfbfbf"},"@mainMenuSet:hover":{"background":"transparent"}}}},"lock":{"height":"true"},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"data":{"dhAll":"1","dhid":[61708,61705,61709,61706,61704],"dhOpen":""}},"div_includeBlock_1482994420520":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u5bb9\u5668\u6a21\u5757","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"40.08333333333333%","height":"247.5px","position":"absolute","top":"0px","left":"35.083333333333336%"},"pad":{"height":"291.5px","width":"306px","left":"46.83011049723757%","top":"0px"},"mobile":{"width":"100%","height":"240px","top":"0px","left":"0%","display":"none"},"undefined":{"height":"72px"},"customCss":{"pc":{"modelArea":{"border-bottom-color":"#ffffff","border-bottom-style":"none","border-bottom-width":"1px"}}}},"name":"div","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u7ed3\u6784\u6a21\u5757","diyShowName":"\u5bb9\u5668\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"},"autoHeight":"true"},"div_blank_1490781609085":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u6a21\u5757","viewCtrl":"blank","css":{"pc":{"width":"50px","height":"3px","position":"absolute","left":"4.9921875%","top":"72px","z-index":2},"pad":[],"mobile":{"width":"20.263157894736842%","height":"3px","left":"39.868421052631575%","top":"0px","display":"block"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#498d9c"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"name":"div","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u7ed3\u6784\u6a21\u5757","diyShowName":"\u7a7a\u767d\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1490781553208":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"62.5%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","left":"4.9921875%","top":"31.5px"},"pad":[],"mobile":{"width":"97.30000000000001%","left":"1.3499999999999943%","top":"0px"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"20px","font-weight":"normal","text-align":"left","font-family":"Microsoft YaHei","line-height":"30px","letter-spacing":"2px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"24px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"30px","font-weight":"normal"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1490781323011":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"90.22869022869024%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"97.5px","left":"5%"},"pad":{"left":"5%","width":"90%","top":"91.5px"},"mobile":{"width":"370px","top":"0px"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-family":"Microsoft YaHei","font-size":"14px","color":"#bfbfbf","line-height":"30px","text-indent":"2em"}},"pad":{"@view_contents":{"box-sizing":"border-box","text-indent":"2em","line-height":"25px"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1490781436192":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u5bb9\u5668\u6a21\u5757","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"34.583333333333336%","height":"283px","position":"absolute","top":"0px","left":"0%"},"pad":{"height":"285.5px","width":"407px"},"mobile":{"width":"100%","height":"145px","top":"0px","left":"0%","display":"block"},"undefined":{"height":"72px"},"customCss":{"pc":{"modelArea":{"border-left-color":"#ffffff","border-left-style":"none","border-left-width":"1px"}},"mobile":{"modelArea":{"border-left-width":"0px"}}}},"name":"div","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u7ed3\u6784\u6a21\u5757","diyShowName":"\u5bb9\u5668\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"},"autoHeight":"true"},"text_style_02_1490784439268":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"84%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"212.5px","left":"11.671875%"},"pad":{"top":"212px","left":"11.393382352941178%","width":"72.42524916943522%"},"mobile":{"width":"100%","top":"0px","left":"0%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-family":"Microsoft YaHei","font-size":"14px","color":"#bfbfbf","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_blank_1490782153878":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank","styleKind":"\u7a7a\u767d\u6a21\u5757","viewCtrl":"blank","css":{"pc":{"width":"50px","height":"3px","position":"absolute","left":"4.03125%","top":"72px","z-index":2},"pad":{"top":"73px","height":"3px","left":"1.9656019656019657%"},"mobile":{"width":"20.263157894736842%","height":"3px","left":"39.868421052631575%","top":"0px","display":"none"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#498D9C"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"name":"div","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u7ed3\u6784\u6a21\u5757","diyShowName":"\u7a7a\u767d\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"}},"image_style_01_1490784932610":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"9.5%","height":"25px","position":"absolute","top":"136px","left":"1.41796875%"},"pad":{"left":"0.2457002457002457%","width":"9.647058823529411%","top":"137.5px","height":"27px"},"mobile":{"width":"55.09641873278237%","height":"200px","top":"0px","left":"22.451790633608816%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1108/pkgimg/bottom_phone.png","imgStyle":{"pc":"3","pad":"3","mobile":null}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":""}},"image_style_01_1490785166449":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"6.833333333333333%","height":"25px","position":"absolute","top":"176px","left":"2.69921875%"},"pad":{"left":"0.5835380835380835%","top":"177px","height":"25px","width":"37px"},"mobile":{"width":"55.09641873278237%","height":"200px","top":"0px","left":"22.451790633608816%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1108/pkgimg/bottom_email.png","imgStyle":{"pc":"3","pad":"3","mobile":null}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":""}},"image_style_01_1490785073478":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"6.166666666666667%","height":"25px","position":"absolute","top":"214.5px","left":"3.0390625%"},"pad":{"left":"0.9411764705882352%","top":"213px","width":"38px","height":"27px"},"mobile":{"width":"55.09641873278237%","height":"200px","top":"0px","left":"22.451790633608816%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1108/pkgimg/bottom_fax.png","imgStyle":{"pc":"3","pad":"3","mobile":null}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":""}},"image_style_01_1490785630672":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"10%","height":"35px","position":"absolute","top":"248px","left":"1.08984375%"},"pad":{"left":"0.4914004914004914%","top":"247.5px","height":"38px"},"mobile":{"width":"55.09641873278237%","height":"200px","top":"600px","left":"22.451790633608816%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../userimg/1108/pkgimg/bottom_adress.png","imgStyle":{"pc":"3","pad":"3","mobile":null}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":""}},"text_style_02_1490781436389":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"66.5%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"97.5px","left":"11.74609375%"},"pad":{"left":"11.295681063122927%","width":"77.40863787375415%","top":"92.5px"},"mobile":{"width":"100%","top":"0px","left":"0%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-family":"Microsoft YaHei","font-size":"14px","color":"#bfbfbf","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_02_1492138106385":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"49.5%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"134px","left":"11.46875%"},"pad":{"left":"11.125%","top":"134px","width":"216px"},"mobile":{"width":"100%","top":"145px","left":"0%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-family":"Microsoft YaHei","font-size":"14px","color":"#bfbfbf","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_02_1490784463734":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"66.25%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"174.5px","left":"11.9921875%"},"pad":{"left":"11.528716216216216%","top":"175px","width":"190px"},"mobile":{"width":"100%","top":"0px","left":"0%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-family":"Microsoft YaHei","font-size":"14px","color":"#bfbfbf","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_02_1490785640977":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"88.1015625%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"250.5px","left":"11.9140625%"},"pad":{"left":"11.390509828009828%","top":"254px","width":"357px"},"mobile":{"width":"100%","top":"800px","left":"0%","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-family":"Microsoft YaHei","font-size":"14px","color":"#bfbfbf","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box","line-height":"25px"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_02_1490782085541":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u5b57\u4f53","viewCtrl":"default","css":{"pc":{"width":"56.333333333333336%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","left":"4.046875%","top":"31.5px"},"pad":{"left":"1.9656019656019657%","top":"29.5px"},"mobile":{"width":"97.30000000000001%","left":"1.3499999999999943%","top":"0px","display":"none"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"20px","font-weight":"normal","text-align":"left","font-family":"Microsoft YaHei","line-height":"30px","letter-spacing":"2px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"24px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"18px","line-height":"30px","font-weight":"normal"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u6587\u5b57\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"2","delay":"0.25","iteration":"1","offset":"0"}},"image_style_01_1495503193821":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"9.615384615384617%","height":"25px","position":"absolute","top":"97.5px","left":"1.6551494598388672%"},"pad":{"top":"97.5px","left":"0.41973807594992896%"},"mobile":{"width":"57.39210284664831%","height":"200px","top":"0px","left":"21.303948576675847%","display":"none"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"../sysTools/Model/views/footer/z_12/v9Res/67326e5bfa5fcf0be15ce360991ebe79.png","imgStyle":{"pc":"3","pad":"3","mobile":"null"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":""}},"div_includeBlock_1490781513375":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u5bb9\u5668\u6a21\u5757","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"72px","position":"absolute","top":"336.5px","left":"0%"},"pad":{"left":"calc(50% - 471.5px)","top":"338.5px"},"mobile":{"width":"96.00000000000001%","height":"66.98956298828125px","top":"0px","left":"1.999999999999993%","display":"block"},"undefined":{"height":"72px"},"customCss":{"pc":{"modelArea":{"background":"#000000"}}}},"name":"div","kind":"\u57fa\u7840\u6a21\u5757","showname":"\u7ed3\u6784\u6a21\u5757","diyShowName":"\u5bb9\u5668\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"duration":"1.8","delay":"0.25","iteration":"1","offset":"0"}},"text_style_02_1490786801909":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"21px","left":"0%"},"pad":{"width":"100%","left":"0%","top":"21px"},"mobile":{"width":"100%","top":"6.98956298828125px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-family":"Microsoft YaHei","font-size":"16px","color":"#bfbfbf","line-height":"30px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","text-align":"center","font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]}}