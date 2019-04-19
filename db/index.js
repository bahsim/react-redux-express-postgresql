const config = require('../config')
const Pool = require('pg').Pool

const users = require('./users')
const authors = require('./authors')
const books = require('./books')

const pool = new Pool({
  host: 		config.dbHost,
  database: config.dbName,
  user: 		config.dbUser,
  password: config.dbPassword,
  port: 		config.dbPort,
})

module.exports = (app) => {
	const tablsUsers = 
		`CREATE TABLE IF NOT EXISTS
			users(
				id UUID PRIMARY KEY,
				name TEXT NOT NULL,
				email TEXT NOT NULL,
				phone TEXT NOT NULL,
				created TIMESTAMP
			)`;
	const tableAuthors = 
    `CREATE TABLE IF NOT EXISTS
      authors(
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        created TIMESTAMP
      )`;
	const tableBooks = 
		`CREATE TABLE IF NOT EXISTS
			books(
				id UUID PRIMARY KEY,
				name TEXT NOT NULL,
				authorId UUID NOT NULL,
				authorName TEXT NOT NULL,
				userId TEXT,
				userName TEXT,
        description TEXT,
				available BOOL,
				created TIMESTAMP,
				FOREIGN KEY (authorId) REFERENCES authors (id) ON DELETE CASCADE
			)`;
	
	const init = async () => {
		await pool.query(tablsUsers)
		await pool.query(tableAuthors)
		await pool.query(tableBooks)
	}
	
	init()
	
	users(pool,app)
	authors(pool,app)
	books(pool,app)
}
