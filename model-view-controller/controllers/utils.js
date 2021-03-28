exports.getPageNotFound = (req, res, next) => {
    const payload = {
        pageTitle: 'Page Not Found',
        path: null
    }
    res.status(404).render('404', payload)
}