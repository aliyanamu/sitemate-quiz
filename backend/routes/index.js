const express = require('express');
const issueRoute = require('./issue');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/issue',
    route: issueRoute,
  },
];

// routes available only in development mode
const devRoutes = [];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;