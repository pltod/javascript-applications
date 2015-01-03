module.exports = [
	//HTTP Server Implementation
	{
		packagePath : "./app/server/httpServer/express",
		port : process.env.PORT || 8080,
		indexPage: "./index.html",
		testPageMocha: "./testsMocha.html",
		host: process.env.IP || '127.0.0.1',
		folders : {
			app : "./app/client",
			assets : "./app/client/assets",
			tests : "./tests"
		}
	}
]; 