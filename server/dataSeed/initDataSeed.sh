mongo meteor --eval "db.dropDatabase()" --port 3001

mongoimport --db meteor --collection events --type json --file events.json --jsonArray --port 3001
mongoimport --db meteor --collection restaurants --type json --file restaurants.json --jsonArray --port 3001