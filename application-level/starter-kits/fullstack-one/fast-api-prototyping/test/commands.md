* POST

> curl -H "Content-Type: application/json" --data @data.json http://localhost:8000/doc

* UPDATE

> curl -X PUT -H "Content-Type: application/json" --data @data.json http://localhost:8000/doc/{ID HERE}

* DELETE

> curl -X DELETE http://localhost:8000/doc/{ID HERE}