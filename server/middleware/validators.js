const { validateParseInt, hasRequiredBody } = require("../helpers.js");

function validateQuery(req, res, next) {
  try {
    req.query.page = req.query.page ? validateParseInt(req.query.page) : 1;
    req.query.limit = req.query.limit ? validateParseInt(req.query.limit) : 3;
    next();
  } catch (err) {
    res.status(400).send({ message: err });
  }
}

function validateRequest(req, res, next) {
  try {
    const body = hasRequiredBody(req.body);
    req.body.bookId = validateParseInt(body.bookId);
    next();
  } catch (err) {
    res.status(400).send({ message: err });
  }
}

module.exports = { validateQuery, validateRequest };
