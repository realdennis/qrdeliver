#!/usr/bin/env node
const parseDir = require('./lib/parser');
const server = require('./lib/server')
let port = 9615;//default port

if(process.argv[3]==='-p'){
  port = Number(process.argv[4]);
  if(Number.isNaN(port) || port<1 || port>65536){
    console.log('Illegal port number.')
    process.exit();
  }
};

if(process.argv[2]!==undefined){
  server.listen(port,()=>{
    let something = parseDir(process.argv[2],port);
    if(!something) process.stdin.pause();
    const qrcode = require('qrcode-terminal');
    qrcode.generate(something);
    console.log(something);
  });
  server.on('error',err=>{
    if(err.errno==='EADDRINUSE'){
      console.log(`Port ${port} be used`);
      console.log('Change port number using option -p [port]')
    }else{
      console.log(err.errno);
    }
    process.stdin.pause();
  })
}else{
  console.log('usage:')
  console.log('       qrd [file ..]              make your file be a qrcode(link) ')
  console.log('       qrd [file ..] -p [port]    change port if collision')
}
