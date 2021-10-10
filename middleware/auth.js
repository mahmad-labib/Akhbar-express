global.app.use(function (req, res, next) {
    if (req.header('jwt_token')) {
        var token = req.header('jwt_token')
        try {
            var bearer = global.jwt.verify(token, global.jwt_secret);
            req.user = bearer;
            next();
        } catch (error) {
            console.log(error)
            next()
        }
    } else {
        next();
    }
});



loginRequired = function loginRequired(req, res, next) {
    console.log(req.user)
    if (req.user) {
        return next()
    } else {
        res.json({
            msg: 'you need to sign in',
            code: '401'
        })
    }
}

alreadylogin = function alreadylogin(req, res, next) {
    if (req.user) {
        res.json({
            msg: 'you are already logged in',
            code: '406'
        })
    } else {
        return next();
    }
}