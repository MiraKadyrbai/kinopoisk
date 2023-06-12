const express = require('express')
const router = express.Router();

router.get('/api/country', async(req, res ) => {
    console.log('ok');
})

const {getAllCountries} = require('./controller')

const writeDataCountry = require('./seed')

router.get('/api/country', getAllCountries)

writeDataCountry()

module.exports = router