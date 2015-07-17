/**
 * Created by tuyoo on 15/6/23.
 */
(function (a) {
    var aLi = getTag(id('gbanner'),'li');
    var w = aLi[0].offsetWidth;
    id('gbanner').style.width = aLi.length*w + 'px';

    var aLi1 = getClass(id('gcContent'),'gccSec');
    var h1 = aLi1[0].offsetHeight;
    id('gameContent').style.height = h1 + 'px';

    var headLi = getTag(id('ghrNav'),'li');
    for(var i=0;i<headLi.length;i++){
        headLi[i].index = i;
        bind(headLi[i],'click', function () {
            for(var i=0;i<headLi.length;i++){
                headLi[i].className = '';
            }
            headLi[this.index].className = 'ghrActive';
            startMove(id('gcContent'),{marginTop:-getTop(aLi1,this.index)});
            id('gameContent').style.height = aLi1[this.index].offsetHeight + 'px';
        });
    }

    var agWeixin = getClass(id('gcContent'),'gWeixin');
    for(var i=0;i<agWeixin.length;i++){
        bind(agWeixin[i],'mouseover', function () {
            startMove(this,{opacity:100});
        });
        bind(agWeixin[i],'mouseout', function () {
            startMove(this,{opacity:0});
        });
    }

    var gLeft = id('gleft');
    var gRight = id('gright');
    var iNow = 0;
    bind(gLeft,'click', function () {
        iNow--;
        if(iNow < 0){
            iNow = aLi.length-1;
        }
        next(iNow,aLi,id('gbanner'));
    });
    bind(gRight,'click', function () {
        iNow++;
        if(iNow > aLi.length-1){
            iNow = 0;
        }
        next(iNow,aLi,id('gbanner'));
    });

    function getTop(aLi,i){
        var top = 0;
        for(var j=0;j<i;j++){
            top += aLi[j].offsetHeight;
        }
        return top;
    }
})(window);

