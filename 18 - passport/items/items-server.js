'use strict'

const storage_host = 'localhost'
const storage_port = 9200

const default_port = 8888
const port = process.argv[2] || default_port

const express = require('express')
const app = express()

const authCreator = require('./items-auth.js')
const auth = authCreator(app)

const storageCreator = require('./items-storage-db.js')
const storage = storageCreator(storage_host, storage_port)

const quotes = require('./items-quotes.js')

const serviceCreator = require('./items-service.js')
const service = serviceCreator(storage, quotes)

const webapiCreator = require('./items-webapi.js')
const webapi = webapiCreator(auth, service)

const webuiCreator = require('./items-webui.js')
const webui = webuiCreator(auth, service)

app.use('/api', webapi);
app.use(webui);

app.use('/public', express.static('my-static-files'));

app.set('view engine', 'hbs')

app.listen(port)
