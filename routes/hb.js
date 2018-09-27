var express = require('express');
var router = express.Router();
var alp = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'w', 'x', 'y', 'z'];
var ansAry = [];
var preAry;
var hit = 0;
var blow = 0;
var flg = 0;

router.get('/', (req, res, next) => {
    var data = {
        title: 'Hit & Blow'
    }

    //Create Answer Automatically
function createWord(ary) {
    var i = ary.length;
    while(i){
        var j = Math.floor(Math.random()*i--);
        var t = ary[i];
        ary[i] = ary[j];
        ary[j] = t;
    }

    for (var n = 0; n < 4; n++){
        ansAry += alp[n];
    }
    ansAry = ansAry.split('');

    return ary;
}
console.log(createWord(alp));
console.log(ansAry);
    //EndCreate

    res.render('hb', data);
});

//POST
router.post('/post', (req, res, next) => {
    var pre = req.body['prediction'];
    var data = {
        title: 'Hit & Blow'
    }

    preAry = pre.split('');
    console.log(preAry);

    for (var i = 0; i < preAry.length; i++) {
        for (var j = i + 1; j < preAry.length; j++) {
            if (preAry[i] == preAry[j]) {
                console.log('The Same Word Is Included!');
                flg = 1;
                break;
            }
        }
    }

    //check hit and blow
    if (flg == 0) {
        hit = 0;
        blow = 0;
        for (var i = 0; i < preAry.length; i++) {
            if (preAry[i] == ansAry[i]) {
                hit += 1;
            }
        }
        console.log(hit);
        for (var i = 0; i < preAry.length; i++) {
            for (var j = 0; j < preAry.length; j++) {
                if (preAry[i] == ansAry[j]) {
                    blow += 1;
                }
            }
        }
        console.log(blow - hit);
    } else {
        flg = 0;
    }
    if (hit == 4) {
        console.log('CLEAR!');
    }
    
    res.render('hb', data);
});

module.exports = router;