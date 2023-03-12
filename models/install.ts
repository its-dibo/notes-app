import db from '~database'

// the media files is stored in /files/$note_id/$file_path
// relations: 
//   - note_type -> note_types
//   - sent_by -> entities
db.run(`CREATE TABLE IF NOT EXISTS notes (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
   	title TEXT NOT NULL,
   	body TEXT NOT NULL,
	note_type INTEGER DEFAULT 1,
	sent_by INTEGER
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


// db.close();