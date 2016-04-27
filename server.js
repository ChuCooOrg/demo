var express = require('express')
var serveIndex = require('serve-index')
var fs = require('fs')
var path = require('path')

var app = express()

app.use(express.static(__dirname + "/"))
app.use('/jquery', serveIndex(__dirname + '/jquery'));
app.use('/angularjs', serveIndex(__dirname + '/angularjs'));

app.listen(8080, function () {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop')
})
