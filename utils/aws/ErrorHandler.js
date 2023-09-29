class ErrorHandler extends error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}
module.exports = ErrorHandler