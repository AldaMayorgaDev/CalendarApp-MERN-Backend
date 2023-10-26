const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid,
            name,
        }

        jwt.sign(payload, process.env.SECRET_JSW_SEED, {
            expiresIn: '2h',
        }, (error, token) => {

            if (error) {
                console.log('ERROR: GenerarJWT', error)
                reject(error)
            }

            resolve(token);

        })
    })
}

module.exports = {
    generarJWT
}