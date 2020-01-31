import { expect } from 'chai';
import parser from '../lib/parser';

import * as ip from 'ip';
let host = `http://${ip.address()}`;

const path = process.cwd();

//parser('filename',port);
console.log = () => {};
describe('Parser Test', () => {
  describe('filename test', () => {
    beforeEach(() => {
      process.chdir(path);
    });
    it('nested 1', () => {
      expect(parser('./src/index.ts', 9999)).to.equal(`${host}:9999/index.ts`);
    });
    it('nested 2', () => {
      expect(parser('./src/lib/parser.ts', 9999)).to.equal(
        `${host}:9999/parser.ts`
      );
    });
  });
  describe('Only filename', () => {
    beforeEach(() => {
      process.chdir(path);
    });
    it('relative test', () => {
      expect(parser('./package.json', 9999)).to.equal(
        `${host}:9999/package.json`
      );
    });
    it('direct test', () => {
      expect(parser('package.json', 9999)).to.equal(
        `${host}:9999/package.json`
      );
    });
  });
});
