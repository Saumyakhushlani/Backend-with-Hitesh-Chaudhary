class ApiResponse {
    constructor(status, data, messge = "Success") {
        this.status = status
        this.data = data
        this.messge = messge
        this.success = status < 400
    }
}

export {ApiResponse}