class ApiError extends Error {
    constructor(status, message = "Something went wrong", error = [], stack = "") {
        super(message)
        this.status = status
        this.data = null
        this.message = message
        this.error = error
        this.success = false;

        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }