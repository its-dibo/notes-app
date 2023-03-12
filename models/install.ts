// install the sqlite db
// todo: throw an error when running over an existing database

import sqlite3 from 'sqlite3'
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let db = new sqlite3.Database(resolve(__dirname,'../db.sqlite'));



// the media files is stored in /files/$note_id/$file_path
db.run(`CREATE TABLE IF NOT EXISTS notes (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
   	title TEXT NOT NULL,
   	body TEXT NOT NULL,
	note_type INTEGER DEFAULT 1
    )`);

db.run(`CREATE TABLE IF NOT EXISTS entities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
   	name TEXT NOT NULL UNIQUE,
   	picture TEXT
)`);


db.run(`CREATE TABLE IF NOT EXISTS note_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
   	name TEXT NOT NULL UNIQUE,
    disabled INTEGER
)`);


db.close();