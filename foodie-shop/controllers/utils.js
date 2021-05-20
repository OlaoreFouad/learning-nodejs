exports.getPageNotFound = (req, res, next) => {
    const payload = {
        pageTitle: 'Page Not Found',
        path: null
    };
    res.render('404', payload);
}