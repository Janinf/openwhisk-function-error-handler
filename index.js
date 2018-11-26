async function handleError(params, action, errorHandler = err => ({err: {status: 500, message: err.message}})) {
    if (params.err) return errorHandler(params.err)

    try {
        return await action(params)
    } catch(e) {
        console.error(e)
        return errorHandler(e)
    }
}

module.exports = handleError
