class Error {
    err() {
        return {
            msg: 'somthing went wrong',
            code: 404
        }
    }
}

class Success {
    response() {
        return {
            data: {},
            code: 202
        }
    }
}

global.regularError = class extends Error {
    constructor(code, msg) {
        super()
        this.msg = msg
        this.code = code
    }
}

global.Forbidden = class extends Error {
    constructor() {
        super()
        this.code = 403
        this.message = 'Forbidden'
    }
}

global.sendData = class extends Success {
    constructor(code, data) {
        super()
        this.code = code
        this.data = data
    }
}