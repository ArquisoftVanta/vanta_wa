// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//-------------------------------------------
const express = require("express");
const fs = require('fs');
const https = require('https');
const app = express();
console.log(__dirname);
app.use(express.static(__dirname + "/dist"));

const PORT = process.env.PORT || 3500;

https.createServer({
    cert: fs.readFileSync('private.crt'),
    key: fs.readFileSync('private.key')
}, app).listen(PORT, function() {
    console.log('Servidor https corriendo en el puerto' + PORT);
});


app.get(/.*/, function(req, res) {
    console.log('Servidor https correindo en el puerto' + PORT);
    res.sendFile(__dirname + "/dist/index.html");
});