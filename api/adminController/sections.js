const {
    Section
} = require('../../mysql');
const {
    Op
} = require("sequelize");

global.app.post('/admin/section', global.grantAccess('admin'), (req, res)=>{
    try {
        var {name, parent_id} = req.body;
        if (name && parent_id) {
            var section = Section.create({
                name,
                parent_id
            })   
        }
        var section = Section.create({
            name,
        }) 
    } catch (error) {
        
    }
})