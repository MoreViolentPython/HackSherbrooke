mongo meteor --eval "db.dropDatabase()" --port 3001

mongoimport --db meteor --collection eventsSherbrooke --type json --file eventsSherbrooke.json --jsonArray --port 3001
mongoimport --db meteor --collection eventsQuebec --type json --file eventsQuebec.json --jsonArray --port 3001