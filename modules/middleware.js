export function checkLoggedIn(req, res, next) {
    if (req.session.user.userid) {
        return next();
    } else {
        res.redirect('/login/');
    }
}

export function isAdmin(req, res, next) {
    if (req.session.user.isPremium) {
        return next();
    } else {
        res.redirect('/home/');
    }
}