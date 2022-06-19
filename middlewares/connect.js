module.exports = function(req, res, next) {
    if (req.session.connect && req.session.connect.connected === true) {
        next()
    } else {
        res.redirect('/login')
    }
}