const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


process.env.SECKEY = 'secret';

router.post('/register',(req,res)=>{
    const today = new Date();

    const UserData = {
        username : req.body.username,
        email : req.body.email,
        password: req.body.password,
        createdAt:today
    };

    User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          UserData.password = hash;
          User.create(UserData)
            .then(user => {
              res.status(200).json({ status: user.email + ' registered' });
            })
            .catch(err => {
              res.status(500).json({ error: 'Failed to register user' });
            });
        });
      } else {
        res.status(400).json({ error: 'User already registered' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const payload = {
              _id: user._id,
              username: user.username,
              email: user.email
            };
            let token = jwt.sign(payload, process.env.SECKEY, { expiresIn: 1440 });
            res.send(token);
          } else {
            res.status(401).json({ error: 'Invalid password' });
          }
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'Server error' });
      });
  });

  router.get('/profile', (req, res) => {
    try {
      const token = req.headers.authorization; // Get the token from the request headers
  
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }
  
      const decoded = jwt.verify(token, process.env.SECKEY);
  
      User.findOne({ _id: decoded._id })
        .then(user => {
          if (user) {
            res.json(user);
          } else {
            res.status(404).json({ error: 'User does not exist' });
          }
        })
        .catch(err => {
          res.status(500).json({ error: 'Error: ' + err.message });
        });
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  });

  //only logingin user can delete his account
  router.delete('/user/delete',(req,res)=>{
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({error:"You must be logged in"})
        }
        const verified = jwt.verify(token,process.env.SECKEY);
        //delete user details from database with use token id
        User.findByIdAndRemove(verified._id)
            .then(() =>{
                 res.status(200).json({message:"User deleted successfully"})

            })
            .catch(err =>{
                res.status(500).json({error:"Failed to delete user"})
            })
    } catch (error) {
        res.status(401).json({error:"Invalid token"})
    }

  })

    //only logingin user can update his account
    router.put('/user/update',(req,res)=>{
        try {
           const Data = {
                username : req.body.username,
                email : req.body.email,
                password: req.body.password,
            };
            const token =req.headers.authorization;
            if(!token){
                return res.status(401).json({error:"You must be logged in"})
            }
            const verified = jwt.verify(token,process.env.SECKEY);
            //update user details from database with use token id
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                Data.password = hash;
                User.findByIdAndUpdate(verified._id,Data)
                    .then(()=>{     
                        res.status(200).json({message:"User updated successfully"})
                    })
                    .catch(err =>{
                        res.status(500).json({error:"Failed to update user"})
                    })
            })
        }    catch (error) {
            res.status(401).json({error:"Invalid token"})

        }

       })
  


module.exports = router;