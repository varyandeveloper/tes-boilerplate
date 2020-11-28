import * as fs from 'fs';
import * as s from 'shelljs';
import * as path from 'path';
import { parse, stringify } from 'envfile';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./tsconfig.json');
const outDir = config.compilerOptions.outDir;

s.rm('-rf', outDir);
s.exec('tsc');
s.cp('.env', `${outDir}/.env`);
s.cp('app/common/api.yml', `${outDir}/app/common/api.yml`);
s.cp('-R', './public', `${outDir}/public`);

const parsedFile: Record<string, string> = parse(
  fs.readFileSync(`${outDir}/.env`).toString()
);

parsedFile.APP_ENV = 'production';

for (const [name, value] of Object.entries(parsedFile)) {
  parsedFile[name] = value.replace('*.ts', '*.js');
}

for (const [name, value] of Object.entries(parsedFile)) {
  parsedFile[name] = value.replace(
    'modules/**',
    path.resolve(__dirname + '/' + outDir + '/modules/**')
  );
}

fs.writeFileSync(`${outDir}/.env`, stringify(parsedFile));
