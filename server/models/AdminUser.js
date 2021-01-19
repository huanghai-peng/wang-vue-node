const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String
    },
    select: false,
    pwd: {
        type: String,
        select: false,
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    }
})



module.exports = mongoose.model('AdminUser', schema)