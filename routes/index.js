var express = require('express');
var router = express.Router();

var http = require('http');
var imageData;
var options = {
    host: 'jsonplaceholder.typicode.com',
    path: '/photos'
};
var callback = function(response) {
    var str = '';
    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
    });
    response.on('end', function () {
        imageData = JSON.parse(str);
    });
}

http.request(options, callback).end();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { video_title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      video_body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
  });
});

/* POST home page. */
router.post('/imageService', function (req, res) {
    var pageNumber = req.body.pageNumber;
    // var imagePerPage = 2;
    // var images = [];
    var image = imageData[pageNumber - 1];
    res.send(image);
    // for (var i = pageNumber -1; i < 1; i++ ) {};
});

module.exports = router;
