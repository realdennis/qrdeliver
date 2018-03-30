const http = require('http');
const fs = require('fs');
let port = 9988;
http.createServer((req,res) => {
    res.writeHead(200);
    res.end(fs.readFileSync('./' + decodeURI(req.url)));
}).listen(port)
