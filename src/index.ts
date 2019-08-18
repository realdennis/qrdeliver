#!/usr/bin/env node
import * as qrcode from 'qrcode-terminal';
import parseDir from './lib/parser';
import fileServer from './lib/server';

const fallbackPort = 9615; //default port
const [, , target, portOpt, userPort]: (string | undefined)[] = process.argv;
const UsageMessage = `usage:
qrd [file ..]              make your file be a qrcode(link)
qrd [file ..] -p [port]    change port if collision
`;

const getPort: () => number = () => {
  const getArgPort: (argv4: number) => number = port => {
    if (Number.isNaN(port) || port < 1 || port > 65535) {
      // throw new Error('Port illegal');
      console.error('Port illegal');
      return fallbackPort;
    }
    return port;
  };
  return portOpt === '-p' ? getArgPort(Number(userPort)) : fallbackPort;
};
// Main program
const mainProgram = () => {
  const port = getPort();
  (fileServer as any).listen(port, () => {
    let localURL = parseDir(target, port);
    qrcode.generate(localURL);
    console.log(localURL);
  });
};

target === undefined ? console.log(UsageMessage) : mainProgram();
