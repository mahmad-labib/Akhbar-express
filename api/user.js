module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send('Hello World!')
    })

    app.post('/login', function (req, res) {
        var modal = req.body;
        res.send(modal);
    })

    app.get('/signup', function (req, res) {
        res.send('Hello World!')
    })
}