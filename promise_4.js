var promise = require('bluebird');
var needle = require('needle');
var getAsync = promise.promisify(needle.get);

getAsync('http://ip.jsontest.com/').then(function(response){
  return response.body.ip    // Ip address
})
.then(function(ip) {
  return getAsync('http://www.geoplugin.net/json.gp?ip=' + ip);
})
.then(function(response){
  console.log(response);
})
.catch(err => {
  console.log('Error: ' + err);
});
