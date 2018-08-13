var Promise = require('bluebird');

// Để khởi tạo Promise ta dùng từ khoá new
// Truyền vào đó 1 function với 2 tham số
// fulfill và reject - đều là 2 function

var addSync = (a, b) => {
  if (isNaN(a) || isNaN(b)) {
    throw new Error('Invalid input number');
  }
  return a + b;
}

var addAsync = (a, b, callback) => {
  if (isNaN(a) || isNaN(b)) {
    return callback(new Error('Invalid input number'), null);
  }
  return callback(null, a + b);
}

var addPromise = function(a, b) {
  return new Promise((fulfill, reject) => {
    addAsync(1, 2, (err, result) => {
      if (err) {
        return reject(err);
      }
      return fulfill(result);
    })
    // addSync
    // try {
    //   fulfill(addSync(1, 2))
    // }
    // catch(err) {
    //   reject(err)
    // }
  });
}

addPromise(1, 2).then(result => {
  console.log(result);
}).catch(err => {
  console.error('Error: ' + err);
})
