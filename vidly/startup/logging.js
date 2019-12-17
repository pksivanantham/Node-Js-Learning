const winston = require('winston');
const logger = require('../middleware/errorLogger');
require('express-async-errors');

module.exports = function(){
    winston.createLogger({
        format: winston.format.simple(),
        transports: [
          new winston.transports.Console({ handleExceptions: true })//handle exceptions
        ]
      });
      
      process.on('uncaughtException',(err)=>{
        logger.log('error','Critical Error',err);
      });
      
      process.on('unhandledRejection',(ex)=>{
        logger.log('error','Unhandled rejection',ex);
        throw ex;
      });
};