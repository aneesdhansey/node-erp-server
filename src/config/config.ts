const env = process.env.NODE_ENV || 'development';

if (env == 'development' || env == 'test') {
    // Create a config.json file in this directory based on template provided in sample-config.json
    const config = require('./config.json');
    const envConfig = config[env];
    Object.keys(envConfig).forEach(k => process.env[k] = envConfig[k]);
}