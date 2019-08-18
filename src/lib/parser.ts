import * as ip from 'ip';

const parseDir: (target: string, port: number) => string = (p2, port) => {
  const d = p2.lastIndexOf('/');
  const dir = p2.slice(0, d + 1);
  const filename = p2.slice(d + 1);
  if (dir) {
    console.log('change dir to ' + dir);
    try {
      process.chdir(dir);
    } catch (err) {
      console.log('change directory failed');
      console.log('please check directory exist');
      return '';
    }
  }
  const localURL = `http://${ip.address()}:${port}/${encodeURI(filename)}`;
  return localURL;
};
export default parseDir;
