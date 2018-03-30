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
        console.log(decodeURI(req.url));
        try{
            res.end(fs.readFileSync(process.cwd()+decodeURI(req.url)));
        }catch(err){
            console.log(err);
        }
    }).listen(port)
}

if(process.argv[2]!=undefined){
    p2 = process.argv[2];
    d = p2.lastIndexOf('/');
    dir = p2.slice(0,d+1);
    console.log('change dir to '+dir);
    filename = p2.slice(d+1);

    process.chdir(dir);
    something = 'http://'+ip.address()+':'+port+'/'+encodeURI(filename); 
    createServer();
    qrcode.generate(something);
    console.log(something);
}else{
    console.log('usage:')
    console.log('       qrfile [file ..]              make your file be a qrcode(link) ')
    console.log('       qrfile [file ..] -p [port]    change port if collision')
}
