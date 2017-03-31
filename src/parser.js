import fs from 'fs';
import { set } from 'lodash';

function parse(input) {
  const output = {};
  if (input && typeof input === 'string') {
    const lines = input.split(/\r\n/g);
    lines.forEach((line) => {
      const [path, value] = line.split('=');
      if (path)
        set(output, path, value)
    })
  }
  return output;
}

export default function parseFile(file, onDone) {
  const obj = {};
  fs.access(file, fs.constants.R_OK, (err) => {
    if (err) {
      console.log(err);
      onDone(obj);
      return;
    }
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        onDone(obj);
        return;
      }
      onDone(parse(data));
    });
  });
}
