Simple chat using React, Node & Socket.io.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Get started

* Clone repo; cd into it & run `npm install`

* Build app for production: `npm run build`
* Boot up two docker containers(the app and a mongo instance): `docker-compose up`. Might need to run `npm run build` to build the app prior to this.
* Run test coverage: `npm test -- --coverage`
* Run tests(by default runs only if there are changes so we have that sweet automatic reload; if you get a warning stating that there were no changes press `a` to run anyway): `npm test`
* Run flow: `npm run flow`
* Start app in UI development mode (no functionality is working since it has no real BE): `npm start`

