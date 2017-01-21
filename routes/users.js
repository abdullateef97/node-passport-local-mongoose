const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user')
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/register',function (req,res) {
    res.render('register')
})
router.post('/register',function(req,res,next) {
    console.log(req.body);
    User.register(new User({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email
        }), req.body.password,
        function (err, user) {
            if (err) {
                console.log('error signing up ');
                console.log('-----------------------');
                console.log(err.message)
                return res.render('register', {error: err.message})
            }
            passport.authenticate('local')( req, res,function () {
                req.session.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/users/login')
            }

                )
            })
        })
})

router.get('/login',function(req,res,next){
    res.render('login');
})

router.post('/login',passport.authenticate('local',({
    successRedirect : '/users/members',
    failureRedirect : '/users/login',
    failureFlash : true

})),
        function (req,res,next) {
    req.session.save(function (err) {
        if(err) {
            return next('err');
        }
        res.redirect('/users/members')

    })


        });
var isLoggedIn = function (req,res,next) {
    if(req.isAuthenticated()) {
        return next;
    }
    res.redirect('/users/login')
}

router.get('/members',isLoggedIn,function (req,res,next) {
    req.session.save(function () {
        res.redirect('/users/members')
    })
    /*res.render('members')*/
});
router.get('/logout',function (req,res,next) {
    req.logout();
    req.session.save(function (err) {
        if(err){
            return next(err)
        }
        res.redirect('/')
    })
})

module.exports = router;
