import sqlite3 from 'sqlite3'
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let db = new sqlite3.Database(resolve(__dirname,'../db.sqlite'));

export default db

