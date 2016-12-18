var express = require('express');
var router = express.Router();
var request = require('request');
var http = require('http');
require('dotenv').config();

var token = process.env.ACCESS_TOKEN

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  request('https://www.instagram.com/charizard22/?__a=1', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(response.body);
      var content_object = data.user.media.nodes;
      var images = []
      data.user.media.nodes.forEach((el) => {
        images.push(el.display_src)
      })
      res.json(images)
    }
  })
})

router.get('/verified', (req, res, next) => {
  request(`https://api.instagram.com/v1/users/24483594/media/recent/?access_token=${token}&count=40`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(response.body);
      var info = []
      var images = []
      data.data.forEach(function(el, i) {
        var id = el.id
        info.push(el.comments.count)
        images.push(el.images.standard_resolution.url)
        if(el.comments.count) {
          var comments = []
          getComments(id);
        }
      })
      res.json(images)
    }
  })
})

function getComments(id) {
  request(`https://api.instagram.com/v1/media/${id}/comments?access_token=${token}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(response.body);
      data.data.forEach(function(el, i) {
        console.log(el.text);
      })
    }
  })
}

module.exports = router;
