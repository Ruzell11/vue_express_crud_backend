const getValidationError = (validation) => {
    return {
        message: validation.errors
    }
}


module.exports = { getValidationError }