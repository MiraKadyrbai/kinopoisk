const exp = require('constants');
const express = require('express');
require('./server/config/db')

const app = express();

app.use(express.static(__dirname + '/public'))

app.set("view engine", "ejs")
app.use(require('./server/pages/router'))
app.use(require('./server/Genres/router'))
app.use(require('./server/Country/router'))


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
})