/**
 * Created by tuyoo on 15/6/24.
 */
(function (a) {
    var aLi = getTag(id('raceTurn'),'li');
    var w = aLi[0].offsetWidth;
    id('raceTurn').style.width = aLi.length*w + 'px';

    var raceLeft = id('raceLeft');
    var raceRight = id('raceRight');
    var iNow = 0;
    bind(raceLeft,'click', function () {
        iNow--;
        if(iNow < 0){
            iNow = aLi.length -1;
        }
        startMove(id('raceTurn'),{left:-iNow*aLi[0].offsetWidth});
    });
    bind(raceRight,'click', function () {
        iNow++;
        if(iNow > aLi.length-1){
            iNow = 0;
        }
        startMove(id('raceTurn'),{left:-iNow*aLi[0].offsetWidth});
    });
})(window);