const http = require('http');
const detect = require('detect-port');

var server = http.createServer((req,res) => {
  res.writeHead(200);
  console.log(decodeURI(req.url));
  try{
      const fs = require('fs');
      res.end(fs.readFileSync(process.cwd()+decodeURI(req.url)));
  }catch(err){
      console.log(err);
  }
})

async function port_check(port){
  async function createServer(port){
    return new Promise((resolve,reject)=>{
      detect(port)
      .then(_port => {
        if (port == _port) {
          server.listen(port)
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
  if(port < 1 || port >65535){
    console.log(`${port} is illegal .`)
    process.exit();
  }else{
    return createServer(port)
  }
}

exports.listen = port_check;
exports.instance = server;