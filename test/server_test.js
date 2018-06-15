var expect = require('chai').expect;
var server = require('../dist/lib/server');

describe('Server Test',()=>{
  after(()=>{
    server.instance.close();
  });
  describe('Port occupied test',()=>{
    afterEach(()=>{
      server.instance.close();
    });
    it('443',()=>{
      expect(()=>server.listen(443)).not.to.throw();
    });
    it('80',()=>{
      expect(()=>server.listen(80)).not.to.throw();
    });
    it('8080',()=>{
      expect(()=>server.listen(8080)).not.to.throw();
    });
    it('9615',()=>{
      expect(()=>server.listen(80)).not.to.throw();
    });
    it('1000000',()=>{
      expect(()=>server.listen(80)).not.to.throw();
    })
  });
  describe('Port illegal test',()=>{
    afterEach(()=>{
      server.instance.close();
    });
    it('-1010',()=>{
      expect(()=>server.listen(443)).not.to.throw();
    });
    it('10000000000',()=>{
      expect(()=>server.listen(443)).not.to.throw();
    });
    it('-qwjei1-123',()=>{
      expect(()=>server.listen(443)).not.to.throw();
    });
    it('-123123',()=>{
      expect(()=>server.listen(443)).not.to.throw();
    });
  })
})