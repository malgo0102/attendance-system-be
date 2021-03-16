import express from 'express';
import { PORT } from './util/secrets';

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
