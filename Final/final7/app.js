var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');


var findImages = function(db, callback) {
  var collection = db.collection('images');

  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    assert.equal(100000, docs.length);
    callback(db, docs);
  });
}

var findOrphanImages = function(db, images) {
  var collection = db.collection('albums');
  console.log('findOrphanImages');
  console.log(images.length);

  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    collection.count({'images': image._id}, function(err, count) {
      console.log(count);
      if (count == 0) {
        console.log('Orphan image: ' + image._id);
        //db.collection.remove({'_id': image._id}, function(err, result) {});
      }
    });
  }
}

var url = 'mongodb://localhost:27017/q7';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  findImages(
    db, findOrphanImages
  );
});
