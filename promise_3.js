var promise = require('bluebird');
var readFileAsync = promise.promisify(require('fs').readFile);

// Đầu tiên đọc 2 files bằng hai promise, nếu thành công (fullfill)
// ta sẽ xử lí trong spread(), còn nếu thất bại (reject) thì ta
// sẽ xử lí trong catch()
// Sau khi trả về 2 promises thì ta cần truyền 2 tham số vào
// spread() để xử lí kết quả fullfillment trả về từ 2 promises 

promise.resolve().then(function() {
  return [readFileAsync('test.txt', 'utf8'),
    readFileAsync('test2.txt', 'utf8')];
}).spread(function(file1text, file2text){
  if(file1text === file2text) {
    console.log('Files are equal');
  }
  else {
    console.log('Files are not equal');
  }
}).catch(err => {
  console.log(err.message);  
});
