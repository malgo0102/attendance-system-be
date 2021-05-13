import express from 'express';
import { PORT } from './util/secrets';
import Knex from 'knex';
import knexfile from './knexfile';
import { Model } from 'objection';
import cors from 'cors';
import helmet from 'helmet';
import { clientOrigins } from './util/secrets';
import usersRouter from './routes/users.route';
import handleGenericError from './errors/handle-generic-error';

// Initialize knex.
const knex = Knex(knexfile.development);

// Bind all Models to a knex instance.
Model.knex(knex);

// Create Express server
const app = express();

// Express configuration
app.set('port', PORT || 3000);
app.use(helmet());
app.use(cors({ origin: clientOrigins }));
app.use(express.json());

/**
 * Primary app routes.
 */

app.use('/users', usersRouter);

app.use(handleGenericError);

export default app;
