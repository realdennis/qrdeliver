#!/usr/bin/env node
const qrcode = require('qrcode-terminal');
const http = require('http');
const ip = require('ip');
const fs = require('fs');

let port = 9615;//default port

if(process.argv[3]=='-p'){
    port = process.argv[4];
}

function createServer(){
    http.createServer((req,res) => {
        res.writeHead(200);
//        console.log(decodeURI(req.url));
        try{
            res.end(fs.readFileSync(process.cwd()+decodeURI(req.url)));
        }catch(err){
            console.log(err);
        }
    }).listen(port)
}

if(process.argv[2]!=undefined){
    something = 'http://'+ip.address()+':'+port+'/'+encodeURI(process.argv[2]); 
    createServer();
    qrcode.generate(something);
    console.log(something);
}else{
    console.log('usage:')
    console.log('       qrfile [file ..]              make your file be a qrcode(link) ')
    console.log('       qrfile [file ..] -p [port]    change port if collision')
}
