const User = require('../mysql');
const crypto = require('crypto');

global.app.get('/user', async function (req, res) {
    user = await User.findOne({
        id: req.user.id
    })
    res.json({
        user
    })
})

global.app.post('/user/login', async function (req, res) {
    var {
        email,
        pass
    } = req.body;
    const hash = crypto.pbkdf2Sync(pass, 'salt', 100, 24, 'sha512').toString('hex');
    const user = await User.findOne({
        where: {
            email,
            password: hash
        }
    });
    var api_token = await global.jwt.sign({
        email,
        hash,
        id: user.id
    }, global.jwt_secret);

    res.json({
        api_token
    });
})

global.app.post('/user/signup', async function (req, res) {
    var {
        pass,
        confPass,
        email,
        name
    } = req.body;
    if (pass.toString() === confPass.toString()) {
        hash = crypto.pbkdf2Sync(pass, 'salt', 100, 24, 'sha512').toString('hex');
    }
    try {
        const user = await User.create({
            name,
            email,
            password: hash
        });
        res.send(user);
    } catch (error) {
        res.send(error)
    }
})

global.app.post('/user/logout', async function (req, res) {
    var token = req.header('jwt_token')
    console.log('token', token)
    if (token == 'null' || token == undefined) {
        res.json({
            msg: 'already loged out',
            code: '000'
        })
    }
    try {
        var invalidJwt = await global.jwt.sign({token}, global.jwt_secret, {
            expiresIn: '1'
        });
        res.json({
            msg: 'signed out',
            code: '200'
        })
    } catch (error) {
        console.log('err', error);
    }
   

})