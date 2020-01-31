#!/usr/bin/env node
import * as qrcode from "qrcode-terminal";
import parseDir from "./lib/parser";
import fileServer from "./lib/server";

const fallbackPort = 9615; //default port
const target = process.argv[2];
const userPort = process.argv[4];
const UsageMessage = `usage:
qrd [file ..]              make your file be a qrcode(link)
qrd [file ..] -p [port]    change port if collision
`;

const getPort: (port: number) => number = port => {
  if (Number.isNaN(port) || port < 1 || port > 65535) {
    console.log(`Port illegal...using fallback port ${fallbackPort}`);
    return fallbackPort;
  }
  return port;
};

const handler = (port: number) => {
  try {
    let localURL = parseDir(target, port);
    qrcode.generate(localURL);
    console.log(localURL);
  } catch (e) {
    console.log("Error, please check directory exist");
  }
};

// Main program
const mainProgram = () => {
  const port =
    userPort === undefined ? fallbackPort : getPort(Number(userPort));
  fileServer.listen(port, () => handler(port));
};

target === undefined ? console.log(UsageMessage) : mainProgram();
