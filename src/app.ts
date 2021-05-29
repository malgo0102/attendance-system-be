import express from 'express';
import { PORT, clientOrigins } from './util/secrets';
import Knex from 'knex';
import knexfile from './knexfile';
import { Model } from 'objection';
import cors from 'cors';
import helmet from 'helmet';
import usersRouter from './routes/users.route';
import classesRouter from './routes/classes.route';
import coursesRouter from './routes/courses.route';
import handleGenericError from './errors/handle-generic-error';
import logger from 'morgan';


// Initialize knex.
const knex = Knex(knexfile.development);

// Bind all Models to a knex instance.
Model.knex(knex);

// Create Express server
const app = express();

// Express configuration
app.set('port', PORT);
app.use(helmet());
app.use(cors({ origin: clientOrigins, exposedHeaders: ['Content-Range'] }));
app.use(express.json());
app.use(logger('dev'));

/**
 * Primary app routes.
 */

app.use('/api/users', usersRouter);
app.use('/api/classes', classesRouter);
app.use('/api/courses', coursesRouter);

app.use(handleGenericError);

export default app;
