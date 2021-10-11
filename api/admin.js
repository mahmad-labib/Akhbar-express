const {
    User
} = require('../mysql');
const {
    Op
} = require("sequelize");
const crypto = require('crypto');

global.app.get('/admin', global.grantAccess('admin'), async function (req, res) {
    try {
        var user = await User.findOne({
            where: {
                id: req.user.id
            }
        })
        res.json({
            user
        })
    } catch (error) {
        res.json(new global.Forbidden())
    }
})

global.app.get('/admin/users', global.grantAccess('admin'), async function (req, res) {
    try {
        var user = await User.findAndCountAll({
            order: [
                ['name', 'ASC'],
            ],
            limit: 5,
            offset: req.body.page
        })
        res.json(new global.sendData('202', user))
    } catch (error) {
        res.json(new global.regularError())
    }
})

global.app.get('/admin/users/search', global.grantAccess('admin'), async function (req, res) {
    try {
        var {limit, page, name} = req.body
        var user = await User.findAll({
            where: {
                name: {
                    [Op.substring]: name
                }
            },
            limit: limit,
            offset: page
        })
        res.json(new global.sendData('202', user))
    } catch (error) {
        res.json(new global.regularError())
    }
})