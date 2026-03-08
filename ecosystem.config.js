const path = require('path');

module.exports = {
  apps: [
    {
      name: 'mariage',
      cwd: path.resolve(__dirname, 'version1'),
      script: './start-preview.sh',
      interpreter: 'bash',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      },
      error_file: path.resolve(__dirname, 'logs/mariage-error.log'),
      out_file: path.resolve(__dirname, 'logs/mariage-out.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
    },
    {
      name: 'backend',
      cwd: path.resolve(__dirname, 'backend'),
      script: 'java',
      args: ['-jar', path.resolve(__dirname, 'backend/build/libs/yannick-rsvp-kotlin-0.0.1-SNAPSHOT.jar')],
      interpreter: 'none',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      error_file: path.resolve(__dirname, 'logs/backend-error.log'),
      out_file: path.resolve(__dirname, 'logs/backend-out.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
