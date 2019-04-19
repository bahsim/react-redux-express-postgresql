const { getRequestBody } = require('../modules/misc');
const uuidv4 = require('uuid/v4');
const moment = require('moment')

module.exports = (pool, app) => {
	
	// get list
	app.get('/users', (request, response) => {
		const queryText = 'SELECT * FROM users ORDER BY name ASC'
		
		pool.query(queryText, (error, results) => {
			if (error) throw error
			response.status(200).json(results.rows)
		})
	})

	// get item
	app.get('/users/:id', (request, response) => {
		const id = request.params.id
		
		pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
			if (error) throw error
			response.status(200).json(results.rows)
		})
	})
	
	// create
	app.post('/users', (request, response) => {
		getRequestBody(request, (body) => {
			const { name, email, phone } = body
			const id = uuidv4()
			const timestamp = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
			
			pool.query(
				'INSERT INTO users (id, name, email, phone, created) VALUES ($1, $2, $3, $4, $5)', 
				[id, name, email, phone, timestamp], (error, results) => {
					if (error) throw error
					response.status(200).json(id)
			})
		})
	})
}
