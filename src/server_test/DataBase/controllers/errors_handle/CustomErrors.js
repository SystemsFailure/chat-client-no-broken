
exports.defaultError = (req, res, err, text, code) => {
    res.send({type: 'error', })
}