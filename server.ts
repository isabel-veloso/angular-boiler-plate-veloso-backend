import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { initializeDb } from './_helpers/db';
import errorHandler from './_middleware/error-handler';
import accountsController from './accounts/accounts.controller';
import swaggerDocs from './_helpers/swagger';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// initialize DB before every request
app.use(async (req: any, res: any, next: any) => {
    try {
        await initializeDb();
        next();
    } catch (err) {
        next(err);
    }
});

app.use('/accounts', accountsController);
app.use('/api-docs', swaggerDocs);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
    const port = 4000;
    app.listen(port, () => console.log('Server listening on port ' + port));
}

module.exports = app;