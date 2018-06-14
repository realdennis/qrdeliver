function parseDir(p2,port){
    d = p2.lastIndexOf('/');
    dir = p2.slice(0,d+1);
    filename = p2.slice(d+1);
    if(dir){
        process.chdir(dir);
        console.log('change dir to '+dir);
    }
    const ip = require('ip');
    something = 'http://'+ip.address()+':'+port+'/'+encodeURI(filename); 
    return something;
}

module.exports = parseDir;