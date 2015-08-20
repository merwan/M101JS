var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;

	var data = db.collection('students');
	var query = {};
    var cursor = data.find(query);
	cursor.each(function(err, doc) {
        if(err) throw err;

		if (doc == null) {
			return db.close();
		}

        scores = doc.scores;
        var min = 100000;
        var index_to_remove = -1;
        for (var i in scores) {
          var score = scores[i];
          if (score.type === 'homework' && score.score < min) {
              min = score.score;
              index_to_remove = i;
          }
        }

        if (index_to_remove != -1) {
          doc.scores.splice(index_to_remove, 1);
          console.log(doc);
          db.collection('students').update({'_id': doc._id}, doc);
        }
    });
});
