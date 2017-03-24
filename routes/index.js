var express = require('express');
var router = express.Router();

var http = require('http');
var imageData;
var videoData;
// read video description data from provided url
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

// read image data from provided url
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


// hard-coded number of images per page,
// can improve this by allowing users to specify this number in the UI
var imagePerPage = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      video_body: videoData.body,
      video_title: videoData.title
  });
});

/* image tab. return 10 images required to front end*/
router.post('/imageService', function (req, res) {
    var pageNumber = req.body.pageNumber;
    var images = [];
    for (var i = 0 ; i < imagePerPage ; i++ ) {
        var imageIndexInData = (pageNumber-1) * imagePerPage + i;
        images.push(imageData[imageIndexInData]);
    }
    res.send(images);
});

/* pagination. return max page number*/
router.post('/pageService', function (req, res) {
    var imageNumber = imageData.length;
    var maxPage = imageNumber / imagePerPage;
    res.send({
        maxPage: maxPage
    });
});

module.exports = router;
