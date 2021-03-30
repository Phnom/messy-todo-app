const db = require("../db/sqlite")
db.serialize(() => {
  db.run("DROP TABLE IF EXISTS todo_lists")
  db.run("DROP TABLE IF EXISTS todos")
  db.run(
    `CREATE TABLE "todo_lists" ("id"	INTEGER,"title"	TEXT NOT NULL,"color"	TEXT DEFAULT 'white',PRIMARY KEY("id" AUTOINCREMENT));`
  )
  db.run(
    `CREATE TABLE "todos" ("id"	INTEGER,"content"	TEXT NOT NULL DEFAULT '',"done" INTEGER NOT NULL DEFAULT 0,"todo_list_id"	INTEGER,PRIMARY KEY("id" AUTOINCREMENT),FOREIGN KEY("todo_list_id") REFERENCES "todo_lists"("id"));`
  )
  db.get("PRAGMA foreign_keys = ON") // Enable SQL error on foreign key constraints
})
