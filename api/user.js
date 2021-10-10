const User = require('../mysql');
const crypto = require('crypto');


global.app.get('/user', global.loginRequired, async function (req, res) {
    try {
        user = await User.findOne({
            where: {
                id: req.user.id
            }
        })
        res.json({
            user
        })
    } catch (error) {
        // console.log('hi');
    //     var data = {
    //         error: true,
    //         msg: 'somthing went wrong',
    //         code: '409'
    //     }
    //     res.json(new global.regularError(data))
    }
})

global.app.post('/user/login', global.alreadylogin, async function (req, res) {
    var {
        email,
        pass
    } = req.body;
    const hash = crypto.pbkdf2Sync(pass.toString(), 'salt', 100, 24, 'sha512').toString('hex');
    const user = await User.findOne({
        where: {
            email,
            password: hash
        }
    });
    if (user === null) {
        return res.json('not found');
    } else {
        var api_token = await global.jwt.sign({
            email,
            hash,
            id: user.id
        }, global.jwt_secret);

        res.json({
            api_token
        });
    }
})

global.app.post('/user/signup', async function (req, res) {
    try {
        var {
            pass,
            confPass,
            email,
            name
        } = req.body;
        user = await User.findOne({
            where: {
                email: email
            }
        })
        // if (user !== null) {
        //     var data = {
        //         code: 409,
        //         msg: 'user already exist'
        //     }
        //     res.json(new global.regularError(data));
        // }
        if (pass.toString() === confPass.toString()) {
            hash = crypto.pbkdf2Sync(pass, 'salt', 100, 24, 'sha512').toString('hex');
        }
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
    var token = req.header('jwt_token');
    if (token == ('null' || undefined)) {
        res.json({
            msg: 'already loged out',
            code: '505'
        })
    }
    res.header('token', {}).json({
        msg: 'signed out',
        code: '200'
    })
})