const gr = require('./gr')
gr.global_require()

//call environment app variables
require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')

//API version mapped by /routes/<version>
const v1 = appRequire('/routes/v1')

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

//middleware routes
app.use('/v1', v1)

 //listening
 app.listen(process.env.APP_PORT)

 module.exports = app