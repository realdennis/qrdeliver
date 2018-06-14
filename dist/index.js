#!/usr/bin/env node

const parseDir = require('./lib/parser');
const createServer = require('./lib/server');

let port = 9615; //default port

if (process.argv[3] === '-p') {
    port = process.argv[4];
}
if (process.argv[2] !== undefined) {
    let something = parseDir(process.argv[2], port);
    createServer(port);

    const qrcode = require('qrcode-terminal');
    qrcode.generate(something);
    console.log(something);
} else {
    console.log('usage:');
    console.log('       qrfile [file ..]              make your file be a qrcode(link) ');
    console.log('       qrfile [file ..] -p [port]    change port if collision');
}