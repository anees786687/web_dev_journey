
// we can get the information of the page we are on using the location object of the window object
console.log(window.location.href);
console.log(window.location.protocol);
console.log(window.location.hostname);
console.log(window.location.port);
console.log(window.location.pathname);
console.log(window.location.search);
console.log(window.location.hash);

// we can also parse a URL and get its components
const url = new URL('https://blueserver.com:8000/path?type=example#section2');

console.log(url.protocol);
console.log(url.hostname);
console.log(url.port);
console.log(url.pathname);
console.log(url.search);
console.log(url.hash);

