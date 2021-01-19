module.exports = app => {
    const mongoose = require('mongoose')

    mongoose.set('useFindAndModify', false)

    mongoose.connect('mongodb://haipeng:haipeng@localhost/node-vue-modb', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    // 引入所有模型
    require('require-all')(__dirname + '/../models')
}