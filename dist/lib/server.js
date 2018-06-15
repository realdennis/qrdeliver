let port_check = (() => {
  var _ref = _asyncToGenerator(function* (port) {
    let createServer = (() => {
      var _ref2 = _asyncToGenerator(function* (port) {
        return new Promise(function (resolve, reject) {
          detect(port).then(function (_port) {
            if (port == _port) {
              server.listen(port);
              resolve(port);
            } else {
              console.log(`Port ${port} is occupied, try ${_port}.`);
            }
          }).catch(function (err) {
            reject(err);
          });
        });
      });

      return function createServer(_x2) {
        return _ref2.apply(this, arguments);
      };
    })();

    if (port < 1 || port > 65535) {
      console.log(`${port} is illegal .`);
      process.exit();
    } else {
      return createServer(port);
    }
  });

  return function port_check(_x) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const http = require('http');
const detect = require('detect-port');

var server = http.createServer((req, res) => {
  res.writeHead(200);
  console.log(decodeURI(req.url));
  try {
    const fs = require('fs');
    res.end(fs.readFileSync(process.cwd() + decodeURI(req.url)));
  } catch (err) {
    console.log(err);
  }
});

exports.listen = port_check;
exports.instance = server;