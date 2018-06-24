const http = require('http');
const server = http.createServer((req,res) => {
  res.writeHead(200);
  console.log(decodeURI(req.url));
  try{
      const fs = require('fs');
      res.end(fs.readFileSync(process.cwd()+decodeURI(req.url)));
  }catch(err){
      console.log(err);
  }
})
module.exports = server;