var express = require('express');
var router = express.Router();

var http = require('http');
var imageData;
var videoData;

http.request({
    host: 'jsonplaceholder.typicode.com',
    path: '/posts/1'
}, function(response) {
    var str = '';
    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
    });
    response.on('end', function () {
        videoData = JSON.parse(str);
    });
}).end();

http.request({
        host: 'jsonplaceholder.typicode.com',
        path: '/photos'
    }, function(response) {
        var str = '';
        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            imageData = JSON.parse(str);
        });
    }).end();



var imagePerPage = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      video_body: videoData.body,
      video_title: videoData.title
  });
});

/* POST home page. */
router.post('/imageService', function (req, res) {
    var pageNumber = req.body.pageNumber;
    var images = [];
    for (var i = 0 ; i < imagePerPage ; i++ ) {
        var imageIndexInData = (pageNumber-1) * imagePerPage + i;
        images.push(imageData[imageIndexInData]);
    }
    res.send(images);
});

/* POST home page. */
router.post('/pageService', function (req, res) {
    var imageNumber = imageData.length;
    var maxPage = imageNumber / imagePerPage;
    res.send({
        maxPage: maxPage
    });
});

module.exports = router;
