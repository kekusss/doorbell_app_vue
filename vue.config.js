const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
    publicPath: process.env.NODE_ENV === "development" ? "/" : "",

    configureWebpack: {
        plugins: [
            // new InjectManifest({
            //     swSrc: './src/firebase-messaging-sw.js',
            // })
        ]
    },
}