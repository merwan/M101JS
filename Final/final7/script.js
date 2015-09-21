use q7;

db.albums.createIndex({images: 1});
db.images.createIndex({tags: 1});

db.albums.count();
db.images.count();

var images = db.images.find({}).toArray();
print('Removing orphan images');
for (var i = 0; i < images.length; i++) { var count = db.albums.count({'images': images[i]._id}); if (count == 0) { db.images.remove(images[i]); } }
print('Finished');
