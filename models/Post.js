const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//This will include the connection to MySQL we stored in the connection.js file as well as Model and Datatypes we'll use from the sequelize package.

// create our Post model
class Post extends Model {}

// create fields/columns for Post model in the post.init function in this first parameter
Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      post_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: true
        }
      },
      //Use the ref property to establish a relationship btw post and the user by creating a ref to the user model, specifically to the ID column that is defined by the key property, which is the priamry key...user id defined as foreign key and will be matching link
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    //in second parameter of init method, configure the metadata including the naming conventions
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );

  //export expression to make the post model accessible to other parts of the application
  module.exports = Post;