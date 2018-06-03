const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const http = require('http')
const session = require('express-session')
const app = require('express')()
const server = http.createServer(app)

const io = require('socket.io')(server);
const socketIo = require('socket.io')

// Body parser, to access `req.body`
app.use(bodyParser.json())

// Sessions to create `req.session`
app.use(session({
  secret: '@someranÖM123ndsMachinChoses_2018',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 36000000 }
}))

// product/order and user routes
const tutorielsRoutes = require('./api/routes/tutoriel')
const userRoutes = require('./api/routes/user')
const formContact = require('./api/routes/contact')

// use middleware to set routes
app.use('/tutoriel', tutorielsRoutes)
app.use('/user', userRoutes)
app.use('/contact', formContact)


let config = require('./nuxt.config.js')

// We instantiate Nuxt.js with the options
const isProd = process.env.NODE_ENV === 'production'
config.dev = !isProd
console.log('env', process.env.NODE_ENV)

const nuxt = new Nuxt(config)

// No build in production
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)

// set socket.io message
io.on('connection', function(socket) {
  console.log(socket.id)
  socket.on('SEND_MESSAGE', function(data) {
      io.emit('MESSAGE', data)
  });
});

server.listen(3000)
console.log('Server is listening on http://localhost:3000')
