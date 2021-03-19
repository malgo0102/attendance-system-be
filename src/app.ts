import express from 'express';
import { PORT } from './util/secrets';
import Knex from 'knex';
import knexfile from './knexfile'
import { Model } from 'objection';

// Initialize knex.
const knex = Knex(knexfile.development);

// Bind all Models to a knex instance.
Model.knex(knex);

// Controllers (route handlers)
import * as testController from './controllers/test';

// Create Express server
const app = express();

// Express configuration
app.set('port', PORT || 3000);
app.use(express.json());

/**
 * Primary app routes.
 */
//app.post('/login', userController.postLogin);

/**
 * API examples routes.
 */
app.get('/api', testController.getExample);

export default app;
