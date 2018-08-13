var countdown = function *(start) {
  while(start) {
    yield start; // pause function
    start --;
  }
}

// Khi sử dụng generator function cần gán vào 1 biến
var counter = countdown(5);
var callback = function() {
  var item = counter.next(); // continue function
  if (!item.done) {
    console.log(item.value); // Giá trị ở sau yield
    setTimeout(callback, 1000)
  }
}

//callback();

var range = function *(start, end, step) {
  while(start < end) {
    yield start;
    start += step;
  }
}

// Có thể sử dụng generator function như 1 array

for (let value of range(0, 10, 2)) {
  //console.log(value);
}

var g1 = function *() {
  yield 2;
  yield 3;
  yield 4;
}

var g2 = function *() {
  yield 1;
  yield* g1(); // yield* dùng để gọi 1 generator trong 1 generator khác
  yield 5;
}

var iterator = g2();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());