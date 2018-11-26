/**
 * Represents an HTTP error message
 */
class HttpError {
    /**
     * 
     * @param {number} status HTTP status code
     * @param {string} message Error message
     */
    constructor(status, message) {
        this.status = status
        this.message = message
    }
}

/**
 * 
 * @param {number} status HTTP status code
 * @param {string} message Error message
 * @returns {{HttpError}} Error object
 */
function buildError(status, message) {
    return {err: new HttpError(status, message)}
}

/**
 * Wraps a openwhisk serverless framework action in a standard changeable error handler
 * @param {*} params Action input parameters
 * @param {(function(*): *)} action Action code, takes parameters
 * @returns {* | {HttpError}} Result of action code or error object
 */
async function handleError(params, action) {
    if (params.err) return buildError(params.err.status, params.err.message)

    try {
        return await action(params)
    } catch(e) {
        console.error(e)
        return buildError(500, e.message)
    }
}

module.exports = {buildError, handleError}
