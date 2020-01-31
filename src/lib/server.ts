import * as fs from 'fs';
import * as  http from 'http';
const fileServer = http.createServer((req: any, res: any) => {
  res.writeHead(200);
  const url = req.url || '';
  try {
    const file = fs.readFileSync(process.cwd() + decodeURI(url));
    res.end(file);
  } catch (err) {
    !url.includes('favicon') && console.log('Some error occuring...');
  }
});
export default fileServer;
