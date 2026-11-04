const mongoos = require('mongoose')

const connectDB = async () => {
    mongoos.connect('mongodb+srv://sharumh_db_user:yVvMHdcuzTdNtHFQ@namastenode.vpjbmm1.mongodb.net/devTinder')
}

module.exports = connectDB