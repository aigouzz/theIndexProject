// JavaScript Document
function id(obj) {
    return document.getElementById(obj);
}

function getClass(op,obj){
    return op.getElementsByClassName(obj);
}

function getTag(op,obj){
    return op.getElementsByTagName(obj);
}

function bind(obj, ev, fn) {
	fn = fn || function(){};
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}

function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}

function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}

function windowView(){
    return {
        w:document.body.offsetWidth,
        h:document.body.offsetHeight
    }
}

function addClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

function loadImg(arr){
	var oImg = new Image();
	var i = 0;
	oImg.src = arr[i];
	recurse(oImg,i,arr);

}
function recurse(oImg,i,arr){
	oImg.onload = function () {
		i++;
		if(i = arr.length){
			return false;
		}
		oImg.src = arr[i];
		recurse(oImg,i,arr);
	};
}
function startMove(obj, json, fn) {
    clearInterval(obj.iTimer);
    var iCur = 0;
    var iSpeed = 0;

    obj.iTimer = setInterval(function() {

        var iBtn = true;

        for ( var attr in json ) {

            var iTarget = json[attr];

            if (attr == 'opacity') {
                iCur = Math.round(getStyle( obj, 'opacity' ) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }

            iSpeed = ( iTarget - iCur ) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if (iCur != iTarget) {
                iBtn = false;
                if (attr == 'opacity') {
                    obj.style.opacity = (iCur + iSpeed) / 100;
                    obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
                } else {
                    obj.style[attr] = iCur + iSpeed + 'px';
                }
            }

        }

        if (iBtn) {
            clearInterval(obj.iTimer);
            fn && fn.call(obj);
        }

    }, 30);
}

function next(iNow,aLi,imgL,aLi1){
    startMove(imgL,{left:-iNow*aLi[0].offsetWidth});
    if(!arguments[3]){
        return false;
    }
    for(var i=0;i<aLi1.length;i++){
        aLi1[i].className = '';
    }
    aLi1[iNow].className = 'active';
}
