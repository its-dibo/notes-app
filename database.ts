import sqlite3 from "sqlite3";
import { resolve } from "node:path";

let db = new sqlite3.Database(resolve(__dirname, "../db.sqlite"));

export default db;
