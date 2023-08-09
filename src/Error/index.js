class IError {
    constructor(textError, nameFunction) {
        this.textError = textError
        this.nameFunction = nameFunction
        this.stackTrace = 'Not stability... just not use it stack<trace> : code not work'
        this.nameError = 'IError'
    }

    // get GetTextError() {
    //     return this.textError
    // }

    // get GetNameFunction() {
    //     return this.nameFunction
    // }
    
    // get GetStackTrace() {
    //     return this.stackTrace
    // }
}

class FieldIsEmptyError extends IError{
    constructor(textError, nameFunction) {
        super(textError, nameFunction)
        this.nameError = 'FieldIsEmptyError'
    }
}

class FieldLengthIsLong extends IError {
    constructor(textError, nameFunction) {
        super(textError, nameFunction)
        this.nameError = 'FieldLengthIsLong'
    }
}

class DOMElementNotFound extends IError {
    constructor(textError, nameFunction) {
        super(textError, nameFunction)
        this.nameError = 'DOMElementNotFound'
    }
}

export {
    FieldIsEmptyError,
    FieldLengthIsLong,
    DOMElementNotFound,
}