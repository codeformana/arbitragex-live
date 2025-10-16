const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

// Load default config
const defaultConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../config/default.json'), 'utf8')
);

// Load environment-specific config
let envConfig = {};
const envConfigPath = path.join(__dirname, `../config/${env}.json`);
if (fs.existsSync(envConfigPath)) {
  envConfig = JSON.parse(fs.readFileSync(envConfigPath, 'utf8'));
}

// Merge configs
const config = {
  ...defaultConfig,
  ...envConfig,
  env,
};

module.exports = config;
