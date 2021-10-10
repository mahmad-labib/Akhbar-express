class Error {
    err() {
        return {
            msg: 'you need to sign in',
            code: 401
        }
    }
}

global.regularError = class extends Error {
    constructor(data) {
        super()
        this.msg = data.msg
        this.code = data.code
        this.nn = data.hjiuhi
    }
}