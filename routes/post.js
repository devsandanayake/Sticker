const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const jwt = require('jsonwebtoken');

process.env.SECKEY = 'secret';

router.post('/post', (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'You must be logged in' });
    }
    const verified = jwt.verify(token, process.env.SECKEY);

    const newPost = new Post({
      userID: verified._id,
      des: req.body.des
    });

    newPost.save()
      .then(post => {
        res.status(200).json({ message: 'Post created successfully', post });
      })
      .catch(err => {
        res.status(500).json({ error: 'Failed to create post' });
      });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});


router.get('/view',(req,res)=>{
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({error:'You must be logged in'})
        }
        const verified = jwt.verify(token,process.env.SECKEY);

        Post.find({userID:verified._id})
          .then(posts =>{
            res.status(200).json(posts)
          })
          .catch(err => {
            res.status(500).json({ error: 'Failed to retrieve posts' });
          });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
})


module.exports = router;
