import { JJJ } from './jjj';
import { program } from './parser';
import fs from 'fs';

const data = fs.readFileSync(process.argv[2]).toString();
const p = program.parse(JSON.parse(data));
new JJJ(p).eval();

