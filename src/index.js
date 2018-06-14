#!/usr/bin/env node
const parseDir = require('./lib/parser');
const createServer = require('./lib/server');

let port = 9615;//default port

if(process.argv[3]==='-p'){
  port = process.argv[4];
}
if(process.argv[2]!==undefined){

  (async()=>{
    port = await createServer.listen(port);
    console.log(port)

    let something = parseDir(process.argv[2],port);
    if(!something) process.stdin.pause();
  
    const qrcode = require('qrcode-terminal');
    qrcode.generate(something);
    console.log(something);
  })();

}else{
  console.log('usage:')
  console.log('       qrfile [file ..]              make your file be a qrcode(link) ')
  console.log('       qrfile [file ..] -p [port]    change port if collision')
}
