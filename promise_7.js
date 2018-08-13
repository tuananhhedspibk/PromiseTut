const Promise = require('bluebird');

var downloadImage = function (index, delay) {
  return new Promise(function (fulfill, reject) {
    var wait = function () {
      if (delay--) {
        console.log("Image " + index + " has " + delay + " seconds left");
        setTimeout(wait, 1000);
      } else {
        fulfill(index);
      }
    }
    wait();
  });
}

Promise.all([
  downloadImage(1, 7),
  downloadImage(2, 5),
  downloadImage(3, 10)
]).then(result => {
  console.log(result);
}).catch(() => {
  console.error('Error !!!');
});
