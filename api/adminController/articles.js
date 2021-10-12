global.app.post('/admin/article', global.grantAccess('admin'), (req, res) => {
    try {
        var {title, content, images} = req.body;
    } catch (error) {

    }
})