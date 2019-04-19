const { getRequestBody } = require('../modules/misc');
const uuidv4 = require('uuid/v4');
const moment = require('moment')

module.exports = (pool, app) => {
	
	// get list
	app.get('/authors', (request, response) => {
		const queryText = 'SELECT * FROM authors ORDER BY name ASC'
		
		pool.query(queryText, (error, results) => {
			if (error) throw error
			response.status(200).json(results.rows)
		})
	})

	// get item
	app.get('/authors/:id', (request, response) => {
		const id = request.params.id
		
		pool.query('SELECT * FROM authors WHERE id = $1', [id], (error, results) => {
			if (error) throw error
			response.status(200).json(results.rows)
		})
	})
	
	// create
	app.post('/authors', (request, response) => {
		getRequestBody(request, (body) => {
			const { name } = body
			const id = uuidv4()
			const timestamp = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
			
			pool.query(
				'INSERT INTO authors (id, name, created) VALUES ($1, $2, $3)', 
				[id, name, timestamp], (error, results) => {
					if (error) throw error
					response.status(200).json(id)
			})
		})
	})
}
