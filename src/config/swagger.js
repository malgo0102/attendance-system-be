const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('js-yaml');
const fs = require('fs');

const swaggerDocument = YAML.load(fs.readFileSync('./swagger.yaml'), 'utf-8');

//const swaggerDocument = fs.readFileSync('./swagger.json');
//require('../../')
console.log(swaggerDocument);

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;