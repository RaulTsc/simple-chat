Simple chat using React, Node & Socket.io.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Get started

* `npm install`
* `npm run flow` -- Runs flow
* `npm start` -- Start in development mode -- The app is then served to `http://localhost:3000` but has no real BE, should be used only for UI development. It has hot reload.
* `npm run build` -- Build for production
* `npm test` -- Run tests (Runs tests only if there are changes to files since last commit. Press `a` to run all tests.)
* `npm test -- --coverage` -- Run coverage for tests
* `docker-compose up` -- Boots up the app and a mongo container. The app is then served to `http://localhost:9000`. The server serves the built app found in `build/` so you might need to build it first using `npm run build`.
