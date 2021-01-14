//packages and models needed to create the express.js api endpoints
const router = require('express').Router();
const { Post, User } = require('../../models');

// route to get all users
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
       //columns that we'll retrieve in this query and then account and configuring the findall method by customizing attributes
      attributes: ['id', 'post_url', 'title', 'created_at'],
      // order property to get posts in certain order - nested array that orders by created_at column in descending order (latest article first)
      order: [['created_at', 'DESC']], 
      //add the include property to join the user table
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    //after query add promise that captures the response from the database call
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'post_url', 'title', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.body.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //use request parameter to find post, then used the req.body.title value to replace the title of the post. in the response sent back data that has been modified and stored in the database.
  router.put('/:id', (req, res) => {
    Post.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //destroy method using unique id and query parameter to find then delete the instance of the post
  router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // to test need to expose the changes to the router by using the express.js command below
  module.exports = router;
  

 