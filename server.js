const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const config = require('./config')
const db = require('./db')(app)

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(express.static(config.pathStatic));

if (config.appMode === 'development') {
	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const webpackConfig = require('./webpack.config');
	const webpackCompiler = webpack(webpackConfig);
	
	app.use(
		webpackDevMiddleware(webpackCompiler, { 
			noInfo: true, 
			publicPath: webpackConfig.output.publicPath 
		})
	);
	
	app.use(
		webpackHotMiddleware(webpackCompiler)
	);
}


app.get('/', (request, response) => {
	response.sendFile(path.join(__dirname, 'frontend/operator.html'));
})

app.listen(config.appPort, () => {
  console.log(`App running on port ${config.appPort}.`)
})