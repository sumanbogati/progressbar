/**
 * @Author  Suman Bogati (sumanbogati@gmail.com)
 */
var progressBar = {
	/** These are default values for progressbar **/
	start : 0,
	end : 100,
	speed : 50,
	style : { width : 300, height : 30, bgColor : "#616060", radius : 10, pbarColor : "#bb1414"}, 
	callback : null,
	elem : null,
	
	
	/** this function is setting up the customize values **/
	init : function (elem, speed, start, end, style, callback) {
		if(elem == null){
			alert("Progress Bar Cotainer is missing, \nProvide the Progressbar Container.");
		} else {
			
			this.elem = elem || this.elem;
			this.speed = speed || this.speed;
			this.start = start || this.start;
			this.end = end || this.end;
			this.style = style || this.style;
			this.callback = callback || this.callback;
			
			var elem = document.querySelector(this.elem);
			if(elem != null){
				this.stylePbarParent(elem);
				this.createProgressbar(elem);
				this.calcStep();
				this.render();
			}else{
				alert('There is no an element for Progressbar.');
			}
		}
	},
	
	
	/**
		Set the styles for parent element of progressbar
	**/
	stylePbarParent : function (elem){
		elem.style.width = this.style.width + "px"; 
		elem.style.backgroundColor = this.style.bgColor; 
		elem.style.height = this.style.height + "px";
		elem.style.borderRadius = this.style.radius + "px"; 
	},
	
	/** 
		this function creates main progressbar element 
	*/
	createProgressbar : function (parentElem){
		this.pbarElemId = 'progressbar';		
		var elem = document.createElement('div');
		elem.id = this.pbarElemId;
		elem.style.backgroundColor  = this.style.pbarColor;
		elem.style.height  = parentElem.style.height;
		elem.style.borderRadius = (this.style.radius-2) + "px"; 
		parentElem.appendChild(elem);
	},
	
	/**remove the numbers after two decimal **/
	remmoveDecimal : function (number){
		return (Math.floor(number * 100) / 100);
	},
	
	/**
	 This calculates the step like, if progressbar width is
	 500, the each step would be 5
	**/
	calcStep : function (){
		var width = (this.style.width / 100);
		this.step  = this.remmoveDecimal(width); // retain only two decimal points
		this.currWidth = this.start == 0  ? this.step :  this.remmoveDecimal((this.step * this.start));
	},
	
	/**
		This function renders the actual progressbar by increasing
		it's width, the progressbar will be ended after reached in maximum level 
	**/
	render : function (){
		var elem = document.querySelector('#' + this.pbarElemId);
		elem.style.width = this.currWidth + "px";
		
		if(this.start >= this.end){
			if(this.callback != null){
				// if callback bassed, it will be invoke on progressbar finished
				this.callback(); 
			}
		}else {
			var fps = 1000 / this.speed;
			var that = this;
			this.renderPbr = setTimeout(
				function (){
				   // Increase performance by
				   // Only perform animation, when browser is able to perform,
				   // It does not execute when browser tab is inactive
				   requestAnimationFrame(function (){that.render();})
				   that.start++;
				   that.currWidth += that.step;
				}, 1000/fps
			);
		} 
	}
};