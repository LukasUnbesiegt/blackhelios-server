/**
 * PM2 CONFIG FILE
 * Environment Variables
 */
module.exports = {
  apps: [
    {
      name: "server",
      script: "./server/server.js",
      instances: 3,
      exec_mode: "cluster",
      watch: true,
      env: {
        NODE_ENV: "development",
        MONGO_URI: `mongodb://localhost:27017/server-dev`,
        FACEBOOK_APP_ID: ``,
        FACEBOOK_APP_SECRET: ``,
        SECRET_KEY: ``,
        AWS_ACCESS_KEY_ID: ``,
        AWS_ACCESS_KEY_SECRET: ``
      },
      env_production: {
        NODE_ENV: "production",
        MONGO_URI: `mongodb://localhost:27017/server-prod`,
        FACEBOOK_APP_ID: ``,
        FACEBOOK_APP_SECRET: ``,
        SECRET_KEY: ``,
        AWS_ACCESS_KEY_ID: ``,
        AWS_ACCESS_KEY_SECRET: ``
      }
    }
  ]
};
