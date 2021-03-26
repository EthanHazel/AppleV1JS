const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires
const commonConfig = require('./webpack-common.config.js'); // eslint-disable-line @typescript-eslint/no-var-requires

const webConfig = {
    entry: { bundle: './src/index-web', 'Apple.worker': './src/apple1/Apple.worker' },
    target: 'web',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/js'),
    },
    ...commonConfig,
};

module.exports = [webConfig];
