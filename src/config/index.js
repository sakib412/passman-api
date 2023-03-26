import { merge } from 'lodash'
const env = process.env.NODE_ENV || 'development'

const baseConfig = {
    env,
    isDev: env === 'development',
    port: process.env.PORT || 5000,
    secrets: {
        session: process.env.SESSION_SECRET || 'secret'
    },
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
    clientHost: process.env.CLIENT_HOST || 'localhost',

}

let envConfig = {}

switch (env) {
    case 'dev':
    case 'development':
        envConfig = require('./dev').config
        break

    case 'prod':
    case 'production':
        envConfig = require('./prod').config
        break

    default:
        envConfig = require('./dev').config
}

export default merge(baseConfig, envConfig)