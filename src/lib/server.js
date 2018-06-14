const http = require('http');

function createServer(port){
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

module.exports = createServer;
