
const env = process.env.NODE_ENV || 'development';
const config = {
    development: {
        port: process.env.PORT || 8000,
        // dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/winedb',
        dbUrl: 'mongodb+srv://uzuntonev:bt!zS4GW5Jn9sbL@cluster0-virtt.mongodb.net/wineshopDB?retryWrites=true&w=majority',
        authCookie: 'x-auth-cookie',
        secret: process.env.SECRET || 'secret',
        tokenExpiresIn: '2h',
    },
    production: {}
};

module.exports = config[env]
