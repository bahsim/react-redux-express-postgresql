const Config = function () {
	return {
		// appMode:	"production",
		appMode:	"development",
		appPort:		80,
		dbHost:			"localhost",
		dbPort: 		5432,
		dbName: 		"myDb",
		dbUser: 		"postgres",
		dbPassword: "123",
		pathStatic: "frontend/dist", 
	};
};

module.exports = new Config();