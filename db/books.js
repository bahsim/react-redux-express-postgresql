const { getRequestBody } = require('../modules/misc');
const uuidv4 = require('uuid/v4');
const moment = require('moment')

module.exports = (pool, app) => {
	
	// get list
	app.get('/books', (request, response) => {
		const { authorId, userId } = request.query
		
		if (authorId) {
			pool.query('SELECT * FROM books WHERE authorId = $1 ORDER BY id ASC', 
				[authorId], (error, results) => {
					if (error) {
						throw error
					}
					response.status(200).json(results.rows)
				}
			)
		} else if (userId) {
			if (userId === 'givenout') {
				pool.query('SELECT * FROM books WHERE userId <> "" ORDER BY id ASC', 
					(error, results) => {
						if (error) {
							throw error
						}
						response.status(200).json(results.rows)
					}
				)
			} else {
				pool.query('SELECT * FROM books WHERE userId = $1 ORDER BY id ASC', 
					[userId], (error, results) => {
						if (error) {
							throw error
						}
						response.status(200).json(results.rows)
					}
				)
			}
		} else {
			pool.query('SELECT * FROM books ORDER BY id ASC', 
				(error, results) => {
					if (error) {
						throw error
					}
					response.status(200).json(results.rows)
				}
			)
		}
	})

	// get item
	app.get('/books/:id', (request, response) => {
		const id = request.params.id
		
		pool.query('SELECT * FROM books WHERE id = $1', [id], (error, results) => {
			if (error) {
				throw error
			}
			response.status(200).json(results.rows)
		})
	})
	
	// create
	app.post('/books', (request, response) => {
		getRequestBody(request, (body) => {
			const { description, authorId } = body
			const id = uuidv4()
			const timestamp = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
			
			pool.query(
				'INSERT INTO books (id, description, created, authorId) VALUES ($1, $2, $3, $4)', 
				[id, description, timestamp, authorId], (error, results) => {
				if (error) {
					throw error
				}
				response.status(201).send(id)
			})
		})
	})
	
	// update
	app.put('/books/:id', (request, response) => {
		const id = request.params.id
		
		getRequestBody(request, (body) => {
			const { userId } = body
			
			pool.query('UPDATE users SET userId = $1', [userId], (error, results) => {
				if (error) {
					throw error
				}
				response.status(200).send(id)	
			})
		})
	})
	
	// delete
	app.delete('/books/:id', (request, response) => {
		const id = request.params.id

		pool.query('DELETE FROM books WHERE id = $1', [id], (error, results) => {
			if (error) {
				throw error
			}
			response.status(200).send(id)
		})
	})
}
