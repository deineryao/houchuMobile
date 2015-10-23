(function($) {$.extend($.fn,
					{
						"numberInput" : function() {
							//配置项
							var min = typeof(this.attr("min")) != "undefined" ? (this.attr("min") != null ? new Number(this.attr("min")) : Number.NEGATIVE_INFINITY) : Number.NEGATIVE_INFINITY;
							var max = typeof(this.attr("max")) != "undefined" ? (this.attr("max") != null ? new Number(this.attr("max")) : Number.POSITIVE_INFINITY) : Number.POSITIVE_INFINITY;
							var step = this.attr("step") || 1;
							var value = this.attr("value") || '';
							
							this.css("box-sizing", "border-box");
							
							var height = this.height() || 48;
							var width = this.width() || 96;
							var borderWidth = this.css('border-width') || this.css('border-left-width') || '1px';
							var borderStyle = this.css('border-style')
									|| this.css('border-left-style') || 'solid';
							var borderColor = this.css('border-color')
									|| this.css('border-left-color') || 'black';
							var borderCss = borderWidth + ' ' + borderStyle
									+ ' ' + borderColor;
							
							function css2Number(cssStr){
								var reg = /\d+/;
								var num = cssStr.match(reg)[0];
								return new Number(num);
							}
							var btnsWidth = height;
							var btnHeight = height;
							if(typeof (Zepto) != "undefined"){
								btnHeight = btnHeight - css2Number(borderWidth) * 2 - 1;
							}
							var inputWidth = width - btnsWidth * 2 - css2Number(borderWidth) * 4 - 1;

							this.append('<a class="numberInput-minus-btn" style="text-decoration:none;display:inline-block;text-align:center;width:'
											+ btnsWidth
											+ 'px;height:'
											+ btnHeight
											+ 'px;border-right:'
											+ borderCss
											+ ';float:left;color:#63D2BC">-</a>');
							this.append('<input class="numberInput-input" value="'
											+ value
											+ '" onclick="select()" style="width:'
											+ inputWidth
											+ 'px;height:'
											+ btnHeight + 'px;text-align:center;border:none;display:inline-block;color:inherit;float:left;" type="number" />');
							this.append('<a class="numberInput-add-btn" style="text-decoration:none;display:inline-block;text-align:center;width:'
											+ btnsWidth
											+ 'px;height:'
											+ btnHeight
											+ 'px;border-left:'
											+ borderCss
											+ ';float:left;color:#63D2BC">+</a>');
							this.delegate(".numberInput-minus-btn", "click", function(){
								var inputNode = $(this).siblings(".numberInput-input");
								var newValue = inputNode.val();
								if(newValue == ''){
									if(min <= 0 && max >= 0){
										newValue = 0;
									}else{
										newValue = min;
									}
								}
								newValue = new Number(newValue) - new Number(step);
								if(newValue <= min){
									newValue = min;
									$(this).css("color", "lightgray");
								}else if(newValue < max){
									$(this).siblings(".numberInput-add-btn").css("color", "#63D2BC");
								}
								inputNode.val(newValue);
								inputNode.trigger("input");
								$(this).trigger("input");
							});
							this.delegate(".numberInput-add-btn", "click", function(){
								var inputNode = $(this).siblings(".numberInput-input");
								var newValue = inputNode.val();
								if(newValue == ''){
									if(min <= 0 && max >= 0){
										newValue = 0;
									}else{
										newValue = min;
									}
								}
								newValue = new Number(newValue) + new Number(step);
								if(newValue >= max){
									newValue = max;
									$(this).css("color", "lightgray");
								}else if(newValue > min){
									$(this).siblings(".numberInput-minus-btn").css("color", "#63D2BC");
								}
								inputNode.val(newValue);
								inputNode.trigger("input");
								$(this).trigger("input");
							});
							
							return this;
						},
						'numberInputVal': function(val){
							var inputNode = this.children(".numberInput-input");
							if(inputNode.length != 0 && inputNode.val){
								if(typeof(val) == 'undefined'){
									return inputNode.val.call(inputNode);
								}else{
									return inputNode.val.call(inputNode, val);
								}
							}
							return null;
						},
						'numberInputValidate': function(){
							var inputNode = this.children(".numberInput-input");
							if(inputNode.length != 0 && inputNode.val){
								var min = typeof(this.attr("min")) != "undefined" ? (this.attr("min") != null ? new Number(this.attr("min")) : Number.NEGATIVE_INFINITY) : Number.NEGATIVE_INFINITY;
								var max = typeof(this.attr("max")) != "undefined" ? (this.attr("max") != null ? new Number(this.attr("max")) : Number.POSITIVE_INFINITY) : Number.POSITIVE_INFINITY;
								if(/^[-]{0,1}\d+[\.]{0,1}[\d]*$/.test(inputNode.val())){
									var value = new Number(inputNode.val());
									return value >= min && value <= max;
								}
							}
							return false;
						}
					});
})(typeof (jQuery) != "undefined" ? jQuery : Zepto);