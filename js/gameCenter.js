/**
 * Created by tuyoo on 15/6/29.
 */
(function (a) {
    var oUl = id('gccContent');
    var aLi = getTag(oUl,'li');
    oUl.style.width = aLi.length*aLi[0].offsetWidth + 'px';

    var iNow = 0;
    var turnLeft = getClass(document,'gccLeft')[0];
    var turnRight = getClass(document,'gccRight')[0];
    bind(turnLeft,'click', function () {
        iNow--;
        if(iNow - 3 < 0){
            iNow = aLi.length - 1;
        }
        startMove(oUl,{marginLeft:-(iNow-3)*aLi[0].offsetWidth});
    });
    bind(turnRight,'click', function () {
        iNow++;
        if(iNow > aLi.length - 4){
            iNow = 0;
        }
        startMove(oUl,{marginLeft:-iNow*aLi[0].offsetWidth});
    });

})(window);