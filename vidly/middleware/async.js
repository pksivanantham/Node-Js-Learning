//This is replaced with the npm lib 'express-async-errors'
//If the above package didn't work then we can use the below helper-
//function to wrap the handlers in routes
module.exports = function(handler) {
    return async (req, res, next) => {
  
      try {
        await handler(req, res, next);
      }
      catch (ex) {
        next(ex);
      }
  
    };
  }