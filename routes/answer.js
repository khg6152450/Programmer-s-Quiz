var authAnswer = function (db, id, answer, callback) {
    console.log('authanswer 호출됨.');

    db.AnswerModel.find({
        "id": id,
        "answer": answer
    }, function (err, results) {
        if (err) {
            callback(err, null);
            return;
        }

        console.log('문제 [%s]과 정답 [%s]가 일치하는 결과', id, answer);
        console.dir(results);

        if (results.length > 0) {
            console.log('일치하는 문제 찾음.');
            callback(null, results);
        } else {
            console.log("일치하는 문제를 찾지 못함.");
            callback(null, null);
        }
    });
};

var check = function (req, res) {
    console.log('/process/check 호출됨.');

    var paramId = req.body.id || req.query.id;
    var paramAnswer = req.body.answer || req.query.answer;

    var database = req.app.get('database');

    console.log("요청 파라미터 : " + paramId + ", " + paramAnswer);

    if (database) {
        authAnswer(database, paramId, paramAnswer, function (err, docs) {
            if (err) {
                throw err;
            }

            if (docs) {
                console.dir(docs);
                var useranswer = docs[0].answer;


                req.user.solve++;

                return res.redirect('/public/check_ok.html');


            } else {

                return res.redirect('/public/check_no.html');
            }
        });
    } else {
        res.writeHead('200', {
            'Content-Type': 'text/html; charset=utf8'
        });
        res.write("<h2>데이터베이스 연결 실패</h2>");
        res.end();
    }
};


module.exports.check = check;
