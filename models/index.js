const User = require('./User');
const Post = require('./Post');

// create associations between models - a user can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
  });

  //relationship btw post model and user - constraint is post can belong to one user, but not many users
  Post.belongsTo(User, {
    foreignKey: 'user_id',
  });

module.exports = { User, Post };

//use this file to add the models (require) and export them here