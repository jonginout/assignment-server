const HOST = 'localhost'
// const HOST = '54.180.90.228'

module.exports = {
    host : 'http://api.jongin.site/',
    port : process.env.PORT || 3000,
    secret: 'SeCrEtKeYfOrHaShInG',
    mongodbUri: `mongodb://${HOST}:27017/jongodb`
}