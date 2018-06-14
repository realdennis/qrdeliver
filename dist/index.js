#!/usr/bin/env node
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const parseDir = require('./lib/parser');
const createServer = require('./lib/server');

let port = 9615; //default port

if (process.argv[3] === '-p') {
  port = process.argv[4];
}
if (process.argv[2] !== undefined) {

  _asyncToGenerator(function* () {
    port = yield createServer.listen(port);
    console.log(port);

    let something = parseDir(process.argv[2], port);
    if (!something) process.stdin.pause();

    const qrcode = require('qrcode-terminal');
    qrcode.generate(something);
    console.log(something);
  })();
} else {
  console.log('usage:');
  console.log('       qrfile [file ..]              make your file be a qrcode(link) ');
  console.log('       qrfile [file ..] -p [port]    change port if collision');
}