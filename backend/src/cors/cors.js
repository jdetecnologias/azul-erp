const corsMiddleware = require('restify-cors-middleware')
 
module.exports = corsMiddleware({
  origins: ['*'],
  allowHeaders: ["Authorization"],
  exposeHeaders: ["Authorization"]
})

/*module.exports = (req,res,next) => {
		res.header('Access-Control-Allow-Origin','*')
		res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS, PUT, PATCH, DELETE')
		res.header('Access-Control-Allow-Headers','Origin, X-Requested-Width,Content_Type, Accept')
		next()
}*/