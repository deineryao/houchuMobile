//常量
Constant = {};

/**
 * 返回参数数组，通过params[paramName]访问
 */
function getParams(){
	var paramMaps = [];
	var href = document.location.href;
	var paramSplitTmp = href.split(/[?#]/);
	if(paramSplitTmp.length < 2){
		return paramMaps;
	}
	var paramStrs = paramSplitTmp[1].split('&');
	for(var i = 0; i < paramStrs.length; i++){
		paramExp = paramStrs[i].split('=');
		if(paramExp.length > 1){
			paramMaps[paramExp[0]] = paramExp[1];
		}else{
			paramMaps[paramExp[0]] = true;
		}
	}
	return paramMaps;
};

Constant.baseUrl = "";
if(!Constant.baseUrl){
	Constant.baseUrl = window.location.href.split("/yw-admin/")[0] + "/yw-admin/";
}
/*
 * @模式对话框类
 * @param {String} title 对话框标题
 * @param {String} content 对话框内容,可为html
 * @param {String} btn1 第一个按钮文字
 * @param {String} btn1Callback 第一个按钮回调方法
 * @param {String} btn2 第二个按钮文字，可选
 * @param {String} btn2Callback 第二个按钮回调方法，可选
 * 
 * @return {PDialog} 公开方法：show();hide();
 */
PDialog = function(title, content, btn1, btn1Callback, btn2, btn2Callback) {
	var me = this;

	var mask = $('<div class="p_dialog_mask"></div>');
	var dialog = $('<div class="p_dialog_box"></div>');

	$("body").append(mask);
	$("body").append(dialog);

	dialog.html('');
	var html = '<div class="p_dialog_container">';
	if (title) {
		html += '<h1>' + title + '</h1>';
	}
	html += '<div name="content-container" style="overflow:auto;"><div class="content">'
			+ content + '</div></div>';
	if (btn1 || btn1Callback || btn2 || btn2Callback) {
		html += '<div class="btn-container">';
		if ((btn1 || btn1Callback) && (btn2 || btn2Callback)) {
			html += '<div><a name="btn1">'
					+ (btn1 || '取消') + '</a></div>';
			html += '<div><a class="btn2" name="btn2">' + (btn2 || '确定')
					+ '</a></div>';
		} else {
			if (btn1 || btn1Callback) {
				html += '<a name="btn1">' + (btn1 || '取消')
						+ '</a>';
			}
			if (btn2 || btn2Callback) {
				html += '<a name="btn2">' + (btn2 || '确定')
						+ '</a>';
			}
		}
		html += '</div></div>';
	}
	dialog.html(html);
	if (btn1 || btn1Callback) {
		dialog.delegate(".btn-container [name='btn1']", "click", btn1Callback);
	}
	if (btn2 || btn2Callback) {
		dialog.delegate(".btn-container [name='btn2']", "click",btn2Callback);
	}

	// 公开方法、属性
	this.show = function() {
		mask.show();
		dialog.show();
		return dialog;
	};
	this.hide = function() {
		dialog.remove();
		mask.remove();
	};
	this.getContentCtner = function(){
		return $(dialog).find(".content");
	};
	this.getTitleCtner = function(){
		return $(dialog).children("h1");
	};
	this.getButton1Ctner = function(){
		return $(dialog).find(".btn-container [name='btn1']");
	};
	this.getButton2Ctner = function(){
		return $(dialog).find(".btn-container [name='btn2']");
	};
}
//判断是否是微信浏览器打开
function is_weixn(){  
    var ua = navigator.userAgent.toLowerCase();  
    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
        return true;  
    } else {  
        return false;  
    }  
}  
function hasNative(){
	return typeof(Native) != "undefined";
}

Toast = {
	msgQueue : [],
	delayQueue : [],
	_show : function(msg, delay) {
		$("body > #toast_container").html(msg);
		$("body > #toast_container").show();
		var leftPercent = (($(window).width() - $("body > #toast_container")
				.width())
				/ 2 / $(window).width() * 100)
				+ '%';
		$("body > #toast_container").css("left", leftPercent);
		setTimeout("Toast._hideOne()", delay);
	},
	_hideOne : function() {
		if (Toast.msgQueue.length > 0) {
			Toast._show(Toast.msgQueue.shift(), Toast.delayQueue.shift());
		} else {
			$("body > #toast_container").hide();
		}
	},
	/**
	 * 显示提示
	 * 
	 * @param {String}
	 *            msg 提示内容，可为html代码
	 * @param {Number}
	 *            delay 提示展示毫秒时间，可选，默认为3秒
	 */
	show : function(msg, delay) {
		if(hasNative() && Native.showToast){
			Native.showToast(msg);
			return;
		}
		if ($("body > #toast_container").length == 0) {
			var toastDom = $("<div id='toast_container' style='display:none;'></div>");
			$("body").append(toastDom);
		}
		delay = delay || 3000;
		if ($("body > #toast_container").css("display") != 'none') {
			Toast.msgQueue.push(msg);
			Toast.delayQueue.push(delay);
		} else {
			Toast._show(msg, delay);
		}
	}
};

//获得当前年月日
function getCurrentTime(){
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth()+1;
	var day = myDate.getDate();
	var currentTime = year+'-'+(month<10?"0"+month:month)+'-'+(day<10?"0"+day:day);
	return currentTime;
}
