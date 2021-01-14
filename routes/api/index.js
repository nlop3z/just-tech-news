// This file, like index in models folder will serve as a means to collect all of the API routes and package them up for us
const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;

//assign route to express.js router so they are exposed properly with the correct URL path