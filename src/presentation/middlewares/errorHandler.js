
const errorHandler = (err, req, res, next) => {
    if (err?.message.includes('not found')) {
        req.logger.warn(`${err.message}`)
        return res.status(404).json({status: 'error', message: err.message });
    }
    else if (err?.message.includes('not created'||'not deleted'||'not updated'||'was expected'||'is required'||'not sent')){
        req.logger.warn(`${err.message}`)
        return res.status(400).json({status: 'error', message: err.message });
    }
    else if (err?.name.includes('ZodError') || err?.message.includes('invalid')) {
        req.logger.warn(`${err.message}`)
        return res.status(400).json({status: 'error', message: err.issues || err.message });
    }
    req.logger.error(`${err.message} \n ${err.stack}`)
    res.status(500).json({status: 'error', message: err.message });
};

export default errorHandler;