There are two (kinda three) parts to this application: the database, the api
service, and the app.

Quick Start:
- You can quickly start the application by running the included batch files,
  otherwise you can use the detailed instructions explained later in this file.

  Follow These Stapes to Start:
  - Run 'start_db.bat'.
  - Run 'start_api.bat'.
  - Run 'start_app.bat'.
  - You can test the api at 'localhost:3000'.
  - You can use the app at 'localhost:8000'.

Starting the Database:
- The path to the db is defined in app.js of the api. By default it is set to
  connect to a locally run mongodb at 'localhost:27017/StoreFront'.
- The database files are located in the 'data' directory of the api files.
- To start the database server locally, do the following:
    - Navigate to the directory where the mongodb files were installed in cmd:
      'cd C:\Program Files\MongoDB\Server\3.4\bin'.
    - Execute the following command to start the db and point it to the
      StoreFront database files:
      'mongod --dbpath D:\Projects\Programming\StoreFront\StoreFrontAPI\data'.

Starting the API:
- Navigate to the root of the api files at 'StoreFrontApi' in cmd.
- Execute the 'npm start' command.
- You can access the api in browser at 'localhost:3000'.

Starting the App:
- Navigate to the root of the app files at 'StoreFrontApp' in cmd.
- Execute the 'npm start' command.
- You can access the app in browser at 'localhost:8000'.
