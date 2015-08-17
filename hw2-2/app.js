var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

	var data = db.collection('data');
	var query = {};
	var projection = {'State': 1, 'Temperature': 1};
	var options = {'sort': {'State': 1, 'Temperature': -1}};
    var cursor = data.find(query, projection, options);
	var previousState = undefined;
	cursor.each(function(err, doc) {
        if(err) throw err;

		if (doc == null) {
			return db.close();
		}

		if (previousState !== doc.State) {
			previousState = doc.State;
			query['_id'] = doc['_id'];
			doc['month_high'] = true;
			console.dir(doc);
			data.update(query, doc);
		}
    });
});
