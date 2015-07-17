/**
 * Created by tuyoo on 15/6/25.
 */
(function (a) {

    var h = document.documentElement.clientHeight;
    id('employ').style.height = h - 242 + 'px';

    var tagA = getTag(id('nav'),'a');
    var aLi = getTag(id('ealLeft'),'li');
    var eaRight = getClass(document,'eaRight');

    tagA[tagA.length - 2].className = 'b-active';
    startShow(0);


    for(var i=0;i<aLi.length;i++){
        aLi[i].index = i;
        bind(aLi[i],'mouseover',function(){
            if(this.className === 'eallActive' ){
                this.active = true;
            }
            this.className = 'eallActive';
        });
        bind(aLi[i],'mouseout',function(){
            if(this.active){
                return false;
            }
            this.className = '';
        });
        bind(aLi[i],'click', function () {
            startShow(this.index);
            if(this.index < 2){
                tagA[tagA.length-2].className = 'b-active';
                tagA[tagA.length-1].className = '';
            }else{
                tagA[tagA.length-1].className = 'b-active';
                tagA[tagA.length-2].className = '';
            }
        });
    }

    for(var i = 0;i<eaRight.length;i++){
        scrollMove(i);
    }

    function scrollMove(i){
        var earContent = getClass(eaRight[i],'earContent')[0];
        var earScroll = getClass(eaRight[i],'earScroll')[0];
        var scroll = getClass(eaRight[i],'scroll')[0];
        var iX = eaRight[i].offsetHeight/earContent.offsetHeight;
        var h = earContent.offsetHeight - eaRight[i].offsetHeight;
        if(h <= 0 ){
            scroll.style.display = 'none';
        }else{
            scroll.style.height = earScroll.offsetHeight*iX + 'px';
            bind(scroll,'mousedown',function (ev) {
                var ev = ev || event;
                var disY = ev.clientY;
                var top = scroll.offsetTop;
                document.onmousemove = function (ev) {
                    var ev = ev || event;
                    var dY = ev.clientY - disY;
                    var a = top + dY;
                    if(a > earScroll.offsetHeight - scroll.offsetHeight){
                        a = earScroll.offsetHeight - scroll.offsetHeight;
                    }else if(a < 0){
                        a = 0;
                    }
                    scroll.style.top = a + 'px';
                    earContent.style.top = -( a/( earScroll.offsetHeight - scroll.offsetHeight ))*h + 'px';
                    return false;
                };
                document.onmouseup = function (ev) {
                    document.onmousemove = document.onmouseup = null;
                };
                return false;
            });
            bind(eaRight[i],'DOMMouseScroll', function (ev) {
                var ev = ev || event;
                if(ev.wheelDelta){
                    b = ev.wheelDelta>0?true:false;
                }else{
                    b = ev.detail<0?true:false;
                }
                if(b){
                    scroll.style.top = scroll.offsetTop - 10 + 'px';
                    earContent.style.top = -( scroll.offsetTop/( earScroll.offsetHeight - scroll.offsetHeight ))*h + 'px';
                }else{
                    scroll.style.top = scroll.offsetTop + 10 + 'px';
                    earContent.style.top = -( scroll.offsetTop/( earScroll.offsetHeight - scroll.offsetHeight ))*h + 'px';
                }
                return false;
            });
            bind(eaRight[i],'mousewheel', function (ev) {
                var ev = ev || event;
                if(ev.wheelDelta){
                    b = ev.wheelDelta>0?true:false;
                }else{
                    b = ev.detail<0?true:false;
                }
                if(b){
                    scroll.style.top = scroll.offsetTop - 10 + 'px';
                    if(scroll.offsetTop < 0){
                        scroll.style.top = 0;
                    }
                    earContent.style.top = -( scroll.offsetTop/( earScroll.offsetHeight - scroll.offsetHeight ))*h + 'px';
                }else{
                    scroll.style.top = scroll.offsetTop + 10 + 'px';
                    if(scroll.offsetTop > earScroll.offsetHeight - scroll.offsetHeight){
                        scroll.style.top = earScroll.offsetHeight - scroll.offsetHeight + 'px';
                    }
                    earContent.style.top = -( scroll.offsetTop/( earScroll.offsetHeight - scroll.offsetHeight ))*h + 'px';
                }
                return false;
            });
        }
    }
    function startShow(i){
        for(var j=0;j<eaRight.length;j++){
            clearInterval(eaRight[j].iTimer);
            eaRight[j].style.opacity = 0;
            eaRight[j].style.filter = 'alpha(opacity=0)';
            eaRight[j].style.zIndex = 1;
            aLi[j].className = '';
            aLi[j].active = false;
        }
        aLi[i].className = 'eallActive';
        aLi[i].active = true;
        startMove(eaRight[i],{opacity:100});
        eaRight[i].style.zIndex = 5;
    }
})(window);