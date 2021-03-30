const db = require("../db/sqlite")
const findOne = (query, args) => {
  return new Promise((resolve, reject) => {
    db.get(query, args, function (err, row) {
      if (err) return reject(err.message)
      resolve(row)
    })
  })
}

const findAll = (query, args) => {
  return new Promise((resolve, reject) => {
    db.all(query, args, function (err, rows) {
      if (err) return reject(err.message)
      resolve(rows)
    })
  })
}

const create = (query, args) => {
  return new Promise((resolve, reject) => {
    db.run(query, args, function (err) {
      if (err) return reject(err.message)
      resolve(this.lastID)
    })
  })
}

const update = (query, args) => {
  return new Promise((resolve, reject) => {
    db.run(query, args, function (err) {
      if (err) return reject(err.message)
      resolve(this.lastID)
    })
  })
}

const deleteOne = (query, args) => {
  return new Promise((resolve, reject) => {
    db.run(query, args, function (err) {
      if (err) return reject(err)
      if (this.changes == 0) return reject(`Nothing to delete`)
      resolve(this.lastID)
    })
  })
}

module.exports = {
  findOne,
  findAll,
  create,
  update,
  deleteOne,
}
