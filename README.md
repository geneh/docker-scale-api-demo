# Docker Scale Web API Demo
Demo project to scale Node web API, capture statistics in Redis DB, and display data in an Ember app.

## Build

### web-api:
``` cd web-api; npm install ```

### client and server
``` cd client; npm install; bower install; ember build --environment=production; cp -r dist ../server/```

``` cd ../server; npm install ```
