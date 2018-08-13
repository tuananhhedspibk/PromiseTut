const Promise = require('bluebird');

var addProductReview = function () {
  var review = {
    productId: 27,
    star: 9,
    comment: 'Good'
  }
  return new Promise(function (fulfill, reject) {
    setTimeout(function () {
      console.log('Bo sung review cua khach hang ve san pham vao database');
      fulfill(review);
    }, 1000);
  });
}

var recalculateProductReview = function (productId) {
  return new Promise(function (fulfill, reject) {
    setTimeout(function () {
      console.log('Danh gia trung binh cua san pham la 9.5');
      fulfill({
        productId: productId,
        average: 9.5
      });
    }, 1500);
  });
}

var updateProductData = function (data) {
  return new Promise(function (fulfill, reject) {
    setTimeout(function () {
      console.log('Cap nhat lai danh gia trung binh cua khach hang ve san pham trong database');
    }, 1500);
  });
}

// addProductReview()
//   .then(review => {
//     return recalculateProductReview(review.productId)
//       .then(function(result) {
//         return updateProductData(result);
//       })
//       .then(function() {
//         return review
//       })
//   })
//   .then(result => {
//     console.log(result);
//   })

Promise.coroutine(function *() {
  let review = yield addProductReview();
  let result = yield recalculateProductReview(review.productId);
  updateProductData(result);
  console.log(review); 
})();