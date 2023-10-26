const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('*** DB Connection Success ***')
    } catch (error) {
        console.log(error);
        throw new Error('ERROR: Error al inicializar BD')
    }
}

module.exports = {
    dbConnection,
}