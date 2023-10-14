const dotenv = require('dotenv');
const startupDebugger = require("debug")("app:startup");
const morgan = require("morgan");

function envConfig(app){
    const nodeEnv = process.env.NODE_ENV || 'development';
    if (nodeEnv === 'production') {
        dotenv.config({ path: '.env.production' });
    } else if (nodeEnv === 'development') {
        dotenv.config({ path: '.env.development' });
        app.use(morgan("tiny"));
        startupDebugger("Morgan enabled...");
    } else if (nodeEnv === 'test') {
        dotenv.config({ path: '.env.test' });
    } else {
    // Handle other environments or provide a default
    }
    console.log(`${nodeEnv}...`);
}

module.exports = envConfig;