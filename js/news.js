/**
 * Created by tuyoo on 15/6/25.
 */
(function (a) {
    var aLi = getTag(id('gbanner'),'li');
    var w = aLi[0].offsetWidth;
    id('gbanner').style.width = aLi.length*w + 'px';

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



})(window);