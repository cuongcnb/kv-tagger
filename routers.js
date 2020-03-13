/**
 * Handles controller execution and responds to user (API Express version).
 * Web socket has a similar handler implementation.
 * @param promise Controller Promise. I.e. getUser.
 * @param params A function (req, res, next), all of which are optional
 * that maps our desired controller parameters. I.e. (req) => [req.params.username, ...].
 */

const controllerHandler = (promise, params) => async (req, res, next) => {
    const boundParams = params ? params(req, res, next) : [];
    try {
        const result = await promise(...boundParams);
        return res.json(result || { message: 'OK' });
    } catch (error) {
        return res.status(500).send({ status: 'error', message: error.message, stack: error.stack }) && next(error);
    }
};
const c = controllerHandler; // Just a name shortener.

const nerController = require('./controllers/ner.controller');

module.exports = (app) => {
    app.get('/ner/predict', c(nerController.predict, (req, res) => [req.query]));
};