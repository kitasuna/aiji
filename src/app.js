import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const router = express.Router()

// this gets us data from POST / GET params
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

router.route('/')
  .get(function(req, res) {
    res.send('This is ze index')
  })

router.route('/hello')
  .get(function(req, res) {
    res.send('Hello world aiji')
  })

app.use('/', router)

app.listen(5555, function() {console.log('server running on port 5555')})
