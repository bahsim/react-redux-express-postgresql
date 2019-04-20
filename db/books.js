const { getRequestBody } = require('../modules/misc');
const uuidv4 = require('uuid/v4');
const moment = require('moment')

module.exports = (pool, app) => {
	
	// get list
	app.get('/books', (request, response) => {
		const { authorId, userId, status } = request.query
		let queryText = 'SELECT * FROM books'
		let filterArr = []
		let params = []
		
		if (authorId) {
			params.push(authorId)
			filterArr.push(`authorId = $${params.length}`)
		}
		if (userId) {
			params.push(userId)
			filterArr.push(`userId = $${params.length}`)
		}
		if (status === 'free') {
			filterArr.push('available')
		} else if (status === 'givenout') {
			filterArr.push('NOT available')
		}
		
		if (filterArr.length > 0) {
			filterStr = filterArr.join(' AND ')
			queryText += ` WHERE ${filterStr}`
		}
		queryText += ' ORDER BY name ASC'
		
		pool.query(queryText, params, (error, results) => {
			if (error) throw error
			response.status(200).json(results.rows)
		})
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
			const { description, authorid, authorname, name } = body
			const id = uuidv4()
			const timestamp = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
			
			pool.query(
				`INSERT INTO books 
					(id, description, created, authorid, authorname, name, available) 
					VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
				[id, description, timestamp, authorid, authorname, name, true], (error, results) => {
				if (error) {
					throw error
				}
				response.status(201).json(id)
			})
		})
	})
	
	// update
	app.put('/books/:id', (request, response) => {
		const id = request.params.id
		
		getRequestBody(request, (body) => {
			const { userid, username, available } = body
			console.log(userid, username, available)
			pool.query(
				'UPDATE books SET userid = $1, username = $2, available = $3 WHERE id = $4', 
				[userid, username, available, id], (error, results) => {
				if (error) {
					throw error
				}
				response.status(200).json(id)	
			})
		})
	})
	
	// // delete
	// app.delete('/books/:id', (request, response) => {
		// const id = request.params.id

		// pool.query('DELETE FROM books WHERE id = $1', [id], (error, results) => {
			// if (error) {
				// throw error
			// }
			// response.status(200).json(id)
		// })
	// })
}
