const http = require('http');
const detect = require('detect-port');

function serverListen(port){
  http.createServer((req,res) => {
    res.writeHead(200);
    console.log(decodeURI(req.url));
    try{
        const fs = require('fs');
        res.end(fs.readFileSync(process.cwd()+decodeURI(req.url)));
    }catch(err){
        console.log(err);
    }
  }).listen(port)
}

async function createServer(port){
  return new Promise((resolve,reject)=>{
    detect(port)
    .then(_port => {
      if (port == _port) {
        serverListen(port)
        resolve(port);
      } else {
        console.log(`Port ${port} is occupied, try ${_port}.`)
      }
    })
    .catch(err => {
      reject(err);
    });
  })
}

module.exports = createServer;
