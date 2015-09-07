use test

db.zips.aggregate([
    {$match: {'state': {$in: ['CA', 'NY']}, 'pop': {$gt: 25000}}},
    {$group: {_id: '$state', average: {$avg: '$pop'}}}
    ]);
