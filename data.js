var fs = require('fs');
var es = require('event-stream')
var file = 'data/twitter.csv';

var index = 0;
var keys; 

fs.createReadStream(file, {flags: 'r'})
  .pipe(es.split())
  .pipe(es.map(function (line, callback) {

    if (index == 0) {
      keys = line.split(',');
      callback();
    }
    else {
      var tweet = {};
      line = line.split(',');

      for (i=0; i<line.length; i++) {
        var key = keys[i];
        tweet[key] = line[i];
      }

      callback(null, tweet);
    }
    index++;
  }))
  .pipe(es.writeArray(function (err, array){
    console.log(array);
  }))
  // .pipe(fs.createWriteStream('output.json'));
