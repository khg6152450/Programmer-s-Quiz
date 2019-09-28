var utils = require('../utils/utils');

var SchemaAnswer = {};

SchemaAnswer.createSchema = function(mongoose) {
	
	// 글 스키마 정의
	var AnswerSchema = mongoose.Schema({
	    id: String,
        answer: String
	});
	
	console.log('AnswerSchema 정의함.');

	return AnswerSchema;
};

// module.exports에 PostSchema 객체 직접 할당
module.exports = SchemaAnswer;