function AsyncError(func) {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
}

class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = { AsyncError, ExpressError };
