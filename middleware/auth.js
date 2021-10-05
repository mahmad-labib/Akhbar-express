global.app.use(function (req, res, next) {
    var token = req.header('jwt_token')
    if (token == 'null' || token == undefined) {
        next();
    } else {
        var bearer = global.jwt.verify(token, global.jwt_secret);
        req.user = bearer;
        next();
    }
});

// function loginRequired(req, res, next) {
//     if (req.user) {
//         next()
//     } else {
//         res.json({
//             msg: 'you need to sgin in',
//             code: '401'
//         })
//     }
// }

// function alreadylogin(req, res, next) {
//     if (req.user) {
//         res.json({
//             msg: 'you are already logged in',
//             code: '406'
//         })
//     } else {
//         next();
//     }
// }