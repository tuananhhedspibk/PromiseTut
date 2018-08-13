var fs = require('fs');
var request = require('request');
var promise = require('bluebird');
var photoLink = {link: 'https://unsplash.imgix.net/photo-1425235024244-b0e56d3cf907?fit=crop&fm=jpg&h=700&q=75&w=1050',
  name: 'dog.jpg'};

// getPhoto trả về Promise nhận vào 2 tham số fulfill, reject
// nếu thành công thì gọi hàm fulfill và ngược lại gọi hàm reject để xử lý lỗi
// Tham số truyền vào fulfill là giá trị cần trả về để xử lý trong lệnh tiếp theo.
// Tham số truyền vào reject là đối tượng lỗi, Error.

function getPhoto(photoLink) {
  return new Promise(function(fulfill, reject){
    request.get(photoLink.link)
      .on('error', function(err) {
        err.photo = photoLink.link;
        reject(err);
      })
      .pipe(fs.createWriteStream(photoLink.name)
        .on('finish', function() {
          fulfill(photoLink.name);
        })
        .on('error', function (err) {
          reject(err);
        })
      )
  })
}

// style thenable
getPhoto(photoLink)
  .then(function(result) {
    console.log('Done write to file', result);
  })
  .catch(function(err) {
    console.log('Error: ', err.message)
  })