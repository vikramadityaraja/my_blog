const express = require("express")
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routerurls = require('./router')
const cors = require('cors')


dotenv.config()
mongoose.connect(process.env.BASE_URL, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true},() => console.log('db connected_running at port:4000'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use('/', routerurls)
app.listen(4000)

