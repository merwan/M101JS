use test

db.zips.aggregate([
    {$project:
      {
        first_char: {$substr : ["$city",0,1]},
        pop: 1
      }
    },
    {$match: {'first_char': {$in: [/[0-9]/]}}},
    {$group: {_id: null, sum: {$sum: '$pop'}}},
])
