#!/usr/bin/env node
const qrcode = require('qrcode-terminal');
const http = require('http');
const ip = require('ip');
const fs = require('fs')

let port = 9615

function createServer(){
    http.createServer((req,res) => {
        res.writeHead(200);
//        console.log(decodeURI(req.url));
        res.end(fs.readFileSync('./' + decodeURI(req.url)));
    }).listen(port)
}

if(process.argv[2]!=undefined){
    something = 'http://'+ip.address()+':'+port+'/'+encodeURI(process.argv[2]); 
    createServer();
    qrcode.generate(something,{small:true});
}else{
    console.log('usage:')
    console.log('       qrfile [file ..]       make your file be a qrcode(link) ')
}
