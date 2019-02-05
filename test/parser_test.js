var expect = require('chai').expect;
var parser = require('../dist/lib/parser');

const ip = require('ip');
let host = `http://${ip.address()}`; 

const path = process.cwd();

//parser('filename',port);

describe('Parser Test',()=>{
  describe('filename test',()=>{
    beforeEach(()=>{
      process.stdout.write = ()=>{};
      process.chdir(path);
    });
    afterEach(()=>{
      delete process.stdout.write;
    });
    it('src',()=>{
      expect(parser('./src/index.js',9999)).to.equal(`${host}:9999/index.js`);
    });
    it('src',()=>{
      expect(parser('./src/lib/parser.js',9999)).to.equal(`${host}:9999/parser.js`);
    });
    it('src',()=>{
      expect(parser('./src/lib/server.js',9999)).to.equal(`${host}:9999/server.js`);
    });
    it('dist',()=>{
      expect(parser('./dist/index.js',9999)).to.equal(`${host}:9999/index.js`);
    });
    it('dist',()=>{
      expect(parser('./dist/lib/parser.js',9999)).to.equal(`${host}:9999/parser.js`);
    });
    it('dist',()=>{
      expect(parser('./dist/lib/server.js',9999)).to.equal(`${host}:9999/server.js`);
    });
  });
  describe('Only filename',()=>{
    beforeEach(()=>{
      process.stdout.write = ()=>{};
      process.chdir(path);
    });
    afterEach(()=>{
      delete process.stdout.write;
    });
    it('src',()=>{
      expect(parser('./package.json',9999)).to.equal(`${host}:9999/package.json`);
    });
    it('src',()=>{
      expect(parser('./README.md',9999)).to.equal(`${host}:9999/README.md`);
    });
    it('src',()=>{
      expect(parser('package.json',9999)).to.equal(`${host}:9999/package.json`);
    });
    it('dist',()=>{
      expect(parser('README.md',9999)).to.equal(`${host}:9999/README.md`);
    });
  });
  describe('file dir not exist',()=>{
    beforeEach(()=>{
      process.chdir(path);
    });
    afterEach(()=>{
    });
    it('not exist dir',()=>{
      expect(()=>parser('./foo/bar',9999)).not.to.throw();
    });
    it('not exist dir',()=>{
      expect(()=>parser('./asdjoasjdoiajsd/bar',9999)).not.to.throw();
    });
    it('not exist dir',()=>{
      expect(()=>parser('./fozxjcpojzxcio/bar',9999)).not.to.throw();
    });
    it('not exist dir',()=>{
      expect(()=>parser('./qwjepjpqowe/bar',9999)).not.to.throw();
    });
  })
})