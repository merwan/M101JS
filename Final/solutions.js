use enron;

// Question 1
db.messages.find({"headers.From": "andrew.fastow@enron.com", "headers.To": "jeff.skilling@enron.com"}).count()

// Question 2
db.messages.aggregate(
  [
    {$unwind: "$headers.To"},
    {$project: {"headers.To": 1, "headers.From": 1}},
    // Remove duplicates
    {$group:
      {_id: {id: "$_id", from: "$headers.From", to: "$headers.To"}, nb: {$sum: 1}}
    },
    {$group:
      {_id: {from: "$_id.from", to: "$_id.to"}, count: {$sum: 1}}
    },
    {$sort: {count: -1}},
    {$limit: 1}
  ],
  { "allowDiskUse": true }
)

// Question 3
db.messages.update(
    {"headers.Message-ID": "<8147308.1075851042335.JavaMail.evans@thyme>"},
    {$addToSet: {"headers.To": "mrpotatohead@mongodb.com"}}
    )
