var fs = require('fs');
var promise = require('bluebird');

var readFileAsync = promise.promisify(fs.readFile);

// đọc file xong then thì parse JSON xong then in ra console. Còn lại thì sẽ bắt lỗi ở cuối.
// Lỗi chi tiết bắt trước, lỗi chung chung để sau cùng
// tất cả các tác vụ được thực hiện tuần tự nhưng non-blocking

readFileAsync('good.json').then(JSON.parse).then(function(json) {
  console.log(json);
}).catch(SyntaxError, function(e) {
  console.error('invalid json in file', e.message);
}).catch(function(e){
  console.error('unable to read file', e.message);
});
