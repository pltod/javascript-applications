# Purpose

Skeleton for very fast API prototyping that works with Express and MongoDB.

# How I do the prototyping

1. Config DB parameters

> Set up the DB parameters in config.json. When I work with single collection I leave default parameters.

2. Start the DB

> I use (my MDB tool)[https://github.com/pltod/mdb] to start clean mongo database usually in my project root directory. I just do ```mdb start``` in the console and the tool creates dbdata folder where all the data is stored.

3. Write you code

> index.js and server.js are completely reusable

> api.js: write your server methods here

> db.js: write you db queries here

4. Install and run the app

> ```npm i``` then ```npm start```

5. Trace the app behaviour

> **debug** module is really useful in doing this

6. Test the app

I usually use three strategies

> **curl commands**, e.g. for POST requests: curl -H "Content-Type: application/json" --data @data.json [REPLACE WITH SERVER ENDPOINT]

> **tape** test suites for testing standalone modules

> **supertest** to test server endpoints