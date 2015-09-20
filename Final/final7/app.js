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
    console.log(count);
    collection.findOne({'images': image._id}, function(err, doc) {
      if (doc) {
        console.log('Orphan image: ' + doc._id);
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
