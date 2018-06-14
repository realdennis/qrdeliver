function parseDir(p2, port) {
  d = p2.lastIndexOf('/');
  dir = p2.slice(0, d + 1);
  filename = p2.slice(d + 1);
  if (dir) {
    console.log('change dir to ' + dir);
    try {
      process.chdir(dir);
    } catch (err) {
      console.log('change directory failed');
      console.log('please check directory exist');
      return false;
    }
  }
  const ip = require('ip');
  something = 'http://' + ip.address() + ':' + port + '/' + encodeURI(filename);
  return something;
}
module.exports = parseDir;