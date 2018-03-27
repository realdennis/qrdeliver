#!/usr/bin/env node
const qrcode = require('qrcode-terminal');
const http = require('http');
const ip = require('ip');
const fs = require('fs')

let port = 9615

function createServer(){
    http.createServer((req,res) => {
        res.writeHead(200);
        res.end(fs.readFileSync('./' + req.url));
    }).listen(port)
}

if(process.argv[2]!=undefined){
    something = 'http://'+ip.address()+':'+port+'/'+process.argv[2]; 
    createServer();
    qrcode.generate(something);
}else{
    console.log('usage:')
    console.log('       qrfile [file ..]       make your file be a qrcode(link) ')
}
