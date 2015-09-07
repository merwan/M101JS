use test

db.grades.aggregate([
    {$unwind: '$scores'},
    {$match: {'scores.type': {$in: ['exam', 'homework']}}},
    {$group: {_id: {student_id: '$student_id', class_id: '$class_id'}, 'average': {$avg: '$scores.score'}}},
    {$group: {_id: '$_id.class_id', 'average': {$avg: '$average'}}},
    {$sort: {'average': -1}},
    {$limit: 1}
    ]);