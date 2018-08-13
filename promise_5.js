var promise = require('bluebird');
var needle = require('needle');
var fs = require('fs');
var getAsync = promise.promisify(needle.get);
var writeFileAsync = promise.promisify(fs.writeFile);

var ipDecodePromise = getAsync('http://ip.jsontest.com/').then(response => {
  return response.body.ip;
}).then(ip => {
  return getAsync('http://www.geoplugin.net/json.gp?ip=' + ip);
});

// first then
ipDecodePromise.then(response => {
  console.log(response.body);
}).catch(err => {
  console.log('Error: ' + err.message);
});

// second then
ipDecodePromise.then(response => {
  return writeFileAsync('ipdecode.txt',
    response.body);
}).then(function() {
  console.log('Write to file ipdecode.txt successfully');
}).catch(err => {
  console.log('Error: ' + err.message);
});
