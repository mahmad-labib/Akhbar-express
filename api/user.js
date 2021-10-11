const {
    User,
    Role,
    users_roles
} = require('../mysql');
const crypto = require('crypto');


global.app.get('/user', global.loginRequired, async function (req, res) {
    try {
        // var user = await User.findOne({
        //     where: {
        //         id: req.user.id
        //     }
        // })
        res.json(new global.sendData(200, req.user))
    } catch (error) {
        res.json(new global.regularError(409, 'somthing went wrong'))
    }
})

global.app.post('/user/login', async function (req, res) {
    var {
        email,
        pass
    } = req.body;
    const hash = crypto.pbkdf2Sync(pass.toString(), 'salt', 100, 24, 'sha512').toString('hex');
    const user = await User.findOne({
        where: {
            email,
            password: hash
        },
        attributes: ['id', 'name'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
        }],
    });
    if (user === null) {
        return res.json('not found');
    } else {
        var api_token = await global.jwt.sign({
            email,
            id: user.id,
            roles: user.roles
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
        var findUser = await User.findOne({
            where: {
                email: email
            }
        })
        if (findUser !== null) {
            res.json(new global.regularError(409, 'user already exist'));
        }
        if (pass.toString() === confPass.toString()) {
            var hash = crypto.pbkdf2Sync(pass, 'salt', 100, 24, 'sha512').toString('hex');
        }
        const user = await User.create({
            name,
            email,
            password: hash
        });
        res.send(user);
    } catch (error) {
        res.json(new global.regularError());
    }
})

global.app.post('/user/logout', async function (req, res) {
    var token = req.header('jwt_token');
    if (token == ('null' || undefined)) {
        res.json(new global.regularError(505, 'already loged out'))
    }
    res.header('token', {}).json({
        msg: 'signed out',
        code: '200'
    })
})